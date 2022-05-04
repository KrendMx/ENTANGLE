import type { TransactionHistoryEntity } from '../../../context/ServiceContext/ServiceContext.interfaces';

const TransactionFilters = {
    'All activity': (i: TransactionHistoryEntity) => true,
    'Buy': (i: TransactionHistoryEntity) => (i.type === 'buy'),
    'Sell': (i: TransactionHistoryEntity) => (i.type === 'sell'),
};

const TransactionOrder = {
    'Recent last': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (b.time - a.time),
    'Recent first': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (a.time - b.time),
};
export { TransactionFilters, TransactionOrder };
