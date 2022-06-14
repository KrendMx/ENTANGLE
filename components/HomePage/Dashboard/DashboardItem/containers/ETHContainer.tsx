import React, { useEffect, useReducer } from 'react';
import { addSortingCard } from '@/src/Redux/store/reducers/AppSlice';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';
import { useAppDispatch } from '@/src/Redux/store/hooks/redux';

const ETHContainer = ({ isFiltered = false }) => {
    const dispatch = useAppDispatch();

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
            yieldTime: '0',
            localChain: '1',
            localName: 'ETH',
        },
    );

    const data = {
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'aDAI-aSUSD',
        chainId: '1',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        description:
            'Generates yield by running autocompounded aDAI/aSUSD strategy on convexfinance.com',
        disabled: false,
        ...state,
    } as const;

    useEffect(() => {
        (async () => {
            // const cardData = await Service.getCardData(
            //     account ? farms[chainId]?.BSC : '7',
            // );
            // const apr = cardData.apr;
            // const available = cardData.available;

            dispatch(addSortingCard({ chainId: data.chainId, APR: 0, staked: 0 }));
        })();
    }, []);

    return <DashboardItem {...data} isFiltered={isFiltered} />;
};

export default ETHContainer;
// function dispatch(arg0: any) {
//     throw new Error('Function not implemented.');
// }
