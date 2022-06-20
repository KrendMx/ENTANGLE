import type React from 'react';

type PropSelectTypes = {
    currenc: string;
    func: any;
    currencSymbol: string;
};

type PropOptionTypes = {
    key?: number;
    isOpen: boolean;
    handleClick: () => void;
    icon: string;
    name: string;
    currencSymbol: string;
    price: string;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

type currencyObject = {
    name: string;
    icon: string;
    price: number;
};

type priceObject = {
    AVAX: Object;
    BSC: Object;
    FTM: Object;
}

export type {
    priceObject,
    PropSelectTypes,
    PropOptionTypes,
    currencyObject,
};
