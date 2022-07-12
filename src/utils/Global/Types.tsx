type availableChains = '43114' | '250' | '56' | '1';

type availableSingleSideChains = '24886' | availableChains;

type availableNames = 'AVAX' | 'FTM' | 'BSC' | 'ETH';

type languages = 'en' | 'ru' | 'ch' | 'de' | 'ko';

type TransactionHistoryEntity = {
    type: 'buy' | 'sell',
    id: string,
    crypto: number,
    amount: string,
    time: number
}

type walletKeyType =
    | 'MetaMask'
    | 'Coin98'
    | 'CoinBase'
    | 'WalletConnect'
    | null;

interface ErrorI {
    code?: number;
    head?: string;
    message?: string;
}

export type {
    availableChains,
    availableNames,
    languages,
    ErrorI,
    TransactionHistoryEntity,
    walletKeyType,
    availableSingleSideChains,
};
