export const networks = {
    '43114': {
        title: 'Avalanche',
        icon: 'avalanche.svg',
        currency: 'USDT/USDT.e Synthetic LP',
        currencyMin: 'USDT/USDT.e',
        dex: '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
        fiat: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
        synth: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3'
    },
    '250': {
        title: 'Fantom',
        icon: 'fantom.svg',
        currency: 'MIM/USDC Synthetic LP',
        currencyMin: 'MIM/USDC',
        dex: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
        fiat: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
        rpc: 'https://rpc.ankr.com/fantom',
        synth: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71'
    },
} as const;
