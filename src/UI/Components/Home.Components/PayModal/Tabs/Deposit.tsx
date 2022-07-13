import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Contract } from 'ethers';
import { useTranslation } from 'react-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { networks, namesConfig } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import Text from '../Text';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';
import ModalInput from '../ModalInput';
import styles from '../style.module.css';

type propsType = {
    buyToken: (value: number) => void;
    balanceUSDC: Promise<number>;
    balanceSynth: Promise<number>;
    chainThings: {genered: any, contract: Contract}
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Deposit: React.FC<propsType> = ({
    buyToken, chainThings, balanceSynth, balanceUSDC, available,
}) => {
    const { store, actions, asyncActions } = useStore((store) => ({
        WalletEntity: store.WalletEntity,
        UserEntity: store.UserEntity,
        CardsEntity: store.CardsEntity,
        ContractEntity: store.ContractEntity,
    }));
    const dispatch = useDispatch();
    const { chainId, account, provider } = store.WalletEntity;
    const { payData, txLoading } = store.UserEntity;
    const { data: CardData } = store.CardsEntity;
    const { allowance } = store.ContractEntity;

    const { changeLoadingTx } = actions.User;

    const { getAllowance, approve } = asyncActions.Contract;

    const [amount, setAmount] = useState('');
    const [synthAmount, setSynthAmount] = useState('');
    const [balances, setBalances] = useState<{usdc: string, synth: string}>({ usdc: '', synth: '' });
    const [maxError, setMaxError] = useState<boolean>(false);

    const { t } = useTranslation('index');

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
                    chainId,
                    cardId: localChain,
                }),
            );
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
        dispatch(changeLoadingTx(true));
        dispatch(
            approve({
                tokenAddress: chainThings.genered.CONTRACTS.STABLE.address,
                dexAddress: chainThings.genered.CONTRACTS.FEE.address,
                provider,
                chainId,
                cardId: localChain,
            }),

        );
        dispatch(changeLoadingTx(false));
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
            <Text title={t('aprCard')} content={`${CardData[localChain].apr}%`} classText={styles.mgT} />
            <Text title={t('yourSynthBalance')} content={`${balances.synth} SynthLP`} classText={styles.mgT} />
            <Text title={t('yourUSDCBalance')} content={`${balances.usdc} USDC`} classText={styles.mgT} />
            <ModalInput
                currencyReceive={networks[chainId as availableChains].currency}
                currencySend="USDC"
                titleReceive={t('youGetSynt')}
                titleSend={t('enterUSDCAmount')}
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
                        allowance[chainId][localChain] > 0
                            ? payData[localChain as availableChains]?.price
                                ? 'Add funds'
                                : 'Data Loading'
                            : 'Approve'
                    }
                    onClick={
                        allowance[chainId][localChain] > 0
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
