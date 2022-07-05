import React, { useEffect, useMemo, useState } from 'react';
import DashboardItem from '../index';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import CardService from '@/src/ChainService/CardService';
import { setCardInfo } from '@/src/Redux/store/reducers/CardInfoSlice';
import { setIsOpenModal, setPayData } from '@/src/Redux/store/reducers/UserSlice';
import { setError, setErrorStack } from '@/src/Redux/store/reducers/AppSlice';
import Modal from '@/components/Modal';
import PayModal from '@/components/HomePage/PayModal';
import { farms } from '@/src/utils/GlobalConst';

const ETHContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, isOpenModal, profits } = useAppSelector((state) => state.userReducer);
    const { error } = useAppSelector((state) => state.appReducer);
    const cardReducer = useAppSelector((state) => state.cardDataReducer);
    const [rowGradient, setRowGradient] = useState<string>('');
    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
    const openModal = () => dispatch(setIsOpenModal(true));

    // const Service = new CardService('BSC');

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
        if (!preLoader && cardReducer[data.chainId].apr === null) {
            (async () => {
                let [apr,
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price] = [0, 0, 0, 0, 0, 0];
                try {
                    const cardData = await Service.getCardData(account ? farms[chainId]?.ETH : '7');
                    apr = cardData.apr;
                    available = cardData.available;
                    totalAvailable = cardData.totalAvailable;
                    totalDeposits = cardData.totalDeposits;
                    currentDeposits = cardData.currentDeposits;
                    price = cardData.price;
                } catch (e) {
                    if (!error) {
                        dispatch(setError({ e: { head: 'Error', message: e.message } }));
                    }
                    dispatch(setErrorStack({ e: { head: 'Error', message: e.message } }));
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }

                dispatch(setCardInfo({
                    key: data.chainId,
                    data: {
                        ...cardReducer[data.chainId],
                        apr: `${apr}`,
                        available: `${
                            cardReducer[data.chainId].localChain === chainId
                                ? 'Unlimited'
                                : '0'
                        }`,
                        totalAvailable: totalAvailable.toString(),
                        totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
                        currentDeposits: `$${currentDeposits.toFixed(3)}`,
                        price: `${1}`,
                    },
                }));
                setRowGradient('123');
                dispatch(setPayData({
                    key: '1',
                    data: {
                        available: `${
                            cardReducer[data.chainId].localChain === chainId
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

    return (
        <>
            {isOpenModal && (
                <Modal handleClose={closeModal}>
                    <PayModal
                        available={cardReducer[data.chainId].available}
                        totalAvailable={cardReducer[data.chainId].totalAvailable}
                        price={cardReducer[data.chainId].price}
                        handleClose={closeModal}
                    />
                </Modal>
            )}
            <DashboardItem {...data} {...cardReducer[data.chainId]} isFiltered={isFiltered} />
        </>
    );
};

export default ETHContainer;
