import React, { useReducer } from 'react';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const ETHContainer = ({ isFiltered = false }) => {
    const [state, setState] = useReducer(
        (
            containerState: ContainerStateType,
            stateUpdate: Partial<ContainerStateType>,
        ) => ({ ...containerState, ...stateUpdate }),
        {
            apr: 'TBA',
            currentDeposits: '$0',
            totalDeposits: '0 aDAI/aSUSD LP',
            available: '0',
            totalAvailable: '$0',
            price: '0',
            positions: '$0',
            totalPositions: 'aDAI/aSUSD Synthetic LP',
            rowGradient: '',
            yieldTime: '$0',
            localChain: '1',
            localName: 'ETH',
        },
    );

    const data = {
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'aDAI-aSUSD',
        chainId: '43114',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        description:
            'Generates yield by running autocompounded aDAI/aSUSD strategy on convexfinance.com',
        disabled: false,
        ...state,
    } as const;

    return <DashboardItem {...data} isFiltered={isFiltered} />;
};

export default ETHContainer;
