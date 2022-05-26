import type { MetamaskErrorUserMessages } from '@/components/Modal/ErrorModal/ErrorModal.constants';

type AppState = {
    isLoaded: boolean;
    error: null | ErrorI;
    errorStack: ErrorI[];
    sucInfo: null | TransactionInfo;
    isOpenSelectWalletModal: boolean;
}

type TransactionInfo = { value: number, symbol: string, isReceived: boolean }

interface ErrorI {
    code?: keyof typeof MetamaskErrorUserMessages;
    head?: string;
    message?: string;
}

export type { AppState, ErrorI, TransactionInfo };
