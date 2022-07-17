import type { networksType } from './Types';

const networks: networksType = {
    '43114': {
        title: 'Avalanche',
        abbr: 'AVAX',
        icon: 'avalanche.svg',
        mmCurrency: 'AVAX',
        currency: 'USDC/USDC.e Synthetic LP',
        currencyMin: 'USDC/USDC.e',
        description:
            'Generates yield by running autocompounded USDC/USDC.e strategy on traderjoexyz.com',
        bgGradient:
            'linear-gradient(90deg, rgba(241, 78, 86, 0.10) 0%, rgba(241, 78, 86, 0.04) 100%)',
        cardTypeLabelColor: '#E7252E',
        cardTypeLabelBg:
            'linear-gradient(180deg, #F14E5640 -23.33%, #E7252E40 118.33%)',
        dex: '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
        fiat: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        rpc: 'https://rpc.ankr.com/avalanche',
        synth: '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
        mainColor: 'rgba(233, 48, 56, 0.2)',
        order: 0,
        farm: 8,
        mainIcon: '/images/networks/avalancheDashboard.png',
    },
    '56': {
        title: 'Binance',
        abbr: 'BSC',
        icon: 'binance.svg',
        mmCurrency: 'BNB',
        currency: 'USDT/BUSD Synthetic LP',
        currencyMin: 'USDT-BUSD',
        description:
            'Generates yield by running an autocompound USDT/BUSD strategy on pancakeswap.finance',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 199, 0, 0.10) 0%, rgba(255, 199, 0, 0.04) 100%)',
        cardTypeLabelColor: '#FF8A00',
        cardTypeLabelBg:
            'linear-gradient(180deg, #FFC70045 -23.33%, #FF8A0045 118.33%)',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.ankr.com/bsc',
        synth: '0xBD289C7596e4130B367dE865e3d87E239eCB2438',
        mainColor: 'rgba(255, 199, 0, 0.2)',
        order: 1,
        farm: 7,
        mainIcon: '/images/networks/pancakeDashboard.png',
    },
    '1': {
        title: 'Ethereum',
        abbr: 'ETH',
        icon: 'ethereum.svg',
        mmCurrency: 'ETH',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM-UST',
        description:
            'Generates yield by running autocompounded aDAI/aSUSD strategy on convexfinance.com',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.ankr.com/eth',
        synth: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
        mainColor: '#121212;',
        order: 3,
        farm: 0,
        mainIcon: '/images/networks/etheriumDashboard.svg',
    },
    '250': {
        title: 'Fantom',
        abbr: 'FTM',
        icon: 'fantom.svg',
        mmCurrency: 'FTM',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM/USDC',
        description:
            'Generates yield by running an autocompound MIM/USDC strategy on spiritswap.finance',
        bgGradient:
            'linear-gradient(90deg, rgba(0, 148, 255, 0.10) 0%, rgba(0, 148, 255, 0.04) 100%)',
        cardTypeLabelColor: '#00AFFF',
        cardTypeLabelBg: '#0094FF40',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.ankr.com/fantom',
        synth: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
        mainColor: 'rgba(15, 89, 142, 0.2)',
        order: 4,
        farm: 67,
        mainIcon: '/images/networks/fantomDashboard.svg',
    },
} as const;

const availableSingleSideNetworks = {
    '24886': {
        title: 'Entangle',
        abbr: 'ENTGL',
        mainColor: 'rgba(60,27,124,0.5)',
        mainIcon: '/images/networks/entangleDashboard.svg',
    },
    ...networks,
};

const WalletProviderNames = {
    MetaMask: 'MetaMask',
    Coin98: 'Coin98',
    CoinBase: 'CoinBase',
    WalletConnect: 'WalletConnect',
} as const;

const init = {
    FTM: { '56': 0, '43114': 0, '250': 0 },
    AVAX: { '56': 0, '43114': 0, '250': 0 },
    BSC: { '56': 0, '43114': 0, '250': 0 },
    ETH: { '56': 0, '43114': 0, '250': 0 },
};

const farms = {
    '250': {
        FTM: '9',
        AVAX: '8',
        BSC: '11',
        ETH: '12',
    },
    '43114': {
        FTM: '67',
        AVAX: '68',
        BSC: '70',
        ETH: '71',
    },
    '56': {
        FTM: '69',
        AVAX: '10',
        BSC: '7',
        ETH: '20',
    },
} as const;

const STABLES = {
    USDC: {
        full: 'USDC Coin',
        img: 'usdc.svg',
        dec: {
            '43114': 6,
            '250': 6,
            '56': 18,
        },
        address: {
            '43114': '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
            '250': '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
            '56': '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
    },
};

const namesConfig = {
    BSC: '56',
    AVAX: '43114',
    FTM: '250',
    ETH: '1',
};

const chainToNameConfig = {
    '56': 'BSC',
    '43114': 'AVAX',
    '250': 'FTM',
    '1': 'ETH',
};

const synths = {
    '250': {
        BSC: '0x4e726245a362c1FE0947151199Bb225c0131C362',
        AVAX: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
        FTM: '0x19ffF7129dC1121d013908aECd14A70aa58bD0Ea',
    },
    '43114': {
        BSC: '0x50780f5825ACf7A85d38368c2dFABE39d512cC26',
        AVAX: '0x998e0ffb556A114a8c22C3378775A4066b7432A7',
        FTM: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
    },
    '56': {
        BSC: '0xBD289C7596e4130B367dE865e3d87E239eCB2438',
        AVAX: '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
        FTM: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
    },
    '1': {
        BSC: '',
        AVAX: '',
        FTM: '',
    },
};

export {
    synths,
    chainToNameConfig,
    namesConfig,
    farms,
    networks,
    STABLES,
    WalletProviderNames,
    init,
    availableSingleSideNetworks,
};
