import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { CardService } from 'src/Services';
import { farms } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../index';

const ElrondContainer = ({ isFiltered = false }) => {
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

    const { t: tError } = useTranslation('error');

    const data = {
        icon: 'elrondDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(252,252,252,0.5) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'EGLD-USDC',
        chainId: '100',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        vendor: 'maiar.exchange',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('ELRD'), []);

    useEffect(() => {
        (async () => {
            if (account) {
                let [positions, totalPositions] = [0, 0];
                try {
                    const personalData = await Service.getPersonalData(
                        account,
                        account ? farms[chainId]?.ELRD : '100',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    Notification.error(tError('error'), e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                dispatch(setPositionSum({ n: positions, key: '100' }));
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(
                                totalPositions.toFixed(5),
                            )} USDT/BUSD Synthetic LP`,
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

export default ElrondContainer;
