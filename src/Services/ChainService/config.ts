import {
    avaDex,
    avaSynth,
    ftmSynth,
    ftmDex,
    joePair,
    joeRouter,
    spiritChef,
    spiritPair,
    spiritRouter,
    opToken,
    feeAbi,
    dexOnDemand,
    synthChef,
    joeChef,
    pancakeChef,
    pancakePair,
    pancakeRouter,
    FantomSynthChef,
    AvalanceSynthChef,
    EntangleRouter,
    EntangleDexOnDemand, EntangleSynth, EntangleDEX,
} from 'utils/ABIs';

export const NETWORKS = {
    250: {
        rpc: 'https://rpc.ankr.com/fantom',
    },
    43114: {
        rpc: 'https://rpc.ankr.com/avalanche',
    },
    56: {
        rpc: 'https://bsc-dataseed2.binance.org',
    },
    1: {
        rpc: 'https://rpc.ankr.com/eth',
    },
    10: {
        rpc: 'https://optimism-mainnet.public.blastapi.io',
    },
    42161: {
        rpc: 'https://rpc.ankr.com/arbitrum',
    },
};

export const ChainConfig = {
    FTM: {
        NAME: 'MIM/USDC LP',
        SYNTH: [
            {
                ID: '67', // synt id
                FARMID: '67', // farm id
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x9f354Fd8b08b6472A9Bb6A86a42EA9e44485dd65',
                        abi: EntangleSynth,
                        chainId: 43114,
                    },
                    DEX: {
                        address: '0xf7B16557483Fc845041fEb88E7C358056034c986',
                        abi: EntangleDEX,
                        chainId: 43114,
                    },
                    STABLE: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: avaSynth,
                        chainId: 43114,
                    },
                    FEE: {
                        address: '0x3baEF661F30a9c6E3a454B82086F60dA3399853F',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                    SYNTHCHEF: {
                        address: '0x5908fC78691b8458b6b5aB713dF5E6225cba6153',
                        abi: FantomSynthChef,
                        chainId: 250,
                    },
                    STABLESYNTCHEF: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    CHEF: {
                        address: '0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093',
                        abi: spiritChef,
                        chainId: 250,
                    },
                    PAIR: {
                        address: '0xc19C7615237f770179ed93d89126478c60742664',
                        abi: spiritPair,
                        chainId: 250,
                    },
                    ROUTER: {
                        address: '0x832292aC0E865414BB5Ac8F70F1D511a28719bB8',
                        abi: EntangleRouter,
                        chainId: 250,
                    },
                },
            },
            {
                ID: '9',
                FARMID: '67',
                CROSSCHAIN: false,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x255E606D253635e0bD2DF6a6FebEBb0173fE966a',
                        abi: EntangleSynth,
                        chainId: 250,
                    },
                    DEX: {
                        address: '0xB0b6e9B69941130c7E63cbBc6203EBf5E32eAB77',
                        abi: EntangleDexOnDemand,
                        chainId: 250,
                    },
                    STABLE: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: ftmSynth,
                        chainId: 250,
                    },
                    FEE: {
                        address: '0x46744Ba628C1bac414aF92E06478094a78e53798',
                        abi: feeAbi,
                        chainId: 250,
                    },
                    SYNTHCHEF: {
                        address: '0x5908fC78691b8458b6b5aB713dF5E6225cba6153',
                        abi: FantomSynthChef,
                        chainId: 250,
                    },
                    STABLESYNTCHEF: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: ftmSynth,
                        chainId: 250,
                    },
                    CHEF: {
                        address: '0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093',
                        abi: spiritChef,
                        chainId: 250,
                    },
                    PAIR: {
                        address: '0xc19C7615237f770179ed93d89126478c60742664',
                        abi: spiritPair,
                        chainId: 250,
                    },
                    ROUTER: {
                        address: '0x832292aC0E865414BB5Ac8F70F1D511a28719bB8',
                        abi: EntangleRouter,
                        chainId: 250,
                    },
                },
            },
            {
                ID: '69',
                FARMID: '67',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x4e726245a362c1FE0947151199Bb225c0131C362',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0xf7B16557483Fc845041fEb88E7C358056034c986',
                        abi: EntangleDEX,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0xC6299259a16F5d2DE232F68979123d29086dC957',
                        abi: feeAbi,
                        chainId: 56,
                    },
                    SYNTHCHEF: {
                        address: '0x5908fC78691b8458b6b5aB713dF5E6225cba6153',
                        abi: FantomSynthChef,
                        chainId: 250,
                    },
                    STABLESYNTCHEF: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: ftmSynth,
                        chainId: 250,
                    },
                    CHEF: {
                        address: '0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093',
                        abi: spiritChef,
                        chainId: 250,
                    },
                    PAIR: {
                        address: '0xc19C7615237f770179ed93d89126478c60742664',
                        abi: spiritPair,
                        chainId: 250,
                    },
                    ROUTER: {
                        address: '0x832292aC0E865414BB5Ac8F70F1D511a28719bB8',
                        abi: EntangleRouter,
                        chainId: 250,
                    },
                },
            },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
        ],
    },
    AVAX: {
        NAME: 'USDT/USDT.e LP',
        SYNTH: [
            {
                ID: '8',
                FARMID: '8',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x5628999744803ed03E31967140Ba33bAf47636E6',
                        abi: EntangleSynth,
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
                    FEE: {
                        address: '0xc1B98EFed2A492Dc7FF79247C0Fc8f202e9a83F4',
                        abi: feeAbi,
                        chainId: 250,
                    },
                    SYNTHCHEF: {
                        address: '0xca7c6C6cA244833e1730e379289704A1f42A6Dc5',
                        abi: AvalanceSynthChef,
                        chainId: 43114,
                    },
                    STABLESYNTCHEF: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: ftmSynth,
                        chainId: 43114,
                    },
                    CHEF: {
                        address: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F',
                        abi: joeChef,
                        chainId: 43114,
                    },
                    PAIR: {
                        address: '0x2A8A315e82F85D1f0658C5D66A452Bbdd9356783',
                        abi: joePair,
                        chainId: 43114,
                    },
                    ROUTER: {
                        address: '0xB6DDa0EB32D5D169940f43c113F93D6D550188C7',
                        abi: EntangleRouter,
                        chainId: 43114,
                    },
                },
            },
            {
                ID: '68',
                FARMID: '8',
                CROSSCHAIN: false,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xaf42bfe2a3995af0339e9d1474eb5de7b76ac71d',
                        abi: EntangleSynth,
                        chainId: 43114,
                    },
                    DEX: {
                        address: '0x2FD7C174181F2637a86e55820BeAF97142c2DC64',
                        abi: dexOnDemand,
                        chainId: 43114,
                    },
                    STABLE: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: avaSynth,
                        chainId: 43114,
                    },
                    FEE: {
                        address: '0x56762C1329dEc6cc885764CF821dB652Fd6E9881',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                    SYNTHCHEF: {
                        address: '0xca7c6C6cA244833e1730e379289704A1f42A6Dc5',
                        abi: AvalanceSynthChef,
                        chainId: 43114,
                    },
                    STABLESYNTCHEF: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: avaSynth,
                        chainId: 43114,
                    },
                    CHEF: {
                        address: '0x4483f0b6e2F5486D06958C20f8C39A7aBe87bf8F',
                        abi: joeChef,
                        chainId: 43114,
                    },
                    PAIR: {
                        address: '0x2A8A315e82F85D1f0658C5D66A452Bbdd9356783',
                        abi: joePair,
                        chainId: 43114,
                    },
                    ROUTER: {
                        address: '0xB6DDa0EB32D5D169940f43c113F93D6D550188C7',
                        abi: EntangleRouter,
                        chainId: 43114,
                    },
                },
            },
            {
                ID: '10',
                FARMID: '8',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x4e726245a362c1FE0947151199Bb225c0131C362',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0xe50230A2e27a8b8893776546bbca84473704DD6f',
                        abi: dexOnDemand,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0xC6299259a16F5d2DE232F68979123d29086dC957',
                        abi: feeAbi,
                        chainId: 56,
                    },
                    SYNTHCHEF: {
                        address: '0x5908fC78691b8458b6b5aB713dF5E6225cba6153',
                        abi: FantomSynthChef,
                        chainId: 250,
                    },
                    STABLESYNTCHEF: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: ftmSynth,
                        chainId: 250,
                    },
                    CHEF: {
                        address: '0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093',
                        abi: spiritChef,
                        chainId: 250,
                    },
                    PAIR: {
                        address: '0xc19C7615237f770179ed93d89126478c60742664',
                        abi: spiritPair,
                        chainId: 250,
                    },
                    ROUTER: {
                        address: '0x832292aC0E865414BB5Ac8F70F1D511a28719bB8',
                        abi: EntangleRouter,
                        chainId: 250,
                    },
                },
            },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
        ],
    },
    OPT: {
        NAME: 'sUSD/USDC Synthetic LP',
        SYNTH: [
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: 42161,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //     SYNTH: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     DEX: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     FEE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     SYNTHCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLESYNTCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     CHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     PAIR: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     ROUTER: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            // },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //     SYNTH: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     DEX: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     FEE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     SYNTHCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLESYNTCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     CHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     PAIR: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     ROUTER: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            // },
            // },
        ],
    },
    ARB: {
        NAME: 'ARB/USDC Synthetic LP',
        SYNTH: [
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: 10,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {SYNTH: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     DEX: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     FEE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     SYNTHCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLESYNTCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     CHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     PAIR: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     ROUTER: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            // },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: false,
            //     CONTRACTS: {SYNTH: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     DEX: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     FEE: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     SYNTHCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     STABLESYNTCHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     CHEF: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     PAIR: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            //     ROUTER: {
            //         address: '',
            //         abi: ,
            //         chainId: ,
            //     },
            // },
            // },
        ],
    },
    BSC: {
        NAME: 'USDT/BUSD Synthetic LP',
        SYNTH: [
            {
                ID: '7',
                FARMID: '7',
                CROSSCHAIN: false,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xBD289C7596e4130B367dE865e3d87E239eCB2438',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0xA697872DF8736F51E41ebD11aE6847416032cA2E',
                        abi: dexOnDemand,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0xEB7221AE9bCe303dBe364ba72C20b8D39904c04C',
                        abi: feeAbi,
                        chainId: 56,
                    },
                    SYNTHCHEF: {
                        address: '0x473ce3f11Fadd1dBb27a13D56320713F984Ab8B0',
                        abi: synthChef,
                        chainId: 56,
                    },
                    STABLESYNTCHEF: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: ftmSynth,
                        chainId: 56,
                    },
                    CHEF: {
                        address: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
                        abi: pancakeChef,
                        chainId: 56,
                    },
                    PAIR: {
                        address: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
                        abi: pancakePair,
                        chainId: 56,
                    },
                    ROUTER: {
                        address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
                        abi: pancakeRouter,
                        chainId: 56,
                    },
                },
            },
            {
                ID: '11',
                FARMID: '7',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x441Cf9aC9B694Bc72A7cd35FdD7eC928fb75bAFD',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    DEX: {
                        address: '0x59606CDbD5B38Fd8e6C4875E2eF7136f1a961305',
                        abi: dexOnDemand,
                        chainId: 250,
                    },
                    STABLE: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    FEE: {
                        address: '0x21e06BEb4e1bcd381B08004875512dba3852b04C',
                        abi: feeAbi,
                        chainId: 250,
                    },
                    SYNTHCHEF: {
                        address: '0x473ce3f11Fadd1dBb27a13D56320713F984Ab8B0',
                        abi: synthChef,
                        chainId: 56,
                    },
                    STABLESYNTCHEF: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: ftmSynth,
                        chainId: 56,
                    },
                    CHEF: {
                        address: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
                        abi: pancakeChef,
                        chainId: 56,
                    },
                    PAIR: {
                        address: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
                        abi: pancakePair,
                        chainId: 56,
                    },
                    ROUTER: {
                        address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
                        abi: pancakeRouter,
                        chainId: 56,
                    },
                },
            },
            {
                ID: '70',
                FARMID: '7',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x901D6D195f9fF29051E499792291186B9A9CdBFc',
                        abi: avaSynth,
                        chainId: 43114,
                    },
                    DEX: {
                        address: '0x1a9606FCcE014c34f3847b103098438fA92Dddaf',
                        abi: dexOnDemand,
                        chainId: 43114,
                    },
                    STABLE: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: avaSynth,
                        chainId: 43114,
                    },
                    FEE: {
                        address: '0x5E1c9682d7d41a4ED3d8356d1458AB620f9b306E',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                    SYNTHCHEF: {
                        address: '0x473ce3f11Fadd1dBb27a13D56320713F984Ab8B0',
                        abi: synthChef,
                        chainId: 56,
                    },
                    STABLESYNTCHEF: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: ftmSynth,
                        chainId: 56,
                    },
                    CHEF: {
                        address: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
                        abi: pancakeChef,
                        chainId: 56,
                    },
                    PAIR: {
                        address: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
                        abi: pancakePair,
                        chainId: 56,
                    },
                    ROUTER: {
                        address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
                        abi: pancakeRouter,
                        chainId: 56,
                    },
                },
            },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         SYNTHCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLESYNTCHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         CHEF: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         PAIR: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         ROUTER: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
        ],
    },
    ETH: {
        NAME: 'MIM/USDC Synthetic LP',
        SYNTH: [
            {
                ID: '20',
                FARMID: '26',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x6fDa2e4C4187017D92a11D02b455C51E8CFF7FEA',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0x8E1575934a6Adfd6AdBb08Bde1490A00Acb60706',
                        abi: dexOnDemand,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0xf86967d5dd4ABDF454Bf13C66c59210844922474',
                        abi: feeAbi,
                        chainId: 56,
                    },
                },
            },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            {
                ID: '12',
                FARMID: '26',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xAe8aF48Ea0E9dc54Cc3328a872a323F039920ceb',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    DEX: {
                        address: '0xD9E4EeaeDC5A5c65feaFb376d866d10db9B2b04c',
                        abi: dexOnDemand,
                        chainId: 250,
                    },
                    STABLE: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    FEE: {
                        address: '0x10424388092fB8Cd3E235A623e950afDd1655561',
                        abi: feeAbi,
                        chainId: 250,
                    },
                },
            },
            {
                ID: '71',
                FARMID: '26',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xf066F23C55D7aF2259Da196862B3c23702B9320b',
                        abi: ftmSynth,
                        chainId: 43114,
                    },
                    DEX: {
                        address: '0x7197c3059Df102AAD8A0f517A11241BB76d4dcF9',
                        abi: ftmDex,
                        chainId: 43114,
                    },
                    STABLE: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: ftmSynth,
                        chainId: 43114,
                    },
                    FEE: {
                        address: '0x5169b4351AD7215a326301d93537b068ef5DAD3B',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                },
            },
        ],
    },
    ELRD: {
        NAME: 'EGLD-USDC Synthetic LP',
        SYNTH: [
            {
                ID: '27',
                FARMID: '100',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xD1aF5dFa8fe427542D7690856b6B7AD0bB1Bbb7f',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0xBE9DAd3c99b27549d1D05B2Cf618465ee877A673',
                        abi: dexOnDemand,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: avaSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0x8B2EBf0D1211B7cD921bb9C0cf79E8F33665D86A',
                        abi: feeAbi,
                        chainId: 56,
                    },
                },
            },
            {
                ID: '77',
                FARMID: '100',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xCF81f0F04F191BD644e9CA62CD6992657574A408',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    DEX: {
                        address: '0xd9217E9BBE3e7D0d4803f447bdcCc0439739e7Fe',
                        abi: dexOnDemand,
                        chainId: 250,
                    },
                    STABLE: {
                        address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
                        abi: avaSynth,
                        chainId: 250,
                    },
                    FEE: {
                        address: '0x689e884D4BF9e7445eEE4813e27226BE9f98AfcF',
                        abi: feeAbi,
                        chainId: 250,
                    },
                },
            },
            {
                ID: '13',
                FARMID: '100',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x39f0EFb3Ce44fd54c0B6faAAD3371eb6D34DBF7F',
                        abi: ftmSynth,
                        chainId: 43114,
                    },
                    DEX: {
                        address: '0x10424388092fB8Cd3E235A623e950afDd1655561',
                        abi: ftmDex,
                        chainId: 43114,
                    },
                    STABLE: {
                        address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
                        abi: ftmSynth,
                        chainId: 43114,
                    },
                    FEE: {
                        address: '0x871F2e8422F5104DE6436A40b8662183F221050f',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                },
            },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
            // {
            //     ID: '',
            //     FARMID: '',
            //     CROSSCHAIN: true,
            //     CONTRACTS: {
            //         SYNTH: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         DEX: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         STABLE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //         FEE: {
            //             address: '',
            //             abi: ,
            //             chainId: ,
            //         },
            //     },
            // },
        ],
    },
} as const;

export const AdditionalConfig = {
    CONTRACTS: {
        OP: {
            TOKEN: {
                abi: opToken,
            },
        },
    },
} as const;
