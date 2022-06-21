interface TokenSelectProps {
    value: string | undefined;
    children: React.ReactNode[];
    title?: string;
    onChange: (value: string) => void;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customOptionClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    disabled?:boolean;
    defaultLabel: string;
    withBalance?: boolean;
}

interface TokenOptionProps {
    key: number;
    value: string;
    children: string;
    extraSymbol?: JSX.Element;
    state?: string;
    amount?: string;
}

export type {
    TokenSelectProps,
    TokenOptionProps,
}