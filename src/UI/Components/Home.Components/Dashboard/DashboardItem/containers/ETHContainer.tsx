import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { CardService } from 'src/Services';
import Modal from 'UI/Components/Modal';
import PayModal from 'UI/Components/Home.Components/PayModal';
import { farms } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import DashboardItem from '../index';

const ETHContainer = ({ isFiltered = false }) => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        WalletEntity: store.WalletEntity,
        AppEntity: store.AppEntity,
        CardsEntity: store.CardsEntity,
    }));

    const dispatch = useDispatch();
    const { account, chainId, preLoader } = store.WalletEntity;
    const { data: CardData } = store.CardsEntity;
    const { setDefaultCardData } = actions.Card;
    const { txLoading, isOpenModal } = store.UserEntity;

    const { setIsOpenModal, setPayData, setPositionSum } = actions.User;
    const { setCardInfo } = actions.Card;
    const [rowGradient, setRowGradient] = useState<string>('');
    const closeModal = () => {
        history.replaceState({}, '', '/');
        dispatch(setIsOpenModal(false));
    };
    const openModal = () => dispatch(setIsOpenModal(true));

    const data = {
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'aDAI-aSUSD',
        chainId: '1',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        vendor: 'convexfinance.com',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('ETH'), []);

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                let apr = 0;
                try {
                    const cardData = await Service.getCardData(
                        account ? farms[chainId]?.ETH : '7',
                    );
                    apr = cardData.apr;
                } catch (e) {
                    Notification.error('Error', e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            apr: apr.toString(),
                        },
                    }),
                );
            })();
        }
    });

    return (
        <>
            {isOpenModal && (
                <Modal handleClose={closeModal}>
                    <PayModal
                        available={CardData[data.chainId].available}
                        totalAvailable={CardData[data.chainId].totalAvailable}
                        price={CardData[data.chainId].price}
                        handleClose={closeModal}
                    />
                </Modal>
            )}
            <DashboardItem
                {...data}
                {...CardData[data.chainId]}
                isFiltered={isFiltered}
            />
        </>
    );
};

export default ETHContainer;
