import React, { useMemo, useEffect, useState } from 'react';
import { CardService } from 'services/index';
import { farms } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { Notification } from 'src/libs/Notification';
import DashboardItem from '../index';
import Modal from '../../../../../Components/Modal';
import PayModal from '../../../PayModal';

const BUSDContainer = ({ isFiltered = false }) => {
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
    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
    const openModal = () => dispatch(setIsOpenModal(true));

    const data = {
        icon: 'pancakeDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 199, 0, 0.2) 0%, rgba(255, 150, 1, 0) 96.87%)',
        heading: 'USDT-BUSD',
        chainId: '56',
        priceCurrency: 'USDT/BUSD Synthetic LP',
        vendor: 'pancakeswap.finance',
        disabled: false,
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('BSC'), []);

    useEffect(() => {
        if (!preLoader && CardData[data.chainId].apr === null) {
            (async () => {
                let [apr,
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price] = [0, 0, 0, 0, 0, 0];
                try {
                    const cardData = await Service.getCardData(
                        account ? farms[chainId]?.BSC : '7',
                    );
                    apr = cardData.apr;
                    available = cardData.available;
                    totalAvailable = cardData.totalAvailable;
                    totalDeposits = cardData.totalDeposits;
                    currentDeposits = cardData.currentDeposits;
                    price = cardData.price;
                } catch (e) {
                    Notification.error('Error', e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                const percentage = Math.ceil((available / currentDeposits) * 100);
                dispatch(setCardInfo({
                    key: data.chainId,
                    data: {
                        ...CardData[data.chainId],
                        apr: `${apr}`,
                        available: `${
                            CardData[data.chainId].localChain === chainId
                                ? 'Unlimited'
                                : Number(available.toFixed(5))
                        }`,
                        totalAvailable: totalAvailable.toString(),
                        totalDeposits: `${totalDeposits} USDT/BUSD LP`,
                        currentDeposits: `$${currentDeposits.toFixed(3)}`,
                        price: `${Number(price.toFixed(6))}`,
                    },
                }));
                setRowGradient(`linear-gradient(90deg, #FF9501 0%, rgba(239, 70, 78, 0) ${percentage}%)`);
                dispatch(setPayData({
                    key: '56',
                    data: {
                        available: `${
                            CardData[data.chainId].localChain === chainId
                                ? 'Unlimited'
                                : Number(available.toFixed(5))
                        }`,
                        price: `${Number(price.toFixed(6))}`,
                        totalAvailable: `$${totalAvailable}`,
                    },
                }));
            })();
        }
    }, [txLoading, chainId, preLoader]);

    useEffect(() => {
        (async () => {
            if (account && CardData[data.chainId].positions === null) {
                let [positions, totalPositions] = [0, 0];
                try {
                    const personalData = await Service.getPersonalData(
                        account,
                        account ? farms[chainId]?.BSC : '7',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    Notification.error('Error', e.message);
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                dispatch(setPositionSum({ n: positions, key: '56' }));
                dispatch(setCardInfo(
                    {
                        key: data.chainId,
                        data: {
                            ...CardData[data.chainId],
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(totalPositions.toFixed(5))} USDT/BUSD Synthetic LP`,
                            yieldTime: String(profits[data.chainId]?.value || ''),
                        },
                    },
                ));
            }
        })();
    }, [account, txLoading, chainId]);

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
            <DashboardItem {...data} {...CardData[data.chainId]} isFiltered={isFiltered} />
        </>
    );
};

export default BUSDContainer;
