import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import DashboardItem from '../index';
import CardService from '@/src/ChainService/CardService';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { farms } from '@/src/utils/GlobalConst';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { setPayData, setPositionSum, setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';
import { setErrorStack, setError } from '@/src/Redux/store/reducers/AppSlice';
import { setCardInfo } from '@/src/Redux/store/reducers/CardInfoSlice';

const AvalancheContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const cardReducer = useAppSelector((state) => state.cardDataReducer);
    const { txLoading, isOpenModal, profits } = useAppSelector((state) => state.userReducer);
    const { error } = useAppSelector((state) => state.appReducer);
    const [rowGradient, setRowGradient] = useState<string>('');

    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
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
                        account ? farms[chainId]?.AVAX : '68',
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
                const percentage = Math.ceil(
                    (available / currentDeposits) * 100,
                );
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
                        totalDeposits: `${totalDeposits} USDC/USDC.e LP`,
                        currentDeposits: `$${currentDeposits.toFixed(3)}`,
                        price: `${Number(price.toFixed(6))}`,
                    },
                }));
                dispatch(setPayData({
                    key: '43114',
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
                setRowGradient(`linear-gradient(90deg, #E93038 0%, rgba(239, 70, 78, 0) ${percentage}%)`);
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
                        account ? farms[chainId]?.AVAX : '9',
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
                setPositionSum({ n: positions, key: '43114' });
                dispatch(setCardInfo(
                    {
                        key: data.chainId,
                        data: {
                            ...cardReducer[data.chainId],
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(totalPositions.toFixed(5))} USDC/USDC.e Synthetic LP`,
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

export default AvalancheContainer;
