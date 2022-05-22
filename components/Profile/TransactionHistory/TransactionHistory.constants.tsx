import type { TransactionHistoryEntity } from '../../../src/context/ServiceContext/ServiceContext.interfaces';

const TransactionFilters = {
    'All activity': (i: TransactionHistoryEntity) => true,
    'Buy': (i: TransactionHistoryEntity) => (i.type === 'buy'),
    'Sell': (i: TransactionHistoryEntity) => (i.type === 'sell'),
};

const TransactionOrder = {
    'Recent last': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (b.time - a.time),
    'Recent first': (a: TransactionHistoryEntity, b: TransactionHistoryEntity) => (a.time - b.time),
};
const loader = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '100px 0',
            fontSize: '3rem',
        }}
    >
        <i className="fa fa-spinner fa-spin" />
    </div>
);

export { TransactionFilters, TransactionOrder, loader };
