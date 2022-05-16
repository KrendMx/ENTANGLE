import React, {
    useReducer, useContext, useState, useMemo, useEffect,
} from 'react';
import ChainService from '../../../../../src/ChainService/ChainService';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import { farms } from '../../../../../src/utils/GlobalConst';
import { ServiceContext } from '../../../../../src/context/ServiceContext/ServiceContext';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { useAppSelector, useAppDispatch } from '../../../../../Redux/store/hooks/redux';
import { setPayData, setPositionSum } from '../../../../../Redux/store/reducers/UserSlice';

const BUSDContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, payData } = useAppSelector((state) => state.userReducer);
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
            localChain: '56',
            localName: 'BSC',
        },
    );
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    const data = {
        icon: 'pancakeDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 199, 0, 0.2) 0%, rgba(255, 150, 1, 0) 96.87%)',
        heading: 'USDT-BUSD',
        chainId: '56',
        priceCurrency: 'USDT/BUSD Synthetic LP',
        description:
            'Generates yield by running an autocompound UST/BUSD strategy on pancakeswap.finance',
        disabled: false,
        openModal,
        ...state,
    } as const;

    const Service = useMemo(() => new ChainService('BSC'), []);

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                setState({ available: null, totalAvailable: null });
                const {
                    apr,
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price,
                } = await Service.getCardData(account ? farms[chainId].BSC : '7');
                const percentage = Math.ceil((available / currentDeposits) * 100);
                dispatch(setPayData({
                    key: '56',
                    data: {
                        available: `${
                            state.localChain === chainId
                                ? 'Infinity'
                                : Number(available.toFixed(5))
                        }`,
                        price: `${Number(price.toFixed(6))}`,
                        totalAvailable: `$${totalAvailable}`,
                    },
                }));
                setState({
                    apr: `${apr}%`,
                    totalDeposits: `${totalDeposits} USDT/BUSD LP`,
                    currentDeposits: `$${currentDeposits.toFixed(3)}`,
                    available: `${state.localChain === chainId ? 'Infinity' : Number(available.toFixed(5))}`,
                    totalAvailable: state.localChain === chainId ? '' : `$${totalAvailable.toFixed(5)}`,
                    price: `${Number(price.toFixed(6))}`,
                    rowGradient: `linear-gradient(90deg, #FF9501 0%, rgba(239, 70, 78, 0) ${percentage}%)`,
                });
            })();
        }
    }, [txLoading, chainId, preLoader]);

    useEffect(() => {
        (async () => {
            if (account) {
                setState({ positions: null, totalPositions: null });
                const { positions, totalPositions } = await Service.getPersonalData(
                    account,
                    account ? farms[chainId].BSC : '7',
                );
                // const yieldTime = await getProfit(account, 67);
                const yieldTime = { stable: '' };
                dispatch(setPositionSum({ n: positions, key: '56' }));
                setState({
                    positions: `$${Number(positions.toFixed(2))}`,
                    totalPositions: `${Number(
                        totalPositions.toFixed(5),
                    )} USDT/BUSD Synthetic LP`,
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

export default BUSDContainer;
