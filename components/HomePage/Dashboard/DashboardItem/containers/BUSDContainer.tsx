import React, { useEffect, useMemo, useReducer } from 'react';
import { Contract, providers, BigNumber } from 'ethers';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const BUSDContainer = () => {
    const [state, setState] = useReducer(
        (
            containerState: ContainerStateType,
            stateUpdate: Partial<ContainerStateType>,
        ) => ({ ...containerState, ...stateUpdate }),
        {
            apr: '6.78%',
            currentDeposits: '0',
            totalDeposits: 'UST/BUSD LP',
            available: '0',
            totalAvailable: '$0',
            price: '0',
            positions: '$0',
            totalPositions: 'UST/BUSD Synthetic LP',
            rowGradient:
                'linear-gradient(90deg, rgba(255, 149, 1, 1) 0%, rgba(255, 153, 1, 0) 96.87%)',
        },
    );

    const data = {
        icon: 'pancakeDashboard.png',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 199, 0, 0.2) 0%, rgba(255, 150, 1, 0) 96.87%)',
        heading: 'UST-BUSD',
        chainId: '43114',
        priceCurrency: 'UST/BUSD Synthetic LP',
        description:
            'Generates yield by running an autocompound UST/BUSD strategy on pancakeswap.finance',
        disabled: true,
        ...state,
    } as const;

    return <DashboardItem {...data} />;
};

export default BUSDContainer;
