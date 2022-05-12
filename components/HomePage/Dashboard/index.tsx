import React from 'react';
import styles from './style.module.css';
import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';
import USDContainer from './DashboardItem/containers/USDContainer';
import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';

const items = [
    {
        filter: 250,
        query: ['mim-usdc', 'fantom'],
        element: (isFiltered: boolean, key: number) => <FantomContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 43114,
        query: ['usdt-usdt.e', 'avalanche'],
        element: (isFiltered: boolean, key: number) => <AvalancheContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 1,
        query: ['mim-ust'],
        element: (isFiltered: boolean, key: number) => <ETHContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 56,
        query: ['ust-busd'],
        element: (isFiltered: boolean, key: number) => <BUSDContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: null,
        query: ['ust'],
        element: (isFiltered: boolean, key: number) => <USDContainer isFiltered={isFiltered} key={key} />,
    },
];

const Dashboard = ({ filter: filterProp = '', query: queryProp = '' }) => (
    <div className={styles.wrapper}>
        {items.map((i, key) => {
            let isFiltered = false;
            if (filterProp !== '') {
                isFiltered = String(i.filter) === String(filterProp);
            }
            if (queryProp !== '') {
                isFiltered = isFiltered || !i.query.join('/').toLowerCase().includes(queryProp.toLowerCase().trim());
            }
            return i.element(isFiltered, key);
        })}
    </div>
);

export default Dashboard;
