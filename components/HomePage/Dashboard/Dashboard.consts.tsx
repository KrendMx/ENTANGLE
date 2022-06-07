import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';
import USDContainer from './DashboardItem/containers/USDContainer';
import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';
import SolanaContainer from './DashboardItem/containers/SolanaContainer';

const ITEMS = [
    {
        filter: 43114,
        query: ['usdc-usdc.e', 'avalanche', 'avax', 'ava', 'joe'],
        element: (isFiltered: boolean, key: number) => <AvalancheContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 250,
        query: ['mim-usdc', 'fantom', 'ftm', 'spirit'],
        element: (isFiltered: boolean, key: number) => <FantomContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 1,
        query: ['mim-ust', 'etherem', 'ether', 'convexfinance'],
        element: (isFiltered: boolean, key: number) => <ETHContainer isFiltered={isFiltered} key={key} />,
    },
    {
        filter: 56,
        query: ['usdt-busd', 'bnb', 'binance', 'bsc', 'busd', 'pancakeswap'],
        element: (isFiltered: boolean, key: number) => <BUSDContainer isFiltered={isFiltered} key={key} />,
    },
    // {
    //     filter: 2,
    //     query: ['ust-usdc', 'sunny'],
    //     element: (isFiltered: boolean, key: number) => <SolanaContainer isFiltered={isFiltered} key={key} />,
    // },
    // {
    //     filter: 3,
    //     query: ['ust', 'anchor'],
    //     element: (isFiltered: boolean, key: number) => <USDContainer isFiltered={isFiltered} key={key} />,
    // },
];

export default ITEMS;
