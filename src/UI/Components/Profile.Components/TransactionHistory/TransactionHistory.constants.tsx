import type { TransactionHistoryEntity } from 'utils/Global/Types';

const TransactionFilters = {
    'allActivity': (i: TransactionHistoryEntity) => true,
    'buy': (i: TransactionHistoryEntity) => (i.type === 'buy'),
    'sell': (i: TransactionHistoryEntity) => (i.type === 'sell'),
};

const TransactionOrder = {
    'recentLast': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (b.time - a.time),
    'recentFirst': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (a.time - b.time),
};

export { TransactionFilters, TransactionOrder };
