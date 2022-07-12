import type { CardDataState } from 'core/Cards/CardEntity/CardEntity.interfaces';

const initialCardState: CardDataState = {
    data: {
        '43114': {
            apr: null,
            currentDeposits: null,
            totalDeposits: null,
            available: null,
            totalAvailable: null,
            price: null,
            yieldTime: null,
            positions: null,
            totalPositions: null,
            localName: 'AVAX',
            localChain: '43114',
        },
        '56': {
            apr: null,
            currentDeposits: null,
            totalDeposits: null,
            available: null,
            totalAvailable: null,
            price: null,
            yieldTime: null,
            positions: null,
            totalPositions: null,
            localName: 'BSC',
            localChain: '56',
        },
        '250': {
            apr: null,
            currentDeposits: null,
            totalDeposits: null,
            available: null,
            totalAvailable: null,
            price: null,
            yieldTime: null,
            positions: null,
            totalPositions: null,
            localName: 'FTM',
            localChain: '250',
        },
        '1': {
            apr: null,
            currentDeposits: null,
            totalDeposits: null,
            available: null,
            totalAvailable: null,
            price: null,
            yieldTime: null,
            positions: null,
            totalPositions: null,
            localName: 'ETH',
            localChain: '1',
        },
    },
};

export {
    initialCardState,
};