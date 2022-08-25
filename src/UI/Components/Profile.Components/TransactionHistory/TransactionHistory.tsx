import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Typography from 'UI/ui-kit/Typography';
import type {
    availableChains,
    TransactionHistoryEntity,
} from 'utils/Global/Types';
import { useStore } from 'core/store';
import Pager from './Pager/Pager';
import styles from './style.module.css';
import HistoryCard from './HistoryCard/HistoryCard';
import { TransactionFilters } from './TransactionHistory.constants';
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
    const updatePageFilters = () => {
        let transactionPrepared = [...transactions];
        if (TransactionFilters[filter]) {
            transactionPrepared = transactionPrepared.filter(
                TransactionFilters[filter],
            );
        }
        setTransactionsPrepared(transactionPrepared);
    };

    useEffect(() => {
        updatePageFilters();
    }, [filter, transactions]);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageLimit, setPageLimit] = useState<number>(10);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageLimit]);

    const handleChangeFilter = (value: keyof typeof TransactionFilters) =>
        setFilter(value);

    const { t } = useTranslation('profile');

    return (
        <>
            <div className={styles.panel}>
                <Typography type="title">{t('transactionHistory')}</Typography>
            </div>
            {!txLoaded ? (
                loader
            ) : (
                <div>
                    <div>
                        <div className={styles.historyWrapper}>
                            <div className={styles.actions}>
                                {Object.keys(TransactionFilters).map(
                                    (el, index) => (
                                        <p
                                            key={index}
                                            className={classNames(
                                                styles.action,
                                                {
                                                    [styles.activeAction]:
                                                        el === filter,
                                                },
                                            )}
                                            onClick={() => {
                                                handleChangeFilter(
                                                    el as keyof typeof TransactionFilters,
                                                );
                                            }}
                                        >
                                            {t(el)}
                                        </p>
                                    ),
                                )}
                            </div>
                            <div>
                                {transactionsPrepared
                                    .slice(
                                        (currentPage - 1) * pageLimit,
                                        currentPage * pageLimit,
                                    )
                                    .map((i, k) => (
                                        <div
                                            key={k}
                                            style={{
                                                borderTop:
                                                    k === 0
                                                        ? '1px solid gray'
                                                        : '',
                                            }}
                                        >
                                            <HistoryCard
                                                chainId={
                                                    String(
                                                        i.crypto,
                                                    ) as availableChains
                                                }
                                                date={new Date(i.time)}
                                                price={
                                                    (i.type === 'sell'
                                                        ? -1
                                                        : +1) * Number(i.amount)
                                                }
                                                id={i.id}
                                            />
                                        </div>
                                    ))}
                                {transactionsPrepared.length === 0 && (
                                    <div
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minHeight: '300px',
                                        }}
                                    >
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
                                                width={104}
                                                height={90}
                                            />
                                        </div>
                                        <h2
                                            style={{
                                                textAlign: 'center',
                                                fontSize: '22px',
                                                fontWeight: '400',
                                                color: '#A3A3A3',
                                            }}
                                        >
                                            {t('nowTransaction')}
                                        </h2>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'flex-end',
                                margin: '10px 0 40px',
                            }}
                        >
                            <div style={{ width: 'auto' }}>
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
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionHistory;
