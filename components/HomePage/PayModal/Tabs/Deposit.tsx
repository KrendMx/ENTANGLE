import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Contract } from 'ethers';
import styles from '../style.module.css';
import ModalInput from '../ModalInput/index';
import GradientButton from '@/ui-kit/GradientButton';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';
import { networks, namesConfig } from '@/src/utils/GlobalConst';
import type { availableChains } from '@/src/utils/GlobalConst';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import {
    getAllowance,
    approve,
} from '@/src/Redux/store/reducers/ActionCreators';
import { changeLoadingTx } from '@/src/Redux/store/reducers/UserSlice';
import Text from '../Text/index';
import Loader from '@/ui-kit/Loader/index';

type propsType = {
    buyToken: (value: number) => void;
    balanceUSDC: Promise<number>;
    balanceSynth: Promise<number>;
    chainThings: {genered: any, contract: Contract}
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Deposit: React.FC<propsType> = ({
    buyToken, chainThings, balanceSynth, balanceUSDC, available,
}) => {
    const dispatch = useAppDispatch();
    const { chainId, account, provider } = useAppSelector(
        (state) => state.walletReducer,
    );
    const { payData, txLoading } = useAppSelector((state) => state.userReducer);
    const { sortingObject } = useAppSelector((state) => state.appReducer);
    const [amount, setAmount] = useState('');
    const [synthAmount, setSynthAmount] = useState('');
    const [balances, setBalances] = useState<{usdc: string, synth: string}>({ usdc: '', synth: '' });
    const [allowance, setAllowance] = useState<number>(0);
    const [maxError, setMaxError] = useState<boolean>(false);

    const localChain = useMemo(
        () => namesConfig[sessionStorage.getItem('card')],
        [chainId],
    );

    useEffect(() => {
        (async function getAllowanceAndBalance() {
            dispatch(
                getAllowance({
                    contractAddress:
                        chainThings.genered.CONTRACTS.STABLE.address,
                    dexAddress: chainThings.genered.CONTRACTS.FEE.address,
                    account,
                    provider,
                }),
            ).then((action) => setAllowance(Number(action.payload.toBigInt())));
        }());
    }, [chainId]);

    useEffect(() => {
        (async function checkMax() {
            if (Number(amount) > Number(await balanceUSDC)) {
                setMaxError(true);
            } else {
                setMaxError(false);
            }
        }());
    }, [amount, chainId]);

    useEffect(() => {
        (async function calcBalances() {
            const firstBalance = String(await balanceUSDC);
            const secondBalance = String(await balanceSynth);
            setBalances({ usdc: firstBalance, synth: secondBalance });
        }());
    }, [balanceSynth, balanceUSDC]);

    const moreThenAvailable = useMemo(() => {
        if (Number(synthAmount) > Number(available)) {
            return true;
        }
        return false;
    }, [synthAmount]);

    const handleApprove = async () => {
        dispatch(
            approve({
                tokenAddress: chainThings.genered.CONTRACTS.STABLE.address,
                dexAddress: chainThings.genered.CONTRACTS.FEE.address,
                provider,
            }),
        ).then(async (action) => {
            if (action.payload) {
                dispatch(changeLoadingTx(true));
            }
            const res = await action.payload.wait();
            if (res?.status) {
                setAllowance(10000000000);
                dispatch(changeLoadingTx(false));
            }
        });
    };

    const getMax = async () => {
        setAmount((await balanceUSDC).toString() || '0');
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.priceBlock}
                style={
                    {
                        '--colorFrom': `${networks[localChain]?.mainColor}`,
                    } as React.CSSProperties
                }
            >
                <div className={styles.priceContent}>
                    <p>Price</p>
                    <p>
                        $
                        {payData[localChain]?.price || <Loader />}
                    </p>
                </div>
                <div className={styles.logo}>
                    <Image
                        width={57}
                        height={57}
                        quality={100}
                        src={`/images/networks/${networks[localChain]?.icon}`}
                        alt={`${networks[localChain]?.title}-logo`}
                    />
                </div>
            </div>
            {!moreThenAvailable ? (
                <p className={styles.warn}>
                    The approximate transaction execution time is 15 seconds!
                </p>
            ) : (
                <p className={styles.warnScd}>
                    Transaction for more than
                    {' '}
                    {Number(synthAmount).toFixed(3)}
                    {' '}
                    SynthLPs can take between
                    5-30 minutes!
                </p>
            )}
            <Text title="Current Projected APR" content={`${sortingObject[localChain]?.APR}%`} classText={styles.mgT} />
            <Text title="Your SynthLP Balance" content={`${balances.synth} SynthLP`} classText={styles.mgT} />
            <Text title="Your USDC balance " content={`${balances.usdc} USDC`} classText={styles.mgT} />
            <ModalInput
                currencyReceive={networks[chainId as availableChains].currency}
                currencySend="USDC"
                titleReceive="You get SynthLP"
                titleSend="Enter USDC amount"
                sendValue={amount}
                receiveValue={synthAmount}
                onReceiveChange={(e) => {
                    if (e.target.value.length <= 6) {
                        setAmount(e.target.value
                            ? String(Number(e.target.value)
                                  / Number(payData[localChain]?.price))
                            : '');
                        setSynthAmount(e.target.value);
                    }
                }}
                onSendChange={(e) => {
                    if (e.target.value.length <= 6) {
                        setAmount(e.target.value);
                        setSynthAmount(
                            e.target.value
                                ? String(Number(e.target.value)
                                      * Number(payData[localChain]?.price))
                                : '',
                        );
                    }
                }}
                getMax={getMax}
            />
            {txLoading || maxError ? (
                <GradientButton
                    title={maxError ? 'Add funds' : 'Waiting'}
                    onClick={() => {}}
                    disabled
                    loader={
                        !maxError ? (
                            <i
                                className="fa fa-spinner fa-spin"
                                style={{ marginLeft: '5px' }}
                            />
                        ) : undefined
                    }
                />
            ) : (
                <GradientButton
                    title={
                        allowance > 0
                            ? payData[localChain as availableChains]?.price
                                ? 'Add funds'
                                : 'Data Loading'
                            : 'Approve'
                    }
                    onClick={
                        allowance > 0
                            ? () => buyToken(parseFloat(amount))
                            : () => handleApprove()
                    }
                    disabled={
                        !payData[localChain as availableChains]?.price
                        || !amount
                    }
                />
            )}
        </div>
    );
};

export default Deposit;
