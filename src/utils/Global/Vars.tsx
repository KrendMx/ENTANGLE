import type { availableChains, networksType } from './Types';

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
        cardTypeLabelBg: '#37050E',
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
            '#3F2A00',
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
        icon: 'etheriumDashboard.svg',
        mmCurrency: 'ETH',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM-UST',
        description:
            'Generates yield by running autocompounded aDAI/aSUSD strategy on convexfinance.com',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.15) 0%, rgba(246, 246, 246, 0) 100%)',
        cardTypeLabelColor: '#000',
        cardTypeLabelBg: '#fcfcfc',
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
        cardTypeLabelBg: '#001025',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.ankr.com/fantom',
        synth: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
        mainColor: 'rgba(15, 89, 142, 0.2)',
        order: 4,
        farm: 67,
        mainIcon: '/images/networks/fantomDashboard.svg',
    },
    '100': {
        title: 'Elrond',
        abbr: 'ELRD',
        icon: 'elrond.svg',
        description: '',
        bgGradient:
            'linear-gradient(90deg, rgba(252,252,252,0.5) 0%, rgba(246, 246, 246, 0) 96.87%)',
        cardTypeLabelColor: '#fcfcfc',
        cardTypeLabelBg: '#dcdcdc81',
        mainColor: 'rgba(252,252,252,0.5)',
        mainIcon: '/images/networks/elrondDashboard.svg',
        mmCurrency: 'EGLD',
        currency: 'EGLD/USDC Synthetic LP',
        currencyMin: 'EGLD/USDC',
        dex: '',
        fiat: '',
        rpc: '',
        synth: '',
        order: 55,
        farm: 555,
    },
    '10': {
        title: 'Optimism',
        abbr: 'OPT',
        icon: 'optimismDashboard.svg',
        description: '',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        cardTypeLabelBg: 'rgba(155, 155, 155, 0.8)',
        cardTypeLabelColor: 'rgba(55, 55, 55, 0.8)',
        mainColor: 'rgba(255, 255, 255, 0.2)',
        mainIcon: '/images/networks/optimismDashboard.svg',
        mmCurrency: 'sUSD/USDC',
        currency: 'sUSD/USDC Synthetic LP',
        currencyMin: 'sUSD/USDC',
        rpc: 'https://mainnet.optimism.io',
        // TODO ???? ????????????
        dex: '',
        fiat: '',
        synth: '',
        order: 0,
        farm: 0,
    },
    '42161': {
        title: 'Arbitrum',
        abbr: 'ARB',
        icon: 'arbitrumDashboard.svg',
        description: '',
        bgGradient:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        cardTypeLabelBg: 'rgba(155, 155, 155, 0.8)',
        cardTypeLabelColor: 'rgba(55, 55, 55, 0.8)',
        mainColor: 'rgba(255, 255, 255, 0.2)',
        mmCurrency: 'ARB/USDC',
        currency: 'ARB/USDC Synthetic LP',
        currencyMin: 'ARB/USDC',
        mainIcon: '/images/networks/arbitrumDashboard.svg',
        // TODO ???? ????????????
        dex: '',
        fiat: '',
        rpc: 'https://arb1.arbitrum.io/rpc',
        synth: '',
        order: 0,
        farm: 0,
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

const availableChainsArray: availableChains[] = [
    '43114',
    '250',
    '56',
    '10',
    '42161',
];

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
    EGLD: { '56': 0, '43114': 0, '250': 0 },
    OPT: { '56': 0, '43114': 0, '250': 0 },
    ARB: { '56': 0, '43114': 0, '250': 0 },
};

const farms = {
    '250': {
        FTM: '9',
        AVAX: '8',
        BSC: '11',
        ETH: '12',
        ELRD: '77',
        OPT: '',
        ARB: '',
    },
    '43114': {
        FTM: '67',
        AVAX: '68',
        BSC: '70',
        ETH: '71',
        ELRD: '13',
        OPT: '',
        ARB: '',
    },
    '56': {
        FTM: '69',
        AVAX: '10',
        BSC: '7',
        ETH: '20',
        ELRD: '27',
        OPT: '',
        ARB: '',
    },
    '10': {
        FTM: '',
        AVAX: '',
        BSC: '',
        ETH: '',
        ELRD: '',
        OPT: '',
        ARB: '',
    },
    '42161': {
        FTM: '',
        AVAX: '',
        BSC: '',
        ETH: '',
        ELRD: '',
        OPT: '',
        ARB: '',
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
    ELRD: '100',
    OPT: '10',
    ARB: '42161',
};

const chainToNameConfig = {
    '56': 'BSC',
    '43114': 'AVAX',
    '250': 'FTM',
    '1': 'ETH',
    '100': 'ELRD',
    '42161': 'ARB',
    '10': 'OPT',
};

const synths = {
    '250': {
        BSC: '0x4e726245a362c1FE0947151199Bb225c0131C362',
        AVAX: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
        FTM: '0x19ffF7129dC1121d013908aECd14A70aa58bD0Ea',
        OPT: '',
        ARB: '',
    },
    '43114': {
        BSC: '0x50780f5825ACf7A85d38368c2dFABE39d512cC26',
        AVAX: '0x998e0ffb556A114a8c22C3378775A4066b7432A7',
        FTM: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
        OPT: '',
        ARB: '',
    },
    '56': {
        BSC: '0xBD289C7596e4130B367dE865e3d87E239eCB2438',
        AVAX: '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
        FTM: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
        OPT: '',
        ARB: '',
    },
    '1': {
        BSC: '0x6fDa2e4C4187017D92a11D02b455C51E8CFF7FEA',
        AVAX: '0xf066F23C55D7aF2259Da196862B3c23702B9320b',
        FTM: '0xAe8aF48Ea0E9dc54Cc3328a872a323F039920ceb',
        OPT: '',
        ARB: '',
    },
    '100': {
        BSC: '0xD1aF5dFa8fe427542D7690856b6B7AD0bB1Bbb7f',
        AVAX: '0x39f0EFb3Ce44fd54c0B6faAAD3371eb6D34DBF7F',
        FTM: '0xCF81f0F04F191BD644e9CA62CD6992657574A408',
        OPT: '',
        ARB: '',
    },
    '42161': {
        BSC: '',
        AVAX: '',
        FTM: '',
        OPT: '',
        ARB: '',
    },
    '10': {
        BSC: '',
        AVAX: '',
        FTM: '',
        OPT: '',
        ARB: '',
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
    availableChainsArray,
};
