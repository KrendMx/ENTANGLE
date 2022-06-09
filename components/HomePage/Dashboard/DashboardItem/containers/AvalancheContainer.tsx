import React, {
    useEffect,
    useMemo,
    useReducer,
    useContext,
} from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import ChainService from '@/src/ChainService/ChainService';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { farms } from '@/src/utils/GlobalConst';
import { ServiceContext } from '@/src/context/ServiceContext/ServiceContext';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { setPayData, setPositionSum, setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';
import { setErrorStack, setError, addSortingCard } from '@/src/Redux/store/reducers/AppSlice';

const AvalancheContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, isOpenModal } = useAppSelector((state) => state.userReducer);
    const { error } = useAppSelector((state) => state.appReducer);
    const { getProfit } = useContext(ServiceContext);
    const [state, setState] = useReducer(
        (
            containerState: ContainerStateType,
            stateUpdate: Partial<ContainerStateType>,
        ) => ({ ...containerState, ...stateUpdate }),
        {
            apr: null,
            currentDeposits: null,
            totalDeposits: null,
            available: null,
            totalAvailable: null,
            price: null,
            positions: null,
            totalPositions: null,
            rowGradient: '',
            yieldTime: null,
            localChain: '43114',
            localName: 'AVAX',
        },
    );

    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
    const openModal = () => dispatch(setIsOpenModal(true));

    const data = {
        icon: 'avalancheDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(233, 48, 56, 0.4) 0%, rgba(239, 70, 78, 0) 100%)',
        heading: 'USDC-USDC.e',
        chainId: '43114',
        priceCurrency: 'USDC/USDC.e Synthetic LP',
        description:
            'Generates yield by running autocompounded USDC/USDC.e strategy on traderjoexyz.com',
        disabled: false,
        openModal,
        ...state,
    } as const;

    const Service = useMemo(() => new ChainService('AVAX'), []);

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                setState({ available: null, totalAvailable: null });
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
                dispatch(addSortingCard({
                    name: data.heading,
                    APR: Number(apr),
                    staked: Number(available).toFixed(5),
                }));
                dispatch(setPayData({
                    key: '43114',
                    data: {
                        available: `${
                            state.localChain === chainId
                                ? 'Unlimited'
                                : Number(available.toFixed(5))
                        }`,
                        price: `${Number(price.toFixed(6))}`,
                        totalAvailable: `$${totalAvailable}`,
                    },
                }));
                setState({
                    apr: `${apr}%`,
                    totalDeposits: `${totalDeposits} USDC/USDC.e LP`,
                    currentDeposits: `$${currentDeposits.toFixed(3)}`,
                    available: `${
                        state.localChain === chainId
                            ? 'Unlimited'
                            : Number(available.toFixed(5))
                    }`,
                    totalAvailable:
                        state.localChain === chainId
                            ? ''
                            : `$${totalAvailable.toFixed(5)}`,
                    price: `${Number(price.toFixed(6))}`,
                    rowGradient: `linear-gradient(90deg, #E93038 0%, rgba(239, 70, 78, 0) ${percentage}%)`,
                });
            })();
        }
    }, [txLoading, chainId, preLoader]);

    useEffect(() => {
        (async () => {
            if (account) {
                setState({ positions: null, totalPositions: null });
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
                const yieldTime = await getProfit(account, 67);
                setPositionSum({ n: positions, key: '43114' });
                setState({
                    positions: `$${Number(positions.toFixed(2))}`,
                    totalPositions: `${Number(
                        totalPositions.toFixed(5),
                    )} USDC/USDC.e Synthetic LP`,
                    yieldTime: `$${Number(yieldTime.stable || 0).toFixed(4)}`,
                });
            }
        })();
    }, [account, txLoading, chainId]);

    return (
        <>
            {isOpenModal && (
                <Modal handleClose={closeModal}>
                    <PayModal
                        available={state.available}
                        totalAvailable={state.totalAvailable}
                        price={state.price}
                        handleClose={closeModal}
                    />
                </Modal>
            )}
            <DashboardItem {...data} isFiltered={isFiltered} />
        </>
    );
};

export default AvalancheContainer;
