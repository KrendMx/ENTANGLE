import React, { useEffect, useMemo, useState } from 'react';
import { farms } from 'utils/Global/Vars';
import { CardService } from 'src/Services';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import { Notification } from 'src/libs/Notification';
import PayModal from '../../../PayModal';
import Modal from '../../../../Modal';
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
        rty: '123',
        openModal,
        rowGradient,
    } as const;

    const Service = useMemo(() => new CardService('FTM'), []);

    useEffect(() => {
        if (!preLoader && CardData[data.chainId].apr === null) {
            (async () => {
                let apr = 0;
                try {
                    const cardData = await Service.getCardData(
                        account ? farms[chainId]?.FTM : '9',
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

    useEffect(() => {
        if (!preLoader && CardData[data.chainId].available === null) {
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
                        account ? farms[chainId]?.FTM : '9',
                    );
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
                const percentage = Math.ceil(
                    (available / currentDeposits) * 100,
                );
                dispatch(
                    setCardInfo({
                        key: data.chainId,
                        data: {
                            available: `${
                                CardData[data.chainId].localChain === chainId
                                    ? 'Unlimited'
                                    : Number(available.toFixed(5))
                            }`,
                            totalAvailable: totalAvailable.toString(),
                            totalDeposits: `${totalDeposits} MIM/USDC LP`,
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
                setRowGradient(
                    `linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`,
                );
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
                        account ? farms[chainId]?.FTM : '67',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    Notification.error('Error', e.message);
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

export default FantomContainer;
