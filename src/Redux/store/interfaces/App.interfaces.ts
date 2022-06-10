import type { MintDashboardItemCardType } from '@/components/Mint/Demand/MintPage/types';
import type { MetamaskErrorUserMessages } from '@/components/Modal/ErrorModal/ErrorModal.constants';

import type { availableChains, languages } from '../../../utils/GlobalConst';

type AppState = {
    isLoaded: boolean;
    error: null | ErrorI;
    errorStack: ErrorI[];
    sucInfo: null | TransactionInfo;
    isOpenSelectWalletModal: boolean;
    language: languages;
    activeCard: MintDashboardItemCardType | null;
    sortingObject: {[key: string]:sortingCard}
};

type TransactionInfo = { value: number; symbol: string; isReceived: boolean };

type sortingCard = {
    chainId: string;
    APR: number;
    staked: number;
}

interface ErrorI {
    code?: keyof typeof MetamaskErrorUserMessages;
    head?: string;
    message?: string;
}

export type {
    AppState, ErrorI, TransactionInfo, sortingCard,
};
