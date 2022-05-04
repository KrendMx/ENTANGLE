import type { Contract } from 'ethers';
import type { ChainConfig } from './config';

interface ICardData {
    apr: number;
    totalDeposits: number;
    currentDeposits: number;
    available: number;
    totalAvailable: number;
    price: number;
}

interface IPersonalData {
    positions: number;
    totalPositions: number;
}

interface IResult {
    result: number;
}

interface ITX {
    wait: () => Promise<IResult>;
}

type SynthContracts = {
    SYNTH: Contract,
    DEX: Contract,
    STABLE: Contract,
    FEE: Contract,
    SYNTHCHEF: Contract,
    STABLESYNTCHEF: Contract,
    CHEF: Contract,
    PAIR: Contract,
    ROUTER: Contract,
};

type keyType = ('9' & '67') | ('8' & '68');

interface IChainServiceVars {
    readonly name: IChain;
    readonly ChefContract: Contract;
    readonly RouterContract: Contract;
    readonly SynthsContractsArray: {[key: string]: Contract};
    readonly DEXContract: Contract;
    readonly OppositeToken: IChain;
}

interface IChainService extends IChainServiceVars {
    getCardData: () => Promise<ICardData>;
    getPersonalData: (account: string) => Promise<IPersonalData>;
    buyToken: (value: number) => Promise<ITX>;
    sellToken: (value: number) => Promise<ITX>;
}

type IChain = 'FTM' | 'AVAX';

export type {
    IChainService, IChain, keyType, SynthContracts,
};
