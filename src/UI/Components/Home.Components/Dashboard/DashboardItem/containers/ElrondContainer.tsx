import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { CardService } from 'src/Services';
import Modal from 'UI/Components/Modal';
import PayModal from 'UI/Components/Home.Components/PayModal';
import { farms } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../index';

const ElrondContainer = ({ isFiltered = false }) => {
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
        icon: 'elrondDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(252,252,252,0.5) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'EGLD-USDC',
        chainId: '22417',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        vendor: 'maiar.exchange',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    // const Service = useMemo(() => new CardService('EGLD'), []);

    // useEffect(() => {
    //     if (!preLoader) {
    //         (async () => {
    //             let apr = 0;
    //             try {
    //                 const cardData = await Service.getCardData(
    //                     account ? farms[chainId]?.ETH : '7',
    //                 );
    //                 apr = cardData.apr;
    //             } catch (e) {
    //                 Notification.error(tError('error'), e.message);
    //                 if ((e.code as number) === -32002) {
    //                     localStorage.removeItem('wallet');
    //                 }
    //             }
    //             dispatch(
    //                 setCardInfo({
    //                     key: data.chainId,
    //                     data: {
    //                         apr: apr.toString(),
    //                     },
    //                 }),
    //             );
    //         })();
    //     }
    // });

    // useEffect(() => {
    //     if (!preLoader) {
    //         (async () => {
    //             let [
    //                 available,
    //                 totalAvailable,
    //                 totalDeposits,
    //                 currentDeposits,
    //                 price,
    //             ] = [0, 0, 0, 0, 0];
    //             try {
    //                 const cardData = await Service.getCardData(
    //                     account ? farms[chainId]?.ETH : '7',
    //                 );
    //                 available = cardData.available;
    //                 totalAvailable = cardData.totalAvailable;
    //                 totalDeposits = cardData.totalDeposits;
    //                 currentDeposits = cardData.currentDeposits;
    //                 price = cardData.price;
    //             } catch (e) {
    //                 if ((e.code as number) === -32002) {
    //                     localStorage.removeItem('wallet');
    //                 }
    //             }
    //             const percentage = Math.ceil(
    //                 (available / currentDeposits) * 100,
    //             );
    //             setRowGradient(
    //                 `linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`,
    //             );
    //             dispatch(
    //                 setCardInfo({
    //                     key: data.chainId,
    //                     data: {
    //                         available: `${
    //                             CardData[data.chainId].localChain === chainId
    //                                 ? 'Unlimited'
    //                                 : available
    //                         }`,
    //                         totalAvailable: totalAvailable.toFixed(2),
    //                         totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
    //                         currentDeposits: `$${currentDeposits.toFixed(3)}`,
    //                         price: `${Number(price.toFixed(6))}`,
    //                     },
    //                 }),
    //             );
    //             dispatch(
    //                 setPayData({
    //                     key: '1',
    //                     data: {
    //                         available: `${
    //                             CardData[data.chainId].localChain === chainId
    //                                 ? 'Unlimited'
    //                                 : Number(available.toFixed(5))
    //                         }`,
    //                         price: `${Number(price.toFixed(6))}`,
    //                         totalAvailable: `$${totalAvailable}`,
    //                     },
    //                 }),
    //             );
    //         })();
    //     }
    // }, [txLoading, chainId, preLoader]);

    return (
        <DashboardItem
            {...data}
            {...CardData[data.chainId]}
            disabled
            isFiltered={isFiltered}
        />
    );
};

export default ElrondContainer;