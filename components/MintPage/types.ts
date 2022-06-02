export type MintDashboardItemCardType = {
    chainId?: string;
    bgGradient: string;
    icon: string;
    heading: string;
    description?: JSX.Element;
    priceCurrency: string;
    disabled: boolean;
    apr: string | null;
    price: string | null;
    currentDeposits: string | null;
};
