import type React from 'react';

type SelectProps = {
    value: string | undefined;
    children: React.ReactNode[];
    onChange: (HTMLElement) => void;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customOptionClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    disabled?:boolean;
};

type OptionProps = {
    value: string;
    children: string;
    extraSymbol?: JSX.Element;
    state?: string;
};

export type {
    SelectProps,
    OptionProps,
};
