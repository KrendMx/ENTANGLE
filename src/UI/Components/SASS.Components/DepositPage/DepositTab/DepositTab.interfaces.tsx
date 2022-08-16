import type { availableSingleSideChains } from 'src/utils/Global/Types';

interface IDepositTabProps {
    first: availableSingleSideChains;
    second: availableSingleSideChains;
    time: string;
}

interface depositStore {
    stakedValueFirst: string;
    stakedValueSecond: string;
    apr: string;
    availableFirst: string;
    availableSecond: string;
    enterAmount: string;
}

interface GraphStore {
    activeAssets: string;
    activeButton: number;
    miniButtons: string[];
}

export type { IDepositTabProps, depositStore, GraphStore };
