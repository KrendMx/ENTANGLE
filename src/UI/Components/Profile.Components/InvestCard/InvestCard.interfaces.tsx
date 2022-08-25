import type { availableNames, availableChains } from 'utils/Global/Types';
import type { CardsOrder } from './InvestCards.const';

interface IProps {
    balances: {
        [key: string]: { [key: string]: { price: number; positions: number } };
    };
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    filter: keyof typeof CardsOrder | 'Sort by';
    totalBalance: number;
    hasTokens: boolean;
    smallCard?: boolean;
}

type CardValues = {
    price: string;
    profit: string;
};

interface balances {
    [key: string]: { [key: string]: { positions: number; price: number } };
}

interface ICardUnit {
    chainId: availableChains;
    description: string;
    positions: number;
    price: number;
    bgGradient: string;
    cardType: 'Synthetic-LP' | 'Locked';
    cardTypeLabelColor: string;
    cardTypeLabelBg: string;
    currencyName: availableNames;
}

export type {
    IProps, ICardUnit, CardValues, balances,
};
