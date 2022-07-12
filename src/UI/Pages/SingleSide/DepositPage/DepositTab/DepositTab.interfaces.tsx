import type { availableSingleSideChains } from '@/src/utils/GlobalConst';

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
    activeAssets: string;
}

export type { IDepositTabProps, depositStore };
