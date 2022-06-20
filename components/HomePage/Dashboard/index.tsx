import React from 'react';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import type { sortingCard } from '@/src/Redux/store/interfaces/App.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({
    filter = '',
    query = '',
    sort = '',
}) => {
    const { sortingObject } = useAppSelector((state) => state.appReducer);

    function deskDetect() {
        return sort.includes('desk') ? -1 : 1;
    }

    function sortingCard() {
        const arr = Object.values(sortingObject);
        return arr.sort(
            (a, b) =>
                (a[sort.split(' ')[0]] < b[sort.split(' ')[0]] ? 1 : -1)
                * deskDetect(),
        );
    }

    function sortAndFilter() {
        let arr = ITEMS;
        if (sort !== '') {
            arr = sortingCard().map(
                (el: sortingCard) =>
                    ITEMS.filter((e) => e.filter === Number(el.chainId))[0],
            );
        }
        if (filter !== '') {
            arr.sort((item) => (item.filter === Number(filter) ? -1 : 1));
        }
        return arr;
    }

    return (
        <div className={styles.wrapper}>
            {sortAndFilter().map((i, key) => {
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

export default Dashboard;
