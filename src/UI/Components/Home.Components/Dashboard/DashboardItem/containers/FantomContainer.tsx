import React, { useEffect, useMemo, useState } from 'react';
import { farms } from 'utils/Global/Vars';
import { CardService } from 'src/Services';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { Notification } from 'src/libs/Notification';
import { useTranslation } from 'react-i18next';
import PayModal from '../../../PayModal';
import Modal from '../../../../Modal';
import DashboardItem from '../index';

const FantomContainer = ({ isFiltered = false }) => {
    const {
        store: {
            WalletEntity: {
                account,
                chainId,
                preLoader,
            },
            UserEntity: {
                isOpenModal,
                profits,
            },
            ContractEntity: {
                txLoading,
            },
            CardsEntity: {
                data: CardData,
            },
        }, actions: {
            User: {
                setIsOpenModal,
                setPayData,
                setPositionSum,
            },
            Card: {
                setCardInfo,
            },
        },
    } = useStore((store) => ({
        UserEntity: store.UserEntity,
        WalletEntity: store.WalletEntity,
        AppEntity: store.AppEntity,
        CardsEntity: store.CardsEntity,
        ContractEntity: store.ContractEntity,
    }));

    const dispatch = useDispatch();
    const [rowGradient, setRowGradient] = useState<string>('');
    const closeModal = () => {
        history.replaceState({}, '', '/');
        dispatch(setIsOpenModal(false));
    };
    const openModal = () => dispatch(setIsOpenModal(true));
    const data = {
        icon: 'fantom.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(15, 89, 142, 0.4) 0%, rgba(15, 89, 142, 0) 100%)',
        heading: 'MIM-USDC',
        chainId: '250',
        priceCurrency: 'MIM/USDC Synthetic LP',
        vendor: 'spiritswap.finance',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('FTM'), []);

    const { t: tError } = useTranslation('error');

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                let [
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price,
                ] = [0, 0, 0, 0, 0];
                try {
                    const cardData = await Service.getCardData(
                        account ? farms[chainId]?.FTM : farms['43114']?.FTM,
                    );
                    available = cardData.available;
                    totalAvailable = cardData.totalAvailable;
                    totalDeposits = cardData.totalDeposits;
                    currentDeposits = cardData.currentDeposits;
                    price = cardData.price;
                } catch (e) {
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                const percentage = Math.ceil(
                    (available / currentDeposits) * 100,
                );
                setRowGradient(
                    `linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`,
                );
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            available: `${
                                CardData[data.chainId].localChain === chainId
                                    ? 'Unlimited'
                                    : available.toFixed(2)
                            }`,
                            totalAvailable: totalAvailable.toFixed(2),
                            totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
                            currentDeposits: `$${currentDeposits.toFixed(3)}`,
                            price: `${Number(price.toFixed(6))}`,
                        },
                    }),
                );
                dispatch(
                    setPayData({
                        key: '250',
                        data: {
                            available: `${
                                CardData[data.chainId].localChain === chainId
                                    ? 'Unlimited'
                                    : Number(available.toFixed(5))
                            }`,
                            price: `${Number(price.toFixed(6))}`,
                            totalAvailable: `$${totalAvailable}`,
                        },
                    }),
                );
            })();
        }
    }, [txLoading, chainId, preLoader]);

    useEffect(() => {
        (async () => {
            if (account) {
                let [positions, totalPositions] = [0, 0];
                try {
                    const personalData = await Service.getPersonalData(
                        account,
                        account ? farms[chainId]?.FTM : '67',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    Notification.error(tError('error'), e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                setPositionSum({ n: positions, key: '250' });
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(
                                totalPositions.toFixed(5),
                            )} MIM/USDC Synthetic LP`,
                            yieldTime: String(
                                profits[data.chainId]?.value || '',
                            ),
                        },
                    }),
                );
            }
        })();
    }, [account, txLoading, chainId]);

    return (
        <DashboardItem
            {...data}
            {...CardData[data.chainId]}
            isFiltered={isFiltered}
        />
    );
};

export default FantomContainer;
