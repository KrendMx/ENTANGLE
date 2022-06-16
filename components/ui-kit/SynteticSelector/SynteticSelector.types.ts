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
    price: string | number;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

type currencyObject = {
    name: string;
    icon: string;
    price: number;
};

type priceObject = {
    AVAX: string;
    BSC: string;
}

export type {
    priceObject,
    PropSelectTypes,
    PropOptionTypes,
    currencyObject,
};
