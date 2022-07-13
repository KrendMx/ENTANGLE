import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import type { Contract } from 'ethers';
import { useTranslation } from 'next-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { networks, farms, namesConfig } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';
import { ChainConfig } from 'src/Services';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import styles from '../style.module.css';
import Text from '../Text';
import ModalInput from '../ModalInput';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';

type propsType = {
    // eslint-disable-next-line no-unused-vars
    sellToken: (value: number) => void;
    balanceSynth: Promise<number>;
    chainThings: {genered: any, contract: Contract};
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Withdraw: React.FC<propsType> = ({
    sellToken, balanceSynth, chainThings,
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
    const [synthAmount, setSynthAmount] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [synthBalance, setSynthBalance] = useState<string>('');
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
                    chainId,
                    cardId: localChain,
                }),
            );
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
        dispatch(changeLoadingTx(true));
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
                chainId,
                cardId: localChain,
            }),
        );
        dispatch(changeLoadingTx(false));
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
                <Text title={t('aprCard')} content={`${CardData[localChain].apr}%`} />
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
                        allowance[chainId][localChain] > 0
                            ? payData[localChain as availableChains]?.price
                                ? 'Sell funds'
                                : 'Data Loading'
                            : 'Approve'
                    }
                    onClick={
                        allowance[chainId][localChain] > 0
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