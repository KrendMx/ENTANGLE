import type { languages } from 'utils/Global/Types';

type siteThemes = 'default';

interface IAppEntityState {
    language: languages;
    theme: siteThemes;
    isAppLoaded: boolean;
    isOpenSelectWalletModal: boolean;
    sucInfo: TransactionInfo | null;
}

type TransactionInfo = { value: number; symbol: string; isReceived: boolean };

export type {
    IAppEntityState,
    siteThemes,
    TransactionInfo,
};
