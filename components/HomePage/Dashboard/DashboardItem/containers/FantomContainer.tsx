import React, {
    useContext,
    useEffect,
    useReducer,
    useState,
    useMemo,
} from 'react';

import { ProviderContext } from '../../../../../context/ProviderContext';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';

import ChainService from '../../../../../src/ChainService/ChainService';

const FantomContainer = () => {
    const {
        account,
        provider,
        changeLoadingTx,
        txLoading,
        setSucInfo,
        setPositionSum,
    } = useContext(ProviderContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

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
        },
    );

    const FtmService = useMemo(() => new ChainService('AVAX'), []);

    useEffect(() => {
        (async () => {
            const {
                apr,
                totalAvailable,
                totalDeposits,
                currentDeposits,
                available,
                price,
            } = await FtmService.getCardData();

            setState({
                apr,
                totalDeposits,
                currentDeposits,
                available,
                totalAvailable,
                price,
                rowGradient:
                    'linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) 100%)',
            });
        })();
    }, [txLoading]);

    useEffect(() => {
        (async () => {
            if (account) {
                // eslint-disable-next-line operator-linebreak
                const { positions, totalPositions } =
                    await FtmService.getPersonalData(account);
                setPositionSum(positions, 'fantom');
                setState({
                    ...state,
                    positions: `$${Number(positions.toFixed(2))}`,
                    totalPositions,
                });
            }
        })();
    }, [account, txLoading]);

    const buyToken = async (value: number) => {
        const data = await FtmService.buyToken(value);

        if (data) {
            changeLoadingTx(true);
        }
        const res = await data.wait();

        if (res?.status) {
            changeLoadingTx(false);
            setSucInfo({
                value,
                symbol: 'MIM/USDC LP',
                isReceived: true,
            });
        }
    };

    const sellToken = async (value: number) => {
        const data = await FtmService.sellToken(value);
        if (data) {
            changeLoadingTx(true);
        }
        const res = await data.wait();
        if (res?.status) {
            changeLoadingTx(false);
            setSucInfo({
                value,
                symbol: 'MIM/USDC LP',
                isReceived: false,
            });
        }
    };

    const data = {
        icon: 'fantomDashboard.png',
        bgGradient:
            ' linear-gradient(90deg, rgba(15, 89, 142, 0.2) 0%, rgba(15, 89, 142, 0) 100%)',
        heading: 'MIM-USDC',
        chainId: '250',
        priceCurrency: 'USDT/USDT.e Synthetic LP',
        description:
            'Generates yield by running an autocompound MIM/USDC strategy on spookyswap.finance',
        disabled: false,
        openModal,
        ...state,
    } as const;

    return (
        <>
            {isOpenModal && (
                <Modal handleClose={closeModal}>
                    <PayModal
                        buyToken={buyToken}
                        sellToken={sellToken}
                        available={state.available}
                        totalAvailable={state.totalAvailable}
                        price={state.price}
                        handleClose={closeModal}
                    />
                </Modal>
            )}
            <DashboardItem {...data} />
        </>
    );
};

export default FantomContainer;
