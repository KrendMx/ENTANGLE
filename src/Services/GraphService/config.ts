const GRAPH_CONFIG = {
    FTM: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/ftm_ftm',
            fee: '0x46744Ba628C1bac414aF92E06478094a78e53798',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/ftm_avax',
            fee: '0xc1B98EFed2A492Dc7FF79247C0Fc8f202e9a83F4',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/ftm_bsc',
            fee: '0x21e06BEb4e1bcd381B08004875512dba3852b04C',
        },
        '1': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/eth_ftm',
            fee: '0x10424388092fB8Cd3E235A623e950afDd1655561',
        },
        '100': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/elrd_ftm',
            fee: '0x689e884D4BF9e7445eEE4813e27226BE9f98AfcF',
        },
    },
    AVAX: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/avax_ftm',
            fee: '0x3baEF661F30a9c6E3a454B82086F60dA3399853F',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/avax_avax',
            fee: '0x56762C1329dEc6cc885764CF821dB652Fd6E9881',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/avax_bsc',
            fee: '0x5E1c9682d7d41a4ED3d8356d1458AB620f9b306E',
        },
        '1': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/eth_avax',
            fee: '0x5169b4351AD7215a326301d93537b068ef5DAD3B',
        },
        '100': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/elrd_avax',
            fee: '0x871F2e8422F5104DE6436A40b8662183F221050f',
        },
    },
    BSC: {
        '250': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/bsc_ftm',
            fee: '0xC6299259a16F5d2DE232F68979123d29086dC957',
        },
        '43114': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/bsc_avax',
            fee: '0x9c27228B0A31BE4Ff59990Ed845F301EF765963f',
        },
        '56': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/bsc_bsc',
            fee: '0xEB7221AE9bCe303dBe364ba72C20b8D39904c04C',
        },
        '1': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/eth_bsc',
            fee: '0xf86967d5dd4ABDF454Bf13C66c59210844922474',
        },
        '100': {
            url: 'https://api.thegraph.com/subgraphs/name/zaeba1sya/elrd_bsc',
            fee: '0x8B2EBf0D1211B7cD921bb9C0cf79E8F33665D86A',
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
