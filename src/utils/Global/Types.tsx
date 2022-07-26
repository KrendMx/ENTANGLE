type availableChains = '43114' | '250' | '56' | '1' | '22417';

type availableSingleSideChains = '24886' | availableChains;

type availableNames = 'AVAX' | 'FTM' | 'BSC' | 'ETH' | 'ELRD';

type languages = 'en' | 'ru' | 'ch' | 'de' | 'ko';

type networksType = {
    [key: string]: {
        order: number;
        farm: number;
        title: string;
        abbr: string;
        icon: string;
        mmCurrency: string,
        currency: string;
        currencyMin: string;
        description: string;
        bgGradient?: string;
        cardTypeLabelColor?: string;
        cardTypeLabelBg?: string;
        dex: string;
        fiat: string;
        rpc: string;
        synth: string;
        mainColor: string;
        mainIcon: string;
    };
};

type TransactionHistoryEntity = {
    type: 'buy' | 'sell';
    id: string;
    crypto: number;
    amount: string;
    time: number;
};

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
    networksType,
};
