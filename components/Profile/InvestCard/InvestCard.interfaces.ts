import type { IFilter } from '../index';

interface IProps {
    balances: {[key: string]: {price: number, positions: number}},
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    filter: IFilter;
}

type ICard = {
    chainId: string;
    description: string;
    position: number;
    price: number;
};

export type { IProps, ICard };
