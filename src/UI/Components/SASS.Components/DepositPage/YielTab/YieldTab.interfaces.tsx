import type { availableSingleSideChains } from 'src/utils/Global/Types';

interface IYieldTabProps {
    firstChainId: availableSingleSideChains;
    secondChainId: availableSingleSideChains;
    duration: number;
}

interface IYieldTabStore {
    isYield: boolean;
    firstUserStake: string;
    secondUserStake?: string;
    stakedAmount: string;
    stakinTerm?: number;
    stakingRemained: number;
    currentFirstAmount: number;
    currentSecondAmount: number;
    profitAmount: number;
    ProjectedILPercentage: number;
    impermanentWinPercentage: number;
}
export type { IYieldTabProps, IYieldTabStore };
