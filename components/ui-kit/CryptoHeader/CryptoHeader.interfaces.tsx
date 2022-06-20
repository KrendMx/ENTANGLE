interface CryptoHeaderProps {
    token: string;
    isStable: boolean;
    balance: number;
    locked: number;
    apr: number;
    earned: number;
    backHref: string;
}

export type {
    CryptoHeaderProps,
}