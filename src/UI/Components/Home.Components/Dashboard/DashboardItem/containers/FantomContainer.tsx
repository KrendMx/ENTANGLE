import React, { useEffect, useMemo, useState } from 'react';
import { farms } from 'utils/Global/Vars';
import { CardService } from 'src/Services';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { Notification } from 'src/libs/Notification';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../index';

const FantomContainer = ({ isFiltered = false }) => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        WalletEntity: store.WalletEntity,
        AppEntity: store.AppEntity,
        CardsEntity: store.CardsEntity,
    }));

    const dispatch = useDispatch();
    const { account, chainId, preLoader } = store.WalletEntity;
    const { data: CardData } = store.CardsEntity;
    const { txLoading, isOpenModal, profits } = store.UserEntity;

    const { setIsOpenModal, setPayData, setPositionSum } = actions.User;
    const { setCardInfo } = actions.Card;
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
