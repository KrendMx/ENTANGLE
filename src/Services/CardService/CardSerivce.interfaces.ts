import type { Contract } from 'ethers';
import type { availableChains, availableNames } from 'utils/Global/Types';

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

interface ICardServiceVars {
    readonly name: availableNames;
    readonly SynthsContractsArray: { [key: string]: Contract };
}

interface ICardService extends ICardServiceVars {
    getCardData: (id: string) => Promise<ICardData>;
    getPersonalData: (account: string, id: string) => Promise<IPersonalData>;
}

export type {
    ICardService, keyType, SynthContracts,
};
