type PropSelectTypes = {
    currenc: string;
    handleChange: (asset: string) => void;
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

export type {
    PropOptionTypes,
    PropSelectTypes,
    currencyObject,
}