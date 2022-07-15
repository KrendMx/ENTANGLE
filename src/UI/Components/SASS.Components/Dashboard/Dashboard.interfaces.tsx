import type { availableSingleSideChains } from 'src/utils/Global/Types';

interface IDashboardSASSProps {
    search: string;
    network: string;
    timeStatus: string;
}

interface IDashboardSASSItems {
    firstChainId: availableSingleSideChains;
    secondChainId: availableSingleSideChains;
    depositeInFirstCurrency: number | null;
    depositeInSecondCurrency: number | null;
    term: 10 | 30 | 90;
    projectedILProtection: number;
    APR: number;
    site: string;
}

export type { IDashboardSASSProps, IDashboardSASSItems };
