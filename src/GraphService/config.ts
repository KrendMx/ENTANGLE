const GRAPH_CONFIG = {
    FTM: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-fantom-chain',
            fee: '0x46744Ba628C1bac414aF92E06478094a78e53798',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-fantom-chain',
            fee: '0xc1B98EFed2A492Dc7FF79247C0Fc8f202e9a83F4',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-fantom-chain',
            fee: '0x21e06BEb4e1bcd381B08004875512dba3852b04C',
        },
    },
    AVAX: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-avax-chain',
            fee: '0x3baEF661F30a9c6E3a454B82086F60dA3399853F',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-avax-chain',
            fee: '0x56762C1329dEc6cc885764CF821dB652Fd6E9881',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-avax-chain',
            fee: '0x5E1c9682d7d41a4ED3d8356d1458AB620f9b306E',
        },
    },
    BSC: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-binance-chain',
            fee: '0xC6299259a16F5d2DE232F68979123d29086dC957',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-binance-chain',
            fee: '0x9c27228B0A31BE4Ff59990Ed845F301EF765963f',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-binance-chain',
            fee: '0xEB7221AE9bCe303dBe364ba72C20b8D39904c04C',
        },
    },
} as const;

const CHEF_CONFIG = {
    FTM: {
        url: 'https://api.thegraph.com/subgraphs/name/krendmx/ftm-syntshef',
    },
    AVAX: {
        url: 'https://api.thegraph.com/subgraphs/name/krendmx/avax-syntshef',
    },
    BSC: {
        url: 'https://api.thegraph.com/subgraphs/name/krendmx/bsc-syntshef',
    },
} as const;

export { GRAPH_CONFIG, CHEF_CONFIG };
