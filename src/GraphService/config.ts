const GRAPH_CONFIG = {
    FTM: {
        '250': 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-fantom-chain',
        '43114': 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-fantom-chain',
        '56': 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-fantom-chain',
    },
    AVAX: {
        '250': 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-avax-chain',
        '43114': 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-avax-chain',
        '56': 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-avax-chain',
    },
    BSC: {
        '250': 'https://api.thegraph.com/subgraphs/name/dan1erukun/fantom-synth-on-binance-chain',
        '43114': 'https://api.thegraph.com/subgraphs/name/dan1erukun/avax-synth-on-binance-chain',
        '56': 'https://api.thegraph.com/subgraphs/name/dan1erukun/binance-synth-on-binance-chain',
    },
} as const;

export { GRAPH_CONFIG };
