import React, { useEffect, useMemo, useState } from 'react';
import { CardService } from 'src/Services';
import { farms } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { Notification } from 'src/libs/Notification';
import { useTranslation } from 'react-i18next';
import PayModal from '../../../PayModal';
import Modal from '../../../../Modal';
import DashboardItem from '../index';

const AvalancheContainer = ({ isFiltered = false }) => {
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

    const openModal = () => dispatch(setIsOpenModal(true));

    const data = {
        icon: 'avalancheDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(233, 48, 56, 0.4) 0%, rgba(239, 70, 78, 0) 100%)',
        heading: 'USDC-USDC.e',
        chainId: '43114',
        priceCurrency: 'USDC/USDC.e Synthetic LP',
        vendor: 'traderjoexyz.com',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('AVAX'), []);

    const { t: tError } = useTranslation('error');

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                const {
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price,
                } = await Service.getCardData(
                    account ? farms[chainId]?.AVAX : farms['43114']?.AVAX,
                );
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
                            totalAvailable: totalAvailable.toString(),
                            totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
                            currentDeposits: `$${currentDeposits.toFixed(3)}`,
                            price: `${Number(price.toFixed(6))}`,
                        },
                    }),
                );
                dispatch(
                    setPayData({
                        key: '43114',
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
                        account ? farms[chainId]?.AVAX : '9',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    Notification.error(tError('error'), e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                setPositionSum({ n: positions, key: '43114' });
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            positions: `$${Number(positions.toFixed(5))}`,
                            totalPositions: `${Number(
                                totalPositions.toFixed(5),
                            )} USDC/USDC.e Synthetic LP`,
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

export default AvalancheContainer;
