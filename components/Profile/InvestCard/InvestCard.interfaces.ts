import type { IChain } from '@/src/ChainService/ChainService.interface';
import type { CardsOrder } from './InvestCards.const';

interface IProps {
    balances: { [key: string]: { price: number, positions: number } },
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
    bgGradient: string;
    cardType: string;
    cardTypeLabelColor: string;
    cardTypeLabelBg: string;
    currencyName: IChain
};

export type { IProps, ICard };
