import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import type { Contract } from 'ethers';
import { useTranslation } from 'next-i18next';
import styles from '../style.module.css';
import Text from '../Text/index';
import ModalInput from '../ModalInput';
import GradientButton from '@/ui-kit/GradientButton';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';
import { networks, farms, namesConfig } from '@/src/utils/GlobalConst';
import type { availableChains } from '@/src/utils/GlobalConst';
import { ChainConfig } from '@/src/ChainService/config';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import {
    getAllowance,
    approve,
} from '@/src/Redux/store/reducers/ActionCreators';
import { changeLoadingTx } from '@/src/Redux/store/reducers/UserSlice';
import TextLoader from '@/components/ui-kit/TextLoader/TextLoader';

type propsType = {
    // eslint-disable-next-line no-unused-vars
    sellToken: (value: number) => void;
    balanceSynth: Promise<number>;
    chainThings: {genered: any, contract: Contract};
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Withdraw: React.FC<propsType> = ({
    sellToken, balanceSynth, chainThings,
}) => {
    const dispatch = useAppDispatch();
    const { chainId, account, provider } = useAppSelector(
        (state) => state.walletReducer,
    );
    const { payData, txLoading } = useAppSelector((state) => state.userReducer);
    const cardState = useAppSelector((state) => state.cardDataReducer);
    const [synthAmount, setSynthAmount] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [synthBalance, setSynthBalance] = useState<string>('');
    const [allowance, setAllowance] = useState(0);
    const [maxError, setMaxError] = useState<boolean>(false);

    const localChain = useMemo(
        () => namesConfig[sessionStorage.getItem('card')],
        [chainId],
    );

    useEffect(() => {
        (async function calcBalances() {
            const secondBalance = String(await balanceSynth);
            setSynthBalance(secondBalance);
        }());
    }, [balanceSynth]);

    useEffect(() => {
        (async function getAllowanceAndBalance() {
            dispatch(
                getAllowance({
                    contractAddress:
                        chainThings.genered.CONTRACTS.SYNTH.address,
                    dexAddress: chainThings.genered.CONTRACTS.FEE.address,
                    account,
                    provider,
                }),
            ).then((action) => setAllowance(Number(action.payload.toBigInt())));
        }());
    }, []);

    useEffect(() => {
        (async function checkMax() {
            if (Number(amount) > Number(await balanceSynth)) {
                setMaxError(true);
            } else {
                setMaxError(false);
            }
        }());
    }, [amount]);

    const handleApprove = async () => {
        const contracts = (
            ChainConfig[sessionStorage.getItem('card')].SYNTH as any
        ).find(
            (el: any) =>
                el.ID === farms[chainId][sessionStorage.getItem('card')],
        );
        dispatch(
            approve({
                tokenAddress: contracts.CONTRACTS.SYNTH.address,
                dexAddress: contracts.CONTRACTS.FEE.address,
                provider,
            }),
        ).then((action) => {
            if (action.payload) {
                dispatch(changeLoadingTx(true));
            }
            const res = action.payload.wait();
            if (res?.status === 1) {
                setAllowance(10000000000);
                dispatch(changeLoadingTx(false));
            }
        });
    };

    const getMax = async () => {
        setAmount((await balanceSynth).toString() || '0');
    };

    const { t } = useTranslation('index');

    return (
        <div className={styles.container}>
            <div
                className={styles.priceBlock}
                style={
                        {
                            '--color-from': `${localChain !== '1' ? networks[localChain]?.mainColor : '#121212'}`,
                        } as React.CSSProperties
                }
            >
                <div className={styles.priceContent}>
                    <p>{t('price')}</p>
                    {payData[localChain]?.price
                        ? (
                            <p>
                                $
                                {payData[localChain]?.price}
                            </p>
                        ) : (
                            <TextLoader
                                bgGradient={`linear-gradient(270deg, 
                                    ${networks[localChain]?.mainColor} 0%, rgba(239, 200, 208, 0.01) 100%)`}
                            />
                        )}
                </div>
                <div className={styles.logo}>
                    <Image
                        width={57}
                        height={57}
                        quality={100}
                        src={`/images/networks/${
                            localChain !== '1' ? networks[localChain]?.icon : 'etheriumDashboard.svg'
                        }`}
                        alt={`${
                            networks[localChain]?.title
                        }-logo`}
                    />
                </div>
            </div>
            <p className={styles.warn}>
                The approximate transaction execution time is 15 seconds!
            </p>
            <div className={styles.mg2}>
                <Text title={t('aprCard')} content={`${cardState[localChain].apr}%`} />
                <br />
                <Text title={t('yourSynthBalance')} content={`${synthBalance} SynthLP`} />
            </div>
            <ModalInput
                currencyReceive="USDC"
                currencySend={networks[chainId as availableChains].currency}
                titleReceive={t('youGetUSDC')}
                titleSend={t('enterSynthAmount')}
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
                    title={maxError ? 'Sell funds' : 'Waiting'}
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
                                ? 'Sell funds'
                                : 'Data Loading'
                            : 'Approve'
                    }
                    onClick={
                        allowance > 0
                            ? () => sellToken(parseFloat(amount))
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

export default Withdraw;
