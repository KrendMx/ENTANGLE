type IBorrowProps = {};

type BorrowState = {
    synthLp: string;
    lendSynthLp: string;
    getEnUSD: string;
    LTVRate: string;
    AVGCollaterization: string;
    commision: string;
    exchangeRate: string;
};

type IRepayProps = {}

type RepayState = {
    enterEnUSD: string,
    synthLp: string,
    balanceOfEnUSD: string,
    LTVRateUser: string,
    activeButtonRepay: string,
    activeButtonUnlock: string,
    AVGCollaterization: string,
    exchangeRate: string,
    currentLTVRate: string
}

export type {
    IBorrowProps, BorrowState, IRepayProps, RepayState,
};
