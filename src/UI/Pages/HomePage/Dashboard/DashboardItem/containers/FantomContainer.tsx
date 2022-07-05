import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
import DashboardItem from '../index';
import { farms } from '@/src/utils/GlobalConst';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import CardService from '@/src/ChainService/CardService';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { setPayData, setPositionSum, setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';
import { setErrorStack, setError } from '@/src/Redux/store/reducers/AppSlice';
import { setCardInfo } from '@/src/Redux/store/reducers/CardInfoSlice';

const FantomContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, isOpenModal, profits } = useAppSelector((state) => state.userReducer);
    const { error } = useAppSelector((state) => state.appReducer);
    const cardReducer = useAppSelector((state) => state.cardDataReducer);
    const [rowGradient, setRowGradient] = useState<string>('');
    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
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
                        account ? farms[chainId]?.FTM : '9',
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
                        totalDeposits: `${totalDeposits} MIM/USDC LP`,
                        currentDeposits: `$${currentDeposits.toFixed(3)}`,
                        price: `${Number(price.toFixed(6))}`,
                    },
                }));
                dispatch(setPayData({
                    key: '250',
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
                setRowGradient(`linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`);
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
                        account ? farms[chainId]?.FTM : '67',
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
                setPositionSum({ n: positions, key: '250' });
                dispatch(setCardInfo(
                    {
                        key: data.chainId,
                        data: {
                            ...cardReducer[data.chainId],
                            positions: `$${Number(positions.toFixed(2))}`,
                            totalPositions: `${Number(totalPositions.toFixed(5))} MIM/USDC Synthetic LP`,
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

export default FantomContainer;
