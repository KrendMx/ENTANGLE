import React from 'react';
import styles from './style.module.css';
import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';
import SolanaContainer from './DashboardItem/containers/SolanaContainer';
import USDContainer from './DashboardItem/containers/USDContainer';
import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';

const items = [
    {
        filter: 250,
        query: ['mim-usdc', 'fantom'],
        element: (isFiltered: boolean) => <FantomContainer isFiltered={isFiltered} />,
    },
    {
        filter: 43114,
        query: ['usdt-usdt.e', 'avalanche'],
        element: (isFiltered: boolean) => <AvalancheContainer isFiltered={isFiltered} />,
    },
    {
        filter: 1,
        query: ['mim-ust'],
        element: (isFiltered: boolean) => <ETHContainer isFiltered={isFiltered} />,
    },
    {
        filter: 56,
        query: ['ust-busd'],
        element: (isFiltered: boolean) => <BUSDContainer isFiltered={isFiltered} />,
    },
    {
        filter: null,
        query: ['ust-usdc'],
        element: (isFiltered: boolean) => <SolanaContainer isFiltered={isFiltered} />,
    },
    {
        filter: null,
        query: ['ust'],
        element: (isFiltered: boolean) => <USDContainer isFiltered={isFiltered} />,
    },
];

const Dashboard = ({ filter: filterProp = '', query: queryProp = '' }) => (
    <div className={styles.wrapper}>
        {items.map((i) => {
            let isFiltered = false;
            if (filterProp !== '') {
                isFiltered = String(i.filter) === String(filterProp);
            }
            if (queryProp !== '') {
                isFiltered = isFiltered || !i.query.join('/').toLowerCase().includes(queryProp.toLowerCase().trim());
            }
            return i.element(isFiltered);
        })}
    </div>
);

export default Dashboard;
