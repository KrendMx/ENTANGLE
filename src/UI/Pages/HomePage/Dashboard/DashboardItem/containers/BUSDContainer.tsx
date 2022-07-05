import React, { useMemo, useEffect, useState } from 'react';
import CardService from '@/src/ChainService/CardService';
import DashboardItem from '../index';
import { farms } from '@/src/utils/GlobalConst';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { setPayData, setPositionSum, setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';
import { setErrorStack, setError } from '@/src/Redux/store/reducers/AppSlice';
import { setCardInfo } from '@/src/Redux/store/reducers/CardInfoSlice';

const BUSDContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, isOpenModal, profits } = useAppSelector((state) => state.userReducer);
    const { error } = useAppSelector((state) => state.appReducer);
    const cardReducer = useAppSelector((state) => state.cardDataReducer);
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
        if (!preLoader && cardReducer[data.chainId].apr === null) {
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
                    if (!error) {
                        dispatch(setError({ e: { head: 'Error', message: e.message } }));
                    }
                    dispatch(setErrorStack({ e: { head: 'Error', message: e.message } }));
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                const percentage = Math.ceil((available / currentDeposits) * 100);
                dispatch(setCardInfo({
                    key: data.chainId,
                    data: {
                        ...cardReducer[data.chainId],
                        apr: `${apr}`,
                        available: `${
                            cardReducer[data.chainId].localChain === chainId
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

    useEffect(() => {
        (async () => {
            if (account && cardReducer[data.chainId].positions === null) {
                let [positions, totalPositions] = [0, 0];
                try {
                    const personalData = await Service.getPersonalData(
                        account,
                        account ? farms[chainId]?.BSC : '7',
                    );
                    positions = personalData.positions;
                    totalPositions = personalData.totalPositions;
                } catch (e: any) {
                    if (!error) {
                        dispatch(setError({ e: { head: 'Error', message: e.message } }));
                    }
                    dispatch(setErrorStack({ e: { head: 'Error', message: e.message } }));
                    if ((e.code as number) === -32002) {
                        localStorage.removeItem('wallet');
                    }
                }
                dispatch(setPositionSum({ n: positions, key: '56' }));
                dispatch(setCardInfo(
                    {
                        key: data.chainId,
                        data: {
                            ...cardReducer[data.chainId],
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(totalPositions.toFixed(5))} USDT/BUSD Synthetic LP`,
                            yieldTime: String(profits.get(data.chainId)?.value || ''),
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

export default BUSDContainer;
