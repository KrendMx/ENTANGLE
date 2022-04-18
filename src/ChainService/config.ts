import {
    avaDex,
    avaSynth,
    avalancheChef,
    ftmSynth,
    ftmDex,
    joePair,
    joeRouter,
    spiritChef,
    spiritPair,
    spiritRouter,
    opToken,
} from './abi/index';

export const ChainConfig = {
    FTM: {
        CONTRACTS: {
            SYNTH: {
                address: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
                abi: ftmSynth,
                chainId: 250,
            },
            FACTORY: {
                address: '0x9D7Ecf9ac8c76bFD125713fe8db5196756f816A3',
                abi: avalancheChef,
                chainId: 250,
            },
            DEX: {
                address: '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
                abi: ftmDex,
                chainId: 250,
            },
            STABLE: {
                address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                abi: ftmSynth,
                chainId: 250,
            },
        },
        synthName: 'MIM/USDC LP',
        RPC: 'https://rpc.ankr.com/fantom',
        net: '67',
        forSwap: '0x5Cc61A78F164885776AA610fb0FE1257df78E59B',
        forAmount: '0xEc5Dd887ea02F18f1e71D45D27F9c564e84e1f29'
    },

    AVAX: {
        CONTRACTS: {
            CHEF: {
                address: '0xEc5Dd887ea02F18f1e71D45D27F9c564e84e1f29',
                abi: avalancheChef,
                chainId: 250,
            },
            SYNTH: {
                address: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
                abi: avaSynth,
                chainId: 43114,
            },
            FACTORY: {
                address: "0xc190EE409C29b3538644DaaC7B95333eD81Fb3F1",
                abi: null,
                chainId: 43114
            },
            DEX: {
                address: '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
                abi: avaDex,
                chainId: 43114,
            },
            STABLE: {
                address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                abi: avaSynth,
                chainId: 43114,
            },
        },
        synthName: 'USDT/USDT.e LP',
        RPC: 'https://api.avax.network/ext/bc/C/rpc',
        net: '8',
        forSwap: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
        forAmount: '0x9D7Ecf9ac8c76bFD125713fe8db5196756f816A3'
    },
} as const;

export const AdditionalConfig = {
    CONTRACTS: {
        AVAX: {
            CHEF: {
                address: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F',
                abi: avalancheChef,
            },
            PAIR: {
                address: '0x2A8A315e82F85D1f0658C5D66A452Bbdd9356783',
                abi: joePair,
            },
            ROUTER: {
                address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
                abi: joeRouter
            }
        },
        FTM: {
            CHEF: {
                address: '0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093',
                abi: spiritChef
            },
            PAIR: {
                address: '0xc19C7615237f770179ed93d89126478c60742664',
                abi: spiritPair
            },
            ROUTER: {
                address: '0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52',
                abi: spiritRouter
            }
        },
        OP: {
            TOKEN: {
                abi: opToken
            }
        }
    }
} as const;