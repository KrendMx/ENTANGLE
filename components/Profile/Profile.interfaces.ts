type IFilter =
    | 'Price increase'
    | 'Price decrease'
    | 'Profit increase'
    | 'Profit decrease'
    | 'Sort by';

interface IState {
    positions: string;
    price: string;
    avg?: number;
}

export type { IFilter, IState };
