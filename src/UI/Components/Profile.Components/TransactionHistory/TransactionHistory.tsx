import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Typography from 'UI/ui-kit/Typography';
import Select, { Option } from 'UI/ui-kit/Select';
import type {
    availableChains,
    TransactionHistoryEntity,
} from 'utils/Global/Types';
import type { networks } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import Pager from './Pager/Pager';
import styles from './style.module.css';
import HistoryCard from './HistoryCard/HistoryCard';
import {
    TransactionFilters,
    TransactionOrder,
} from './TransactionHistory.constants';
import { loader } from '../../../Pages/Profile/Profile.constant';

const TransactionHistory: React.FC = () => {
    const { store } = useStore((store) => ({
        UserEntity: store.UserEntity,
    }));
    const { txLoaded, txHistory: transactions } = store.UserEntity;
    const [transactionsPrepared, setTransactionsPrepared] = useState<
        TransactionHistoryEntity[]
    >([]);

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

    const { t } = useTranslation('profile');

    return (
        <>
            <div className={styles.panel}>
                <Typography type="title">{t('transactionHistory')}</Typography>
                <div className={styles.selects}>
                    <div className={styles.selectWrapper}>
                        <Select
                            value={filter}
                            isCenter
                            onChange={handleChangeFilter}
                        >
                            {Object.keys(TransactionFilters).map((i) => (
                                <Option key={i} value={i}>
                                    {t(i)}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.selectWrapper}>
                        <Select
                            value={order}
                            isCenter
                            onChange={handleChangeOrder}
                        >
                            {Object.keys(TransactionOrder).map((i) => (
                                <Option key={i} value={i}>
                                    {t(i)}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
            {!txLoaded ? (
                loader
            ) : (
                <div>
                    <div>
                        {transactionsPrepared.length === 0 && (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        src="/images/bar-graph.png"
                                        alt=""
                                        quality={100}
                                        width={221}
                                        height={190}
                                    />
                                </div>
                                <h2
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '22px',
                                        fontWeight: '400',
                                        color: '#A3A3A3',
                                        margin: '0 0 50px',
                                    }}
                                >
                                    {t('nowTransaction')}
                                </h2>
                            </>
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
                                        String(i.crypto) as availableChains
                                    }
                                    date={new Date(i.time)}
                                    price={
                                        (i.type === 'sell' ? -1 : +1)
                                        * Number(i.amount)
                                    }
                                    id={i.id}
                                />
                            ))}
                    </div>
                    {transactionsPrepared.length > 0 && (
                        <div
                            className={classNames(
                                styles.flex,
                                styles.itemsCenter,
                                styles.my1,
                            )}
                        >
                            <div
                                className={classNames(
                                    styles.flex,
                                    styles.mxAuto,
                                )}
                            >
                                <Pager
                                    selectedPage={currentPage}
                                    pageCount={Math.max(
                                        Math.ceil(
                                            transactionsPrepared.length
                                                / pageLimit,
                                        ),
                                        1,
                                    )}
                                    onPageChange={(n) => {
                                        setCurrentPage(n);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default TransactionHistory;
