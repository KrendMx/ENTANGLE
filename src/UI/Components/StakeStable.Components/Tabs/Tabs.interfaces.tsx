interface LockProps {
    token: string;
}

interface ILockState {
    network: string;
    usdcAmount: string;
    lockPeriod: number;
    apr: string;
    apr24: string;
    activeButtonRepay: string
}

interface WithdrawProps {
    token: string;
}

interface IWithdrawState {
    network: string;
    activeButtonRepay:string;
    usdcAmount: string;
    getUsdc: string;
}

export type {
    LockProps,
    ILockState,
    WithdrawProps,
    IWithdrawState,
};
