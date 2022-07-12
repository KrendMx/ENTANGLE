import type { availableSingleSideChains } from '@/src/utils/GlobalConst';

interface IDashboardSASSProps {
    search: string;
    network: string;
    timeStatus: string;
}

interface IDashboardSASSItems {
    firstChainId: availableSingleSideChains;
    secondChainId: availableSingleSideChains;
    desc: string;
    depositeInFirstCurrency: number | null;
    depositeInSecondCurrency: number | null;
    term: 10 | 30 | 90;
    projectedILProtection: number;
    APR: number;
}

export type { IDashboardSASSProps, IDashboardSASSItems };
