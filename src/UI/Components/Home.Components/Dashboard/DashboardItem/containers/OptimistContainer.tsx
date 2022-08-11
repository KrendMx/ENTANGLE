import React, { useReducer } from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const OptimistContainer = ({ isFiltered = false }) => {
    const [state, setState] = useReducer(
        (
            containerState: ContainerStateType,
            stateUpdate: Partial<ContainerStateType>,
        ) => ({ ...containerState, ...stateUpdate }),
        {
            apr: '60.39',
            currentDeposits: '0',
            totalDeposits: 'UST LP',
            available: '0',
            totalAvailable: '$0',
            price: '0',
            positions: '$0',
            totalPositions: 'UST Synthetic LP',
            rowGradient:
                'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
            yieldTime: '$0',
            localChain: '250',
            localName: 'FTM',
        },
    );

    const data = {
        icon: 'optimismDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        heading: 'vAMM-OP/USDC',
        chainId: '43114',
        priceCurrency: 'vAMM-OP/USDC Synthetic LP',
        vendor: 'quickswap.exchange',
        disabled: true,
        ...state,
    } as const;

    return <DashboardItem {...data} isFiltered={isFiltered} disabled rty={0} />;
};

export default OptimistContainer;
