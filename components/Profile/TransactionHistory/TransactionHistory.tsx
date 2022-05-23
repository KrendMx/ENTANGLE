import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Typography from '@/ui-kit/Typography';
import Select, { Option } from '@/ui-kit/Select';
import Pager from './Pager/Pager';
import styles from './style.module.css';
import type {
    iService,
    TransactionHistoryEntity,
} from '@/src/context/ServiceContext/ServiceContext.interfaces';
import { ServiceContext } from '@/src/context/ServiceContext/ServiceContext';
import HistoryCard from './HistoryCard/HistoryCard';
import type { networks } from '@/src/utils/GlobalConst';
import {
    TransactionFilters,
    TransactionOrder,
} from './TransactionHistory.constants';
import { loader } from '../Profile.constant';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';

const TransactionHistory: React.FC = () => {
    const service = useContext<iService>(ServiceContext);
    const [transactions, setTransactions] = useState<
        TransactionHistoryEntity[]
    >([]);
    const [transactionsPrepared, setTransactionsPrepared] = useState<
        TransactionHistoryEntity[]
    >([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { account } = useAppSelector((state) => state.walletReducer);
    const updateHistory = () => {
        if (!account) return;
        service
            .getTransactionHistory(account)
            .then(setTransactions)
            .then(() => setIsLoaded(true));
    };
    const updateData = () => {
        updateHistory();
    };

    useEffect(() => {
        updateData();
    }, [account]);

    useEffect(() => {
        updateData();
    }, []);

    const [filter, setFilter] = useState<keyof typeof TransactionFilters>(
        Object.keys(TransactionFilters)[0] as keyof typeof TransactionFilters,
    );
    const [order, setOrder] = useState<keyof typeof TransactionOrder>(
        Object.keys(TransactionOrder)[0] as keyof typeof TransactionOrder,
    );

    const updatePageFilters = () => {
        let transactionPrepared = [...transactions];
        if (TransactionFilters[filter]) {
            transactionPrepared = transactionPrepared.filter(
                TransactionFilters[filter],
            );
        }
        if (TransactionOrder[order]) {
            transactionPrepared = transactionPrepared.sort(
                TransactionOrder[order],
            );
        }
        setTransactionsPrepared(transactionPrepared);
    };

    useEffect(() => {
        updatePageFilters();
    }, [filter, order, transactions]);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageLimit, setPageLimit] = useState<number>(10);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageLimit]);

    const handleChangeFilter = (value: keyof typeof TransactionFilters) =>
        setFilter(value);
    const handleChangeOrder = (value: keyof typeof TransactionOrder) =>
        setOrder(value);

    return (
        <>
            <div className={styles.panel}>
                <Typography type="title">Transaction history</Typography>
                <div className={styles.selects}>
                    <div className={styles.selectWrapper}>
                        <Select value={filter} onChange={handleChangeFilter}>
                            {Object.keys(TransactionFilters).map((i) => (
                                <Option key={i} value={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.selectWrapper}>
                        <Select value={order} onChange={handleChangeOrder}>
                            {Object.keys(TransactionOrder).map((i) => (
                                <Option key={i} value={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
            {!isLoaded ? (
                loader
            ) : (
                <div>
                    <div>
                        {transactionsPrepared.length === 0 && (
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontSize: '3rem',
                                    margin: '100px 0',
                                }}
                            >
                                You have no transactions
                            </h2>
                        )}
                        {transactionsPrepared
                            .slice(
                                (currentPage - 1) * pageLimit,
                                currentPage * pageLimit,
                            )
                            .map((i, k) => (
                                <HistoryCard
                                    key={k}
                                    chainId={
                                        String(
                                            i.crypto,
                                        ) as keyof typeof networks
                                    }
                                    date={new Date(i.time)}
                                    price={
                                        (i.type === 'sell' ? -1 : +1)
                                        * Number(i.amount)
                                    }
                                />
                            ))}
                    </div>
                    <div
                        className={classNames(
                            styles.flex,
                            styles.itemsCenter,
                            styles.my1,
                        )}
                    >
                        <div>
                            <Pager
                                selectedPage={currentPage}
                                pageCount={Math.max(
                                    Math.ceil(
                                        transactionsPrepared.length / pageLimit,
                                    ),
                                    1,
                                )}
                                onPageChange={(n) => {
                                    setCurrentPage(n);
                                }}
                            />
                        </div>
                        <div
                            className={classNames(
                                styles.flex,
                                styles.itemsCenter,
                                styles.gap,
                                styles.mlAuto,
                            )}
                        >
                            <div>Display by</div>
                            <div
                                onClick={() => {
                                    setPageLimit(10);
                                }}
                                className={classNames(styles.block, {
                                    [styles.selected]: pageLimit === 10,
                                })}
                            >
                                <div>10</div>
                            </div>
                            <div
                                onClick={() => {
                                    setPageLimit(20);
                                }}
                                className={classNames(styles.block, {
                                    [styles.selected]: pageLimit === 20,
                                })}
                            >
                                <div>20</div>
                            </div>
                            <div
                                onClick={() => {
                                    setPageLimit(50);
                                }}
                                className={classNames(styles.block, {
                                    [styles.selected]: pageLimit === 50,
                                })}
                            >
                                <div>50</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionHistory;
