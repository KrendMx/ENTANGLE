import { avaDex, ftmDex } from './abi/index';

export type availableChains = '43114' | '250' | '56' | '1';

export const networks = {
    '43114': {
        title: 'Avalanche',
        icon: 'avalanche.svg',
        currency: 'USDT/USDT.e Synthetic LP',
        currencyMin: 'USDT/USDT.e',
        dex: '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
        fiat: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
        synth: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
        dexAbi: avaDex,
        mainColor: '#0f598e',
        order: 0,
        farm: 8,
        mainIcon: '/images/networks/avalancheDashboard.png',
    },
    '56': {
        title: 'Binance',
        icon: 'binance.svg',
        currency: 'UST/BUSD Synthetic LP',
        currencyMin: 'UST-BUSD',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8', // ?
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // ?
        rpc: 'https://rpc.ankr.com/bsc',
        synth: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71', // ?
        dexAbi: ftmDex, // ?
        mainColor: '#E93038',
        order: 1,
        farm: 7,
        mainIcon: '/images/networks/fantomDashboard.png',
    },
    '1': {
        title: 'Ethereum',
        icon: 'ethereum.svg',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM-UST',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8', // ?
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // ?
        rpc: 'https://rpc.ankr.com/eth',
        synth: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71', // ?
        dexAbi: ftmDex, // ?
        mainColor: '#E93038',
        order: 3,
        farm: 0,
        mainIcon: '/images/networks/fantomDashboard.png',
    },
    '250': {
        title: 'Fantom',
        icon: 'fantom.svg',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM/USDC',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc3.fantom.network',
        synth: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
        dexAbi: ftmDex,
        mainColor: '#E93038',
        order: 4,
        farm: 67,
        mainIcon: '/images/networks/fantomDashboard.png',
    },
} as const;

export const farms = {
    '250': {
        'FTM': '9',
        'AVAX': '8',
        'BSC': '11',
    },
    '43114': {
        'FTM': '67',
        'AVAX': '68',
        'BSC': '70',
    },
    '56': {
        'FTM': '69',
        'AVAX': '10',
        'BSC': '7',
    },
} as const;

export const namesConfig = {
    'BSC': '56',
    'AVAX': '43114',
    'FTM': '250',
};
