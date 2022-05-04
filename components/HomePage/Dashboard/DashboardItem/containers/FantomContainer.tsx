import React, {
    useContext, useEffect, useMemo, useReducer, useState,
} from 'react';
import { ProviderContext } from '../../../../../context/ProviderContext';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import { farms } from '../../../../../src/utils/GlobalConst';
import Modal from '../../../../Modal';
import PayModal from '../../../PayModal';
import ChainService from '../../../../../src/ChainService/ChainService';

const FantomContainer = ({ isFiltered = false }) => {
    const {
        account, txLoading, setPositionSum, setDeposit, setPayData, payData, chainId,
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
            yieldTime: null,
        },
    );
    const data = {
        icon: 'fantomDashboard.svg',
        bgGradient:
            ' linear-gradient(90deg, rgba(15, 89, 142, 0.4) 0%, rgba(15, 89, 142, 0) 100%)',
        heading: 'MIM-USDC',
        chainId: '250',
        priceCurrency: 'USDT/USDT.e Synthetic LP',
        description:
            'Generates yield by running an autocompound MIM/USDC strategy on spookyswap.finance',
        disabled: false,
        openModal,
        ...state,
    } as const;

    const Service = useMemo(() => new ChainService('FTM'), []);

    useEffect(() => {
        (async () => {
            await Service.getCardData(account ? farms[chainId].FTM : '68');
            // const {
            //     available, totalAvailable, totalDeposits, currentDeposits, apr, price,
            // } = await Service.getCardData();
            // const percentage = Math.ceil((available / currentDeposits) * 100);
            // const oldData = payData;
            // oldData[250].available = `${Number(available.toFixed(5))}`;
            // oldData[250].price = `${Number(price.toFixed(6))}`;
            // oldData[250].totalAvailable = `$${totalAvailable}`;
            // setPayData(oldData);
            // setState({
            //     apr: `${apr}%`,
            //     totalDeposits: `${totalDeposits} MIM/USDC LP`,
            //     currentDeposits: `$${currentDeposits.toFixed(3)}`,
            //     available: `${Number(available.toFixed(5))}`,
            //     totalAvailable: `$${totalAvailable}`,
            //     price: `${Number(price.toFixed(6))}`,
            //     rowGradient: `linear-gradient(90deg, #0F598E 0%, rgba(15, 89, 142, 0) ${percentage}%)`,
            // });
        })();
    }, [txLoading, account]);

    // useEffect(() => {
    //     (async () => {
    //         if (account) {
    //             const { positions, totalPositions } = await Service.getPersonalData(account);
    //             const yieldTime = await getProfit(account, 8);
    //             setPositionSum(positions, 'fantom');
    //             setState({
    //                 positions: `$${Number(positions.toFixed(2))}`,
    //                 totalPositions: `${Number(totalPositions.toFixed(5))} MIM/USDC Synthetic LP`,
    //                 yieldTime: `$${Number(yieldTime.stable || 0).toFixed(4)}`,
    //             });
    //         }
    //     })();
    // }, [account, txLoading]);

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
