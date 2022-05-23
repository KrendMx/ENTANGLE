import type { CardsOrder } from './InvestCards.const';

interface IProps {
    balances: {[key: string]: {price: number, positions: number}},
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    filter: keyof typeof CardsOrder | 'Sort by';
}

type ICard = {
    chainId: string;
    description: string;
    position: number;
    price: number;
};

export type { IProps, ICard };