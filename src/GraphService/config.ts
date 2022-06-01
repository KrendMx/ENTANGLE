const GRAPH_CONFIG = {
    FTM: {
        '250': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/fantom-synth-on-fantom-chain',
        '43114': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/avax-synth-on-fantom-chain',
        '56': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/binance-synth-on-fantom-chain',
    },
    AVAX: {
        '250': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/fantom-synth-on-avax-chain',
        '43114': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/avax-synth-on-avax-chain',
        '56': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/binance-synth-on-avax-chain',
    },
    BSC: {
        '250': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/fantom-synth-on-binance-chain',
        '43114': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/avax-synth-on-binance-chain',
        '56': 'https://thegraph.com/hosted-service/subgraph/dan1erukun/binance-synth-on-binance-chain',
    },
} as const;

export { GRAPH_CONFIG };
