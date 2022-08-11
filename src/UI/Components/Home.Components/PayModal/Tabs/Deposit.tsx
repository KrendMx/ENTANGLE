import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { BigNumber, Contract, ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { networks, namesConfig } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import { opToken } from 'utils/ABIs';
import Text from '../Text';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';
import ModalInput from '../ModalInput';
import styles from '../style.module.css';

type propsType = {
    buyToken: (value: number) => void;
    balanceUSDC: Promise<number>;
    balanceSynth: Promise<number>;
    chainThings: { genered: any; contract: Contract };
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Deposit: React.FC<propsType> = ({
    buyToken,
    chainThings,
    balanceSynth,
    balanceUSDC,
    available,
}) => {
    const {
        store: {
            WalletEntity: {
                chainId,
                account,
                provider,
            },
            UserEntity: {
                payData,
            },
            CardsEntity: {
                data: CardData,
            },
            ContractEntity: {
                allowance,
                txLoading,
            },
        }, actions: {
            Contract: {
                changeLoadingTx,
                setAllowance,
            },
        }, asyncActions: {
            Contract: {
                approve,
            },
        },
    } = useStore((store) => ({
        WalletEntity: store.WalletEntity,
        UserEntity: store.UserEntity,
        CardsEntity: store.CardsEntity,
        ContractEntity: store.ContractEntity,
    }));
    const dispatch = useDispatch();

    const [amount, setAmount] = useState('');
    const [synthAmount, setSynthAmount] = useState('');
    const [balances, setBalances] = useState<{ usdc: string; synth: string }>({
        usdc: '',
        synth: '',
    });

    const { t } = useTranslation('index');

    const localChain = useMemo(
        () => namesConfig[sessionStorage.getItem('card')],
        [chainId],
    );

    useEffect(() => {
        (async function getAllowanceAndBalance() {
            const contract = new Contract(
                chainThings.genered.CONTRACTS.STABLE.address,
                opToken,
                provider?.getSigner(),
            );

            const value = await contract.allowance(
                account,
                chainThings.genered.CONTRACTS.FEE.address,
            );
            dispatch(setAllowance({ cardId: localChain, value }));
        }());
    }, [chainId, txLoading]);

    useEffect(() => {
        (async function calcBalances() {
            const firstBalance = (await balanceUSDC).toFixed(3);
            const secondBalance = (await balanceSynth).toFixed(3);
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
                chainId,
                cardId: localChain,
            }),
        );
    };

    const getMax = async () => {
        const balance = (await balanceUSDC).toString();
        setAmount(balance || '0');
        setSynthAmount(
            (Number(balance) * Number(payData[localChain]?.price)).toFixed(3),
        );
    };

    const buttonData = useMemo(() => {
        const res = {
            title: t('dataLoading'),
            disabled: txLoading,
            onClick: () => {},
            loader: txLoading,
        };
        if (allowance[localChain] && payData[localChain]) {
            if (allowance[localChain].toString().length > 1 && payData[localChain]?.price) {
                res.title = t('addFunds');
            } else {
                res.title = t('approve');
            }
        }
        if (res.title === t('approve')) {
            res.onClick = () => handleApprove();
        } else if (res.title === t('addFunds')) {
            res.disabled = !(Number(amount) !== 0 && Number(amount) <= Number(balances.usdc));
            res.onClick = () => buyToken(parseFloat(amount));
        }
        if (txLoading) {
            res.disabled = true;
            res.title = t('Waiting');
            res.loader = true;
        }
        return res;
    }, [amount, txLoading, payData, allowance]);

    return (
        <div className={styles.container}>
            {!moreThenAvailable ? (
                <p className={styles.warn}>
                    {`${t('withdrawStartPhrase')} 15 ${t('withdrawEndPhrase')}`}
                </p>
            ) : (
                <p className={styles.warnScd}>
                    {`${t('depositeStartPhrase')} 
                    ${Number(synthAmount).toFixed(3)} ${t(
                    'depositeEndPhrase',
                )}`}
                </p>
            )}
            <div
                className={styles.priceBlock}
                style={
                    {
                        '--color-from': `${
                            localChain !== '1'
                                ? networks[localChain]?.mainColor
                                : '#121212'
                        }`,
                    } as React.CSSProperties
                }
            >
                <div className={styles.priceContent}>
                    <p>{t('price')}</p>
                    {payData[localChain]?.price ? (
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
                            localChain !== '1'
                                ? networks[localChain]?.icon
                                : 'etheriumDashboard.svg'
                        }`}
                        alt={`${networks[localChain]?.title}-logo`}
                    />
                </div>
            </div>
            <Text
                title={t('aprCard')}
                content={`${CardData[localChain].apr}%`}
                classText={styles.mgT}
            />
            <Text
                title={t('yourSynthBalance')}
                content={`${balances.synth} SynthLP`}
                classText={styles.mgT}
            />
            <Text
                title={t('yourUSDCBalance')}
                content={`${balances.usdc} USDC`}
                classText={styles.mgT}
            />
            <ModalInput
                currencyReceive={networks[chainId as availableChains].currency}
                currencySend="USDC"
                titleReceive={t('youGetSynt')}
                titleSend={t('enterUSDCAmount')}
                sendValue={amount}
                receiveValue={synthAmount}
                onReceiveChange={(e) => {
                    if (e.target.value.length <= 6) {
                        setAmount(
                            e.target.value
                                ? (
                                    Number(e.target.value)
                                      / Number(payData[localChain]?.price)
                                ).toFixed(3)
                                : '',
                        );
                        setSynthAmount(e.target.value);
                    }
                }}
                onSendChange={(e) => {
                    if (e.target.value.length <= 6) {
                        setAmount(e.target.value);
                        setSynthAmount(
                            e.target.value
                                ? (
                                    Number(e.target.value)
                                      * Number(payData[localChain]?.price)
                                ).toFixed(3)
                                : '',
                        );
                    }
                }}
                getMax={getMax}
            />
            <div style={{ marginTop: '30px' }}>
                <GradientButton
                    isWhite
                    {...buttonData}
                    loader={
                        buttonData.loader && (
                            <i
                                className="fa fa-spinner fa-spin"
                                style={{ marginLeft: '5px' }}
                            />
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Deposit;
