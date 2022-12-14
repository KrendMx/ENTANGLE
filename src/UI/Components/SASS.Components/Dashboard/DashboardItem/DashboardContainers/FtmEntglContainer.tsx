import React, { useReducer } from 'react';
import type { IDashboardSASSItems } from '../../Dashboard.interfaces';
import type { SassContainerProps } from '../Dashboard.interfaces';
import { DashboardItem } from '../DashboardItem';

export const FtmEntglContainer: React.FC<SassContainerProps> = ({ term }) => {
    const [store, dispatch] = useReducer(
        (
            oldState: IDashboardSASSItems,
            newState: Partial<IDashboardSASSItems>,
        ) => ({ ...oldState, ...newState }),
        {
            depositeInFirstCurrency: 1238,
            depositeInSecondCurrency: 0,
            term: term as 10 | 30 | 90,
            projectedILProtection: 10,
            APR: 99,
            firstChainId: '250',
            secondChainId: '24886',
            site: 'spookyswap.finance',
        },
    );

    return <DashboardItem {...store} />;
};
