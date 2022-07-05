import type { availableChains } from '@/src/utils/GlobalConst';

export type MintDashboardItemCardType = {
    chainId?: availableChains;
    bgGradient: string;
    icon: string;
    heading: string;
    description: string;
    vendor: string;
    priceCurrency: string;
    disabled: boolean;
    apr: string | null;
    price: string | null;
    currentDeposits: string | null;
};
