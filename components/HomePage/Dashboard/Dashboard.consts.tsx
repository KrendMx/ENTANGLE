import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';

import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';
import SolanaContainer from './DashboardItem/containers/SolanaContainer';

const ITEMS = [
    {
        filter: 43114,
        APR: 9,
        Deposite: 2,
        query: ['usdc-usdc.e', 'avalanche', 'avax', 'ava', 'joe'],
        element: (isFiltered: boolean, key: number) => <AvalancheContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 250,
        APR: 6,
        Deposite: 1,
        query: ['mim-usdc', 'fantom', 'ftm', 'spirit'],
        element: (isFiltered: boolean, key: number) => <FantomContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 1,
        APR: 0,
        Deposite: 3,
        query: ['mim-ust', 'etherem', 'ether', 'convexfinance'],
        element: (isFiltered: boolean, key: number) => <ETHContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 56,
        APR: 3,
        Deposite: 4,
        query: ['usdt-busd', 'bnb', 'binance', 'bsc', 'busd', 'pancakeswap'],
        element: (isFiltered: boolean, key: number) => <BUSDContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 2,
        APR: 12,
        Deposite: 5,
        query: ['ust-usdc', 'sunny'],
        element: (isFiltered: boolean, key: number) => <SolanaContainer isFiltered={isFiltered} key={key} />,
    },
];

export default ITEMS;
