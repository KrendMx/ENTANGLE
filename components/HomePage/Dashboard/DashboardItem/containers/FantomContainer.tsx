import React, {
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import { farms } from '@/src/utils/GlobalConst';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import ChainService from '@/src/ChainService/ChainService';
import { ServiceContext } from '@/src/context/ServiceContext/ServiceContext';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { setPayData, setPositionSum, setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';

const FantomContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const { account, chainId, preLoader } = useAppSelector((state) => state.walletReducer);
    const { txLoading, isOpenModal } = useAppSelector((state) => state.userReducer);
    const { getProfit } = useContext(ServiceContext);

    const closeModal = () => { history.replaceState({}, '', '/'); dispatch(setIsOpenModal(false)); };
    const openModal = () => dispatch(setIsOpenModal(true));
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
            localChain: '250',
            localName: 'FTM',
        },
    );
    const data = {
        icon: 'fantomDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(15, 89, 142, 0.4) 0%, rgba(15, 89, 142, 0) 100%)',
        heading: 'MIM-USDC',
        chainId: '250',
        priceCurrency: 'MIM/USDC Synthetic LP',
        description:
            'Generates yield by running an autocompound MIM/USDC strategy on spookyswap.finance',
        disabled: false,
        openModal,
        ...state,
    } as const;

    const Service = useMemo(() => new ChainService('FTM'), []);

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                setState({ available: null, totalAvailable: null });
                const {
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    apr,
                    price,
                } = await Service.getCardData(account ? farms[chainId]?.FTM : '9');
                const percentage = Math.ceil((available / currentDeposits) * 100);
                dispatch(setPayData({
                    key: '250',
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
                    totalDeposits: `${totalDeposits} MIM/USDC LP`,
                    currentDeposits: `$${currentDeposits.toFixed(3)}`,
                    available: `${state.localChain === chainId ? 'Infinity' : Number(available.toFixed(5))}`,
                    totalAvailable: state.localChain === chainId ? '' : `$${totalAvailable.toFixed(5)}`,
                    price: `${Number(price.toFixed(6))}`,
                    rowGradient: `linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`,
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
                    account ? farms[chainId]?.FTM : '67',
                );
                const yieldTime = await getProfit(account, 8);
                setPositionSum({ n: positions, key: '250' });
                setState({
                    positions: `$${Number(positions.toFixed(2))}`,
                    totalPositions: `${Number(
                        totalPositions.toFixed(5),
                    )} MIM/USDC Synthetic LP`,
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

export default FantomContainer;
