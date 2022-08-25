import type { availableChains, availableNames } from 'src/utils/Global/Types';

export type ContainerStateType = {
    apr: string | null;
    currentDeposits: string | null;
    totalDeposits: string | null;
    available: string | null;
    totalAvailable: string | null;
    price: string | null;
    positions: string | null;
    totalPositions: string | null;
    rowGradient: string;
    yieldTime: string | null;
    localChain: availableChains;
    localName: availableNames;
};
