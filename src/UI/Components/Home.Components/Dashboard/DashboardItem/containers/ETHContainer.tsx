import React, { useMemo, useState } from 'react';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { CardService } from 'src/Services';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../index';

const ETHContainer = ({ isFiltered = false }) => {
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
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.15) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'aDAI-aSUSD',
        chainId: '1',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        vendor: 'convexfinance.com',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('ETH'), []);

    return (
        <DashboardItem
            {...data}
            {...CardData[data.chainId]}
            isFiltered={isFiltered}
        />
    );
};

export default ETHContainer;
