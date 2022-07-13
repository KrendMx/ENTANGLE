import { AvaxEntgContainer } from './DashboardContainers/AvaxEntgContainer';
import { FtmEntglContainer } from './DashboardContainers/FtmEntglContainer';

export const Containers = [
    {
        term: 10,
        name: ['fantom', 'ftm', 'entangle', 'entgl'],
        component: <FtmEntglContainer term={10} />,
    },
    {
        term: 30,
        name: ['fantom', 'ftm', 'entangle', 'entgl'],
        component: <FtmEntglContainer term={30} />,
    },
    {
        term: 90,
        name: ['fantom', 'ftm', 'entangle', 'entgl'],
        component: <FtmEntglContainer term={90} />,
    },
    {
        term: 30,
        name: ['avalanche', 'avax', 'entangle', 'entgl'],
        component: <AvaxEntgContainer term={30} />,
    },
    {
        term: 90,
        name: ['avalanche', 'avax', 'entangle', 'entgl'],
        component: <AvaxEntgContainer term={90} />,
    },
];
