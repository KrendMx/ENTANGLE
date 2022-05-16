import React from 'react';
import styles from './style.module.css';
import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';
import USDContainer from './DashboardItem/containers/USDContainer';
import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';
import SolanaContainer from './DashboardItem/containers/SolanaContainer';

interface IDashboardProps {
    filter: string;
    query: string;
}

const items = [
    {
        filter: [43114, 250, 56, 1],
        query: ['usdc-usdc.e', 'avalanche', 'avax', 'ava', 'joe'],
        element: (isFiltered: boolean, key: number) => <AvalancheContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: [43114, 250, 56, 1],
        query: ['mim-usdc', 'fantom', 'ftm', 'spirit'],
        element: (isFiltered: boolean, key: number) => <FantomContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: [43114, 250, 56, 1],
        query: ['mim-ust', 'etherem', 'ether', 'convexfinance'],
        element: (isFiltered: boolean, key: number) => <ETHContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: [43114, 250, 56, 1],
        query: ['ust-busd', 'bnb', 'binance', 'bsc', 'busd', 'pancakeswap'],
        element: (isFiltered: boolean, key: number) => <BUSDContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: [],
        query: ['ust-usdc', 'sunny'],
        element: (isFiltered: boolean, key: number) => <SolanaContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: [],
        query: ['ust', 'anchor'],
        element: (isFiltered: boolean, key: number) => <USDContainer isFiltered={isFiltered} key={key} />,
    },
];

const Dashboard: React.FC<IDashboardProps> = ({ filter = '', query = '' }) => (
    <div className={styles.wrapper}>
        {items.map((i, key) => {
            let isFiltered = false;
            if (filter !== '') {
                isFiltered = !i.filter.includes(Number(filter));
            }
            if (query !== '') {
                isFiltered = isFiltered || !i.query.join('/').toLowerCase().includes(query.toLowerCase().trim());
            }
            return i.element(isFiltered, key);
        })}
    </div>
);

export default Dashboard;
