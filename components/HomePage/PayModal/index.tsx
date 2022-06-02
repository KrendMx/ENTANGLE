import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Contract } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import classNames from 'classnames';
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

const PayModal: React.FC<PayModalPropsType> = (props) => {
    const {
        handleClose,
        price,
        available,
        totalAvailable,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const buttons = ['Deposit', 'Withdraw'];
    const dispatch = useAppDispatch();
    const { chainId, provider } = useAppSelector((state) => state.walletReducer);

    useEffect(() => {
        if (!(chainId in networks)) {
            handleClose();
        }
    }, [chainId]);

    const buyToken = async (value: number) => {
        try {
            const contracts = (
            ChainConfig[sessionStorage.getItem('card')]
                .SYNTH as any
            ).find(
                (el: any) =>
                    el.ID
                === farms[chainId][
                    sessionStorage.getItem('card')
                ],
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

            const amount = BigInt(Math.floor(value * 10 ** (await stableContract.decimals())));
            const response = await buyContract.buyWithFee(amount, { gasLimit: 1500000 });
            if (response) {
                dispatch(changeLoadingTx(true));
            }
            const res = await response.wait();

            if (res?.status) {
                dispatch(changeLoadingTx(false));
                dispatch(setSucInfo({
                    value,
                    symbol: networks[chainId].currencyMin,
                    isReceived: true,
                }));
            }
        } catch (e) {
            throw new Error('Buy synth internal error');
        }
    };

    const sellToken = async (value: number) => {
        try {
            const contracts = (
                ChainConfig[sessionStorage.getItem('card')]
                    .SYNTH as any
            ).find(
                (el: any) =>
                    el.ID
                    === farms[chainId][
                        sessionStorage.getItem('card')
                    ],
            );
            const sellContract = new Contract(
                contracts.CONTRACTS.FEE.address,
                contracts.CONTRACTS.FEE.abi,
                (provider as Web3Provider).getSigner(),
            );
            // eslint-disable-next-line
            const amount = BigInt((value * Math.pow(10, 18)));
            const response = await sellContract.sellWithFee(amount);
            if (response) {
                dispatch(changeLoadingTx(true));
            }
            const res = await response.wait();

            if (res?.status) {
                dispatch(changeLoadingTx(false));
                dispatch(setSucInfo({
                    value,
                    symbol: networks[chainId].currencyMin,
                    isReceived: false,
                }));
                handleClose();
            }
        } catch (e) {
            throw new Error('Sell synth internal error');
        }
    };

    return (
        <div className={styles.wrapper}>
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
            <Tabs switchHandler={(idx: number) => setActiveTab(idx)} activeTab={activeTab} />
            {
                activeTab
                    ? (
                        <Withdraw
                            price={price}
                            available={available}
                            totalAvailable={totalAvailable}
                            sellToken={sellToken}
                        />
                    )
                    : (
                        <Deposit
                            price={price}
                            available={available}
                            totalAvailable={totalAvailable}
                            buyToken={buyToken}
                        />
                    )
            }
        </div>
    );
};

export default PayModal;
