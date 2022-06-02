import type { MintDashboardItemCardType } from '@/components/MintPage/types';
import type { MetamaskErrorUserMessages } from '@/components/Modal/ErrorModal/ErrorModal.constants';

import type { languages } from '../../../utils/GlobalConst';

type AppState = {
    isLoaded: boolean;
    error: null | ErrorI;
    errorStack: ErrorI[];
    sucInfo: null | TransactionInfo;
    isOpenSelectWalletModal: boolean;
    language: languages;
    activeCard: MintDashboardItemCardType | null;
};

type TransactionInfo = { value: number; symbol: string; isReceived: boolean };

interface ErrorI {
    code?: keyof typeof MetamaskErrorUserMessages;
    head?: string;
    message?: string;
}

export type { AppState, ErrorI, TransactionInfo };
