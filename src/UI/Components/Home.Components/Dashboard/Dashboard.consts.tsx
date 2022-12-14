import OptimistContainer from 'UI/Components/Home.Components/Dashboard/DashboardItem/containers/OptimistContainer';
import ArbitrumContainer from 'UI/Components/Home.Components/Dashboard/DashboardItem/containers/ArbitrumContainer';
import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';

import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';
import ElrondContainer from './DashboardItem/containers/ElrondContainer';

const ITEMS = [
    {
        filter: 43114,
        query: ['usdc-usdc.e', 'avalanche', 'avax', 'ava', 'joe'],
        element: (isFiltered: boolean, key: number) => (
            <AvalancheContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 250,
        query: ['mim-usdc', 'fantom', 'ftm', 'spirit'],
        element: (isFiltered: boolean, key: number) => (
            <FantomContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 1,
        query: ['mim-ust', 'etherem', 'ether', 'convexfinance'],
        element: (isFiltered: boolean, key: number) => (
            <ETHContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 56,
        query: ['usdt-busd', 'bnb', 'binance', 'bsc', 'busd', 'pancakeswap'],
        element: (isFiltered: boolean, key: number) => (
            <BUSDContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 100,
        query: ['elrond', 'egld', 'egld-usdt'],
        element: (isFiltered: boolean, key: number) => (
            <ElrondContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 400,
        query: ['optimism', 'opt'],
        element: (isFiltered: boolean, key: number) => (
            <OptimistContainer isFiltered={isFiltered} key={key} />
        ),
    },
    {
        filter: 500,
        query: ['arbitrum', 'opt'],
        element: (isFiltered: boolean, key: number) => (
            <ArbitrumContainer isFiltered={isFiltered} key={key} />
        ),
    },
];

export default ITEMS;
