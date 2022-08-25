import type React from 'react';
import type { availableSingleSideChains } from 'src/utils/Global/Types';
import type { InfoBlockTypes } from './InfoBlock.constants';

type InfoBlockBalanceOptions = {
    changeValue: number,
    changePeriod?: string,
    image?: React.ReactElement,
}

type InfoBlockProps = {
    info: string;
    value: number | null;
    type: InfoBlockTypes;
    isShort?: boolean;
    options?: InfoBlockBalanceOptions;
    customWrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customTitleClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customValueClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    hintText?: string;
    isCurrencyLabel?: boolean;
    currencyProps?: {
        chainId: availableSingleSideChains;
        value: string;
    }
    customFilling?: boolean;
    children?: JSX.Element;
};

export type { InfoBlockProps, InfoBlockBalanceOptions };
