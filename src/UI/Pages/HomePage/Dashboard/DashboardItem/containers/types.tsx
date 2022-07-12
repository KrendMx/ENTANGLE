import type { availableChains } from '../../../../../src/utils/GlobalConst';

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
    localName: 'FTM' | 'AVAX' | 'BSC' | 'ETH';
}