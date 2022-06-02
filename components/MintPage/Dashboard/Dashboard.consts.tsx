import AvalanceContainer from './DashboardContainer/AvalanceContainer';
import FantomContainer from './DashboardContainer/FantomContainer';
import ETHContainer from './DashboardContainer/ETHContainer';
import SolanaContainer from './DashboardContainer/SolanaContainer';

const ITEMS = [
    {
        filter: 43114,
        query: ['usdc-usdc.e', 'avalanche', 'avax', 'ava', 'joe'],
        element: (isFiltered: boolean, key: number) => (
            <AvalanceContainer isFiltered={isFiltered} key={key} />
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
        filter: 2,
        query: ['ust-usdc', 'sunny'],
        element: (isFiltered: boolean, key: number) => (
            <SolanaContainer isFiltered={isFiltered} key={key} />
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
        filter: 250,
        query: ['mim-usdc', 'fantom', 'ftm', 'spirit'],
        element: (isFiltered: boolean, key: number) => (
            <FantomContainer isFiltered={isFiltered} key={key} />
        ),
    },
];

export default ITEMS;
