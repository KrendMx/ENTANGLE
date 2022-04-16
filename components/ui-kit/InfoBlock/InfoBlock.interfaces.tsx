import type React from 'react';
import type {InfoBlockTypes} from './InfoBlock.constants';

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
};

export type {InfoBlockProps, InfoBlockBalanceOptions};
