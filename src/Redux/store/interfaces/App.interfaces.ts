import type { MetamaskErrorUserMessages } from '@/components/Modal/ErrorModal/ErrorModal.constants';

type AppState = {
    isLoaded: boolean;
    error: null | ErrorI;
    errorStack: ErrorI[];
    sucInfo: null | TransactionInfo;
    isOpenSelectWalletModal: boolean;
}

type TransactionInfo = { value: number, symbol: string, isReceived: boolean }

interface ErrorI extends Error {
    code: keyof typeof MetamaskErrorUserMessages
}

export type { AppState, ErrorI, TransactionInfo };
