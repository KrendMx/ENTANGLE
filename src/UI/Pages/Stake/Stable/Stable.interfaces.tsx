import type { availableChains } from '@/src/utils/GlobalConst';

interface IAssetItem {
    title: string;
    apr: number;
    volume: number;
    availableNetworks: string[];
}

export type {
    IAssetItem,
};
