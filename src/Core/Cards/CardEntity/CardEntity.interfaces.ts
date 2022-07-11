import type { availableChains, availableNames } from 'utils/Global/Types';

type CardData = {
    apr: string | null,
    currentDeposits: string | null,
    totalDeposits: string | null,
    available: string | null,
    totalAvailable: string | null,
    price: string | null,
    yieldTime: string | null,
    positions: string | null,
    totalPositions: string | null,
    localName: availableNames,
    localChain: availableChains,
}

type CardDataState = {
    data: {
        [key: string]: CardData
    }
}

export type {
    CardData,
    CardDataState,
};
