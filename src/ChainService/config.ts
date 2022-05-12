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
    pancakeChef,
    pancakePair,
    pancakeRouter,
} from './abi/index';

export const NETWORKS = {
    250: {
        rpc: 'https://rpc.ankr.com/fantom',
    },
    43114: {
        rpc: 'https://api.avax.network/ext/bc/C/rpc',
    },
    56: {
        rpc: 'https://bsc-dataseed2.binance.org',
    },
    1: {
        rpc: 'https://rpc.ankr.com/eth',
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
            {
                ID: '10',
                FARMID: '8',
                CROSSCHAIN: true,
                CONTRACTS: {
                    SYNTH: {
                        address: '0x50780f5825ACf7A85d38368c2dFABE39d512cC26',
                        abi: ftmSynth,
                        chainId: 56,
                    },
                    DEX: {
                        address: '0x9Bf5FdafCB56B2004Be6F1061Cbc4d90966FD011',
                        abi: ftmDex,
                        chainId: 56,
                    },
                    STABLE: {
                        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        abi: ftmSynth,
                        chainId: 56,
                    },
                    FEE: {
                        address: '0x9c27228B0A31BE4Ff59990Ed845F301EF765963f',
                        abi: feeAbi,
                        chainId: 56,
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
