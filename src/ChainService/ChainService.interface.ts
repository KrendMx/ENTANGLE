import type { Contract } from 'ethers';

interface ICardData {
    apr: string;
    totalDeposits: string;
    currentDeposits: string;
    available: string;
    totalAvailable: string;
    price: string;
}

interface IPersonalData {
    positions: number;
    totalPositions: string;
}

interface IResult {
    result: number;
}

interface ITX {
    wait: () => Promise<IResult>;
}

interface IChainServiceVars {
    readonly name: IChain;
    readonly PairContract: Contract;
    readonly ChefContract: Contract;
    readonly RouterContract: Contract;
    readonly SynthContract: Contract;
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

export type { IChainService, IChain };
