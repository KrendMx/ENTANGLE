import { avaDex, ftmDex } from './abi/index';

type availableChains = '43114' | '250' | '56' | '1';

const networks = {
    '43114': {
        title: 'Avalanche',
        abbr: 'AVAX',
        icon: 'avalanche.svg',
        currency: 'USDC/USDC.e Synthetic LP',
        currencyMin: 'USDC/USDC.e',
        dex: '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
        fiat: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
        synth: '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
        dexAbi: avaDex,
        mainColor: '#0f598e',
        order: 0,
        farm: 8,
        mainIcon: '/images/networks/avalancheDashboard.png',
    },
    '56': {
        title: 'Binance',
        abbr: 'BSC',
        icon: 'binance.svg',
        currency: 'USDT/BUSD Synthetic LP',
        currencyMin: 'USDT-BUSD',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8', // ?
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // ?
        rpc: 'https://rpc.ankr.com/bsc',
        synth: '0xBD289C7596e4130B367dE865e3d87E239eCB2438', // ?
        dexAbi: ftmDex, // ?
        mainColor: '#E93038',
        order: 1,
        farm: 7,
        mainIcon: '/images/networks/fantomDashboard.png',
    },
    '1': {
        title: 'Ethereum',
        abbr: 'ETH',
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
        abbr: 'FTM',
        icon: 'fantom.svg',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM/USDC',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.fantom.network',
        synth: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
        dexAbi: ftmDex,
        mainColor: '#E93038',
        order: 4,
        farm: 67,
        mainIcon: '/images/networks/fantomDashboard.png',
    },
} as const;

const farms = {
    '250': {
        'FTM': '9',
        'AVAX': '8',
        'BSC': '11',
        'ETH': '',
    },
    '43114': {
        'FTM': '67',
        'AVAX': '68',
        'BSC': '70',
        'ETH': '',
    },
    '56': {
        'FTM': '69',
        'AVAX': '10',
        'BSC': '7',
        'ETH': '',
    },
} as const;

const namesConfig = {
    'BSC': '56',
    'AVAX': '43114',
    'FTM': '250',
};

const chainToNameConfig = {
    '56': 'BSC',
    '43114': 'AVAX',
    '250': 'FTM',
};

const synths = {
    '250': {
        'BSC': '0x4e726245a362c1FE0947151199Bb225c0131C362',
        'AVAX': '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
        'FTM': '0x19ffF7129dC1121d013908aECd14A70aa58bD0Ea',
    },
    '43114': {
        'BSC': '0x50780f5825ACf7A85d38368c2dFABE39d512cC26',
        'AVAX': '0x998e0ffb556A114a8c22C3378775A4066b7432A7',
        'FTM': '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
    },
    '56': {
        'BSC': '0xBD289C7596e4130B367dE865e3d87E239eCB2438',
        'AVAX': '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
        'FTM': '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
    },
};

export {
    synths, chainToNameConfig, namesConfig, farms, networks,
};

export type { availableChains };
