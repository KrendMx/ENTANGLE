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
    feeAbi,
    dexOnDemand,
    synthChef,
    joeChef,
} from './abi/index';

export const NETWORKS = {
    250: {
        rpc: 'https://rpc.ankr.com/fantom',
    },
    43114: {
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
    },
};

export const ChainConfig = {
    FTM: {
        NAME: 'MIM/USDC LP',
        SYNTH: [
            {
                ID: '67',
                FARMID: '67',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
                        abi: avaSynth,
                        chainId: 43114,
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
                    FEE: {
                        address: '0x3baEF661F30a9c6E3a454B82086F60dA3399853F',
                        abi: feeAbi,
                        chainId: 43114,
                    },
                    SYNTHCHEF: {
                        address: '0x3e1A6403F4083B13f83F2D411fBBB90cb2B6cC0c',
                        abi: synthChef,
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
                        address: '0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52',
                        abi: spiritRouter,
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
                        address: '0x19ffF7129dC1121d013908aECd14A70aa58bD0Ea',
                        abi: ftmSynth,
                        chainId: 250,
                    },
                    DEX: {
                        address: '0x1DE59d9706851442B1064f92ec78CF6c82CA85F0',
                        abi: dexOnDemand,
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
                        address: '0x3e1A6403F4083B13f83F2D411fBBB90cb2B6cC0c',
                        abi: synthChef,
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
                        address: '0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52',
                        abi: spiritRouter,
                        chainId: 250,
                    },
                },
            },
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
                        address: '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
                        abi: ftmSynth,
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
                        address: '0x04F7C1850c545788bA729fE6b7ad40Dc0D88af90',
                        abi: synthChef,
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
                        address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
                        abi: joeRouter,
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
                        address: '0x998e0ffb556A114a8c22C3378775A4066b7432A7',
                        abi: avaSynth,
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
                        address: '0x04F7C1850c545788bA729fE6b7ad40Dc0D88af90',
                        abi: synthChef,
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
                        address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
                        abi: joeRouter,
                        chainId: 43114,
                    },
                },
            },
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
