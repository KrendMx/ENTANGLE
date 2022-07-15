import type { availableChains } from 'src/utils/Global/Types';

interface IChainServiceVars { }

interface IChainService extends IChainServiceVars { }

type chefDataType = {
    [key in availableChains]: {
        compounds: CompoundObject[];
        deposites: WithdrawAndDepositeObject[];
        withdraws: WithdrawAndDepositeObject[];
    };
};

type WithdrawAndDepositeObject = {
    id: string;
    address: string;
    amount: string;
}

type CompoundObject = {
    id: string;
    address: string;
    amount: string;
}

export type {
    IChainService,
    chefDataType,
};
