import type { Contract } from 'ethers';

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

type SynthContracts = {
    SYNTH: Contract;
    DEX: Contract;
    STABLE: Contract;
    FEE: Contract;
    SYNTHCHEF: Contract;
    STABLESYNTCHEF: Contract;
    CHEF: Contract;
    PAIR: Contract;
    ROUTER: Contract;
};

type keyType = ('9' & '67') | ('8' & '68');

interface IChainServiceVars {}

interface ICardServiceVars {
    readonly name: IChain;
    readonly SynthsContractsArray: { [key: string]: Contract };
}

interface ICardService extends ICardServiceVars {
    getCardData: (id: string) => Promise<ICardData>;
    getPersonalData: (account: string, id: string) => Promise<IPersonalData>;
}

interface IChainService extends IChainServiceVars {}

type IChain = 'FTM' | 'AVAX' | 'BSC';

export type {
    ICardService, IChain, keyType, SynthContracts, IChainService,
};
