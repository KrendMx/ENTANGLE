import React, { useEffect, useReducer } from 'react';
import { useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { addSortingCard } from '@/src/Redux/store/reducers/AppSlice';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const SolanaContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();
    const [state, setState] = useReducer(
        (
            containerState: ContainerStateType,
            stateUpdate: Partial<ContainerStateType>,
        ) => ({ ...containerState, ...stateUpdate }),
        {
            apr: '11.95%',
            currentDeposits: '0',
            totalDeposits: 'USDT/USDC LP',
            available: '0',
            totalAvailable: '$0',
            price: '0',
            positions: '$0',
            totalPositions: 'USDT/USDT Synthetic LP',
            rowGradient:
                'linear-gradient(90deg, #9A45FF 0%, rgba(25, 252, 156, 0) 96.87%)',
            yieldTime: '$0',
            localChain: '250',
            localName: 'FTM',
        },
    );

    const data = {
        icon: 'solanaDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(154, 69, 255, 0.2) 0%, rgba(25, 252, 156, 0) 96.87%)',
        heading: 'UST-USDC',
        chainId: '43114',
        priceCurrency: 'USDT/USDT Synthetic LP',
        description:
            'Generates yield by running an  autocompound  UST/USDC strategy on sunny.ag',
        disabled: true,
        ...state,
    } as const;

    useEffect(() => {
        (async () => {
            dispatch(addSortingCard({ chainId: data.chainId, APR: 11.95, staked: 1 }));
        })();
    }, []);

    return <DashboardItem {...data} isFiltered={isFiltered} />;
};

export default SolanaContainer;
