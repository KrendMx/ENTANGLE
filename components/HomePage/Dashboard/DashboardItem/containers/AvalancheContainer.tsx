import React, {
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import ChainService from '../../../../../src/ChainService/ChainService';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import { ProviderContext } from '../../../../../context/ProviderContext';
import { farms } from '../../../../../src/utils/GlobalConst';
import APIService from '../../../../../api/index';

const AvalancheContainer = ({ isFiltered = false }) => {
    const {
        account,
        txLoading,
        setPositionSum,
        setDeposit,
        setPayData,
        payData,
        chainId,
        preLoader,
    } = useContext(ProviderContext);
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
        },
    );
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    const data = {
        icon: 'avalancheDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(233, 48, 56, 0.4) 0%, rgba(239, 70, 78, 0) 100%)',
        heading: 'USDT-USDT.e',
        chainId: '43114',
        priceCurrency: 'USDT/USDT.e Synthetic LP',
        description:
            'Generates yield by running autocompounded USDT/USDT.e strategy on traderjoexyz.com',
        disabled: false,
        openModal,
        ...state,
    } as const;

    const Service = useMemo(() => new ChainService('AVAX'), []);

    useEffect(() => {
        if (!preLoader) {
            (async () => {
                const {
                    apr,
                    available,
                    totalAvailable,
                    totalDeposits,
                    currentDeposits,
                    price,
                } = await Service.getCardData(account ? farms[chainId].AVAX : '68');
                const percentage = Math.ceil((available / currentDeposits) * 100);
                const oldData = payData;
                oldData[43114].available = `${Number(available.toFixed(5))}`;
                oldData[43114].price = `${Number(price.toFixed(6))}`;
                oldData[43114].totalAvailable = `$${totalAvailable}`;
                setPayData(oldData);
                setState({
                    apr: `${apr}%`,
                    totalDeposits: `${totalDeposits} USDT/USDT.e LP`,
                    currentDeposits: `$${currentDeposits.toFixed(3)}`,
                    available: `${Number(available.toFixed(5))}`,
                    totalAvailable: `$${totalAvailable.toFixed(5)}`,
                    price: `${Number(price.toFixed(6))}`,
                    rowGradient: `linear-gradient(90deg, #E93038 0%, rgba(239, 70, 78, 0) ${percentage}%)`,
                });
            })();
        }
    }, [txLoading, chainId, preLoader]);

    console.log(1);

    useEffect(() => {
        (async () => {
            if (account) {
                // @ts-ignore
                const { positions, totalPositions } = await Service.getPersonalData(
                    account,
                    account ? farms[chainId].AVAX : '9',
                );
                const yieldTime = await APIService.getProfit(account, 67);
                setPositionSum(positions, 'fantom');
                setState({
                    positions: `$${Number(positions.toFixed(2))}`,
                    totalPositions: `${Number(
                        totalPositions.toFixed(5),
                    )} USDT/USDT.e Synthetic LP`,
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
