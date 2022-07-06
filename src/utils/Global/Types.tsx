type availableChains = '43114' | '250' | '56' | '1';

type availableNames = 'AVAX' | 'FTM' | 'BSC' | 'ETH';

type languages = 'en' | 'ru' | 'ch' | 'de' | 'ko';

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
};
