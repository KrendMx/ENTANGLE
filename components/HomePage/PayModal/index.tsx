import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Contract, providers } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import styles from './style.module.css';
import { networks, farms } from '@/src/utils/GlobalConst';
import type { PayModalPropsType } from './PayModal.interfaces';
import Deposit from './Tabs/Deposit';
import Withdraw from './Tabs/Withdraw';
import Tabs from '@/ui-kit/Tabs/index';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { changeLoadingTx } from '@/src/Redux/store/reducers/UserSlice';
import { setSucInfo } from '@/src/Redux/store/reducers/AppSlice';
import { ChainConfig } from '@/src/ChainService/config';

const PayModal: React.FC<PayModalPropsType> = ({
    handleClose, price, available, totalAvailable,
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useAppDispatch();
    const { chainId, provider, account } = useAppSelector(
        (state) => state.walletReducer,
    );
    const { txLoading } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        if (!(chainId in networks)) {
            handleClose();
        }
    }, [chainId]);

    const chainThingsStable = useMemo(() => {
        const genered = (
            ChainConfig[sessionStorage.getItem('card')].SYNTH as any
        ).find(
            (el: any) =>
                el.ID === farms[chainId][sessionStorage.getItem('card')],
        );
        const contract = new Contract(
            genered.CONTRACTS.STABLE.address,
            genered.CONTRACTS.STABLE.abi,
            new providers.JsonRpcProvider(networks[chainId]?.rpc),
        );

        return {
            genered,
            contract,
        };
    }, [account, chainId]);

    const balanceUSDC = useMemo(
        async () =>
            Number(
                (
                    await chainThingsStable.contract.balanceOf(account)
                ).toBigInt()
                    / BigInt(10 ** (await chainThingsStable.contract.decimals())),
            ),
        [account, txLoading, chainId],
    );

    const chainThingsSynth = useMemo(() => {
        const genered = (
            ChainConfig[sessionStorage.getItem('card')].SYNTH as any
        ).find(
            (el: any) =>
                el.ID === farms[chainId][sessionStorage.getItem('card')],
        );
        const contract = new Contract(
            genered.CONTRACTS.SYNTH.address,
            genered.CONTRACTS.SYNTH.abi,
            new providers.JsonRpcProvider(networks[chainId].rpc),
        );

        return {
            genered,
            contract,
        };
    }, [account, chainId]);

    const balanceSynth = useMemo(async () =>
        Number(
            (
                await chainThingsSynth.contract.balanceOf(account)
            ).toBigInt()
                    / BigInt(10 ** (await chainThingsSynth.contract.decimals())),
        ), [account, txLoading, chainId]);

    const buyToken = async (value: number) => {
        try {
            const contracts = (
                ChainConfig[sessionStorage.getItem('card')].SYNTH as any
            ).find(
                (el: any) =>
                    el.ID === farms[chainId][sessionStorage.getItem('card')],
            );
            const buyContract = new Contract(
                contracts.CONTRACTS.FEE.address,
                contracts.CONTRACTS.FEE.abi,
                (provider as Web3Provider).getSigner(),
            );
            const stableContract = new Contract(
                contracts.CONTRACTS.STABLE.address,
                contracts.CONTRACTS.STABLE.abi,
                (provider as Web3Provider).getSigner(),
            );

            const amount = BigInt(
                Math.floor(value * 10 ** (await stableContract.decimals())),
            );
            const response = await buyContract.buyWithFee(amount, {
                gasLimit: 1500000,
            });
            if (response) {
                dispatch(changeLoadingTx(true));
            }
            const res = await response.wait();

            if (res?.status) {
                dispatch(changeLoadingTx(false));
                dispatch(
                    setSucInfo({
                        value,
                        symbol: networks[chainId].currencyMin,
                        isReceived: true,
                    }),
                );
            }
        } catch (e) {
            throw new Error('Buy synth internal error');
        }
    };

    const sellToken = async (value: number) => {
        try {
            const contracts = (
                ChainConfig[sessionStorage.getItem('card')].SYNTH as any
            ).find(
                (el: any) =>
                    el.ID === farms[chainId][sessionStorage.getItem('card')],
            );
            const sellContract = new Contract(
                contracts.CONTRACTS.FEE.address,
                contracts.CONTRACTS.FEE.abi,
                (provider as Web3Provider).getSigner(),
            );
            // eslint-disable-next-line
            const amount = BigInt(value * Math.pow(10, 18));
            const response = await sellContract.sellWithFee(amount);
            if (response) {
                dispatch(changeLoadingTx(true));
            }
            const res = await response.wait();

            if (res?.status) {
                dispatch(changeLoadingTx(false));
                dispatch(
                    setSucInfo({
                        value,
                        symbol: networks[chainId].currencyMin,
                        isReceived: false,
                    }),
                );
                handleClose();
            }
        } catch (e) {
            throw new Error('Sell synth internal error');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.headerText}>Synthetic Vaults</h1>
                <div className={styles.close}>
                    <Image
                        width={14}
                        height={14}
                        onClick={handleClose}
                        quality={100}
                        src="/images/close.svg"
                        alt="closeImg"
                    />
                </div>
            </div>
            <Tabs
                switchHandler={(idx: number) => setActiveTab(idx)}
                activeTab={activeTab}
                buttons={['Buy', 'Sell']}
            />
            {activeTab ? (
                <Withdraw
                    price={price}
                    available={available}
                    totalAvailable={totalAvailable}
                    sellToken={sellToken}
                    balanceSynth={balanceSynth}
                    chainThings={chainThingsSynth}
                />
            ) : (
                <Deposit
                    price={price}
                    available={available}
                    totalAvailable={totalAvailable}
                    buyToken={buyToken}
                    balanceUSDC={balanceUSDC}
                    balanceSynth={balanceSynth}
                    chainThings={chainThingsStable}
                />
            )}
        </div>
    );
};

export default PayModal;
