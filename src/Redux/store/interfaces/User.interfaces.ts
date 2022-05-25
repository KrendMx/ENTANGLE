import type { availableChains } from '../../../utils/GlobalConst';
import type { ProviderType } from '../../types';

interface payDataType {
    '43114': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '250': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '56': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
}

type payDataActionType = {
    key: availableChains;
    data: { available: string; totalAvailable: string; price: string };
};

type initStateType = {
    positionSumObj: Map<string, number>;
    profits: Map<string, { value: number; change: number }>;
    deposit: Map<string, number>;
    avgPrices: {
        '250': string | null;
        '43114': string | null;
    };
    txLoading: boolean;
    positionSum: string | number;
    payData: payDataType;
    isOpenModal: boolean;
};

type ImportTypes = {
    chainId: availableChains;
    provider: ProviderType;
};

type positionSumType = {
    n: number;
    key: availableChains;
};

type profitSumType = {
    n: number;
    change: number;
    key: string;
};

export type {
    payDataType,
    initStateType,
    ImportTypes,
    profitSumType,
    positionSumType,
    payDataActionType,
};
