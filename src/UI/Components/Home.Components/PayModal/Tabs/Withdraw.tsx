import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Contract } from 'ethers';
import { useTranslation } from 'next-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { networks, farms, namesConfig } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';
import { ChainConfig } from 'src/Services';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import { opToken } from 'utils/ABIs';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import styles from '../style.module.css';
import ModalInput from '../ModalInput';
import type { ContainerStateType } from '../../Dashboard/DashboardItem/containers/types';

type propsType = {
    // eslint-disable-next-line no-unused-vars
    sellToken: (value: number) => void;
    balanceSynth: Promise<number>;
    chainThings: { genered: any; contract: Contract };
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Withdraw: React.FC<propsType> = ({
    sellToken,
    balanceSynth,
    chainThings,
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
    const [synthAmount, setSynthAmount] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [synthBalance, setSynthBalance] = useState<string>('');
    const [maxError, setMaxError] = useState<boolean>(false);
    const [allow, setAllow] = useState<number>(0);

    const { t } = useTranslation('index');

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
            // TODO: переделать в кор
            const contract = new Contract(
                chainThings.genered.CONTRACTS.SYNTH.address,
                opToken,
                provider?.getSigner(),
            );

            const value = await contract.allowance(
                account,
                chainThings.genered.CONTRACTS.FEE.address,
            );
            setAllow(value);
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
                chainId,
                cardId: localChain,
            }),
        );
    };

    const getMax = async () => {
        const res = (await balanceSynth).toString();
        setAmount(res || '0');
        setSynthAmount(
            (Number(res) * Number(payData[localChain]?.price)).toString(),
        );
    };

    const buttonData = useMemo(() => {
        const res = {
            title: t('dataLoading'),
            disabled: true,
            onClick: () => {},
            loader: txLoading,
        };
        if (allowance[localChain] && payData[localChain]) {
            if (allowance[localChain].toString().length > 1 && payData[localChain]?.price) {
                res.title = t('sellFunds');
            } else {
                res.title = t('approve');
            }
        }
        if (res.title === t('approve')) {
            res.onClick = () => handleApprove();
            res.disabled = false;
        } else if (res.title === t('sellFunds')) {
            res.disabled = !(Number(amount) !== 0 && Number(amount) <= Number(synthBalance));
            res.onClick = () => sellToken(parseFloat(amount));
        }

        return res;
    }, [amount, txLoading, payData, allowance]);

    return (
        <div className={styles.container}>
            <p className={styles.warn}>
                {`${t('withdrawStartPhrase')} 15 ${t('withdrawEndPhrase')}`}
            </p>
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
            <div className={styles.mg2}>
                <TextGroup
                    title={t('aprCard')}
                    value={`${CardData[localChain].apr}%`}
                    customClassNameWrapper={styles.mgt2}
                    customClassNameTitle={styles.textTitle}
                    customClassNameValue={styles.textValue}
                />
                <br />
                <TextGroup
                    title={t('yourSynthBalance')}
                    value={`${Number(synthBalance).toFixed(3)} SynthLP`}
                    customClassNameWrapper={styles.mgt2}
                    customClassNameTitle={styles.textTitle}
                    customClassNameValue={styles.textValue}
                />
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
                {txLoading || maxError ? (
                    <GradientButton
                        isWhite
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
                )}
            </div>
        </div>
    );
};

export default Withdraw;
