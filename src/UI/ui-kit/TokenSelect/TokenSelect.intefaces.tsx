import type React from 'react';

interface TokenSelectProps {
    value: string | undefined;
    children: React.ReactNode[];
    currency?: string;
    title?: string;
    onChange: (value: string) => void;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customOptionClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    disabled?:boolean;
    showHashImage?:boolean;
    defaultLabel: string;
    withBalance?: boolean;
    showPayModal?: boolean;
    selectedTitle?:string;
    customSelectedLabel?: string;
    showImage?: boolean;
}

interface TokenOptionProps {
    key: number;
    value: string;
    children: string;
    currency?: string;
    extraSymbol?: JSX.Element;
    state?: string;
    amount?: string;
    name?:string;
    isImage?: boolean;
    isHashImage?: boolean;
    hashImage?: string;
}

export type {
    TokenSelectProps,
    TokenOptionProps,
};
