type BorrowState = {
    synthLp: string;
    lendSynthLp: string;
    getEnUSD: string;
    LTVRate: string;
    AVGCollaterization: string;
    commision: string;
    exchangeRate: string;
};

type RepayState = {
    enterEnUSD: string;
    repayToken: string;
    repayPosition: string;
    unlockAmount: string;
    activeButtonRepay: string;
    AVGCollaterization: string;
    exchangeRate: string;
    currentLTVRate: string;
};

export type { BorrowState, RepayState };
