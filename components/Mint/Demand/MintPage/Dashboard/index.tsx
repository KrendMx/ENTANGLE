import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';
import type { IDashboardProps } from '@/components/HomePage/Dashboard/Dashboard.interfaces';
import ITEMS from './Dashboard.consts';

type DasboardCardType = {
    chainId?: string;
} & IDashboardProps;

const DashboardCards: React.FC<DasboardCardType> = ({
    filter = '',
    query = '',
}) => {
    const newItems = filter !== ''
        ? ITEMS.sort((item) => (item.filter === Number(filter) ? -1 : 1))
        : ITEMS;
    return (
        <div className={styles.wrapper}>
            {newItems.map((i, key) => {
                let isFiltered = false;
                if (query !== '') {
                    isFiltered = isFiltered
                        || !i.query
                            .join('/')
                            .toLowerCase()
                            .includes(query.toLowerCase().trim());
                }
                return i.element(isFiltered, key);
            })}
        </div>
    );
};

export default DashboardCards;
