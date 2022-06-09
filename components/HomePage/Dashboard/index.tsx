import React, { useEffect } from 'react';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import type { sortingCard } from '@/src/Redux/store/interfaces/App.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({ filter = '', query = '', sort = '' }) => {
    const { sortingObject } = useAppSelector((state) => state.appReducer);

    function sortingCard() {
        return Object.values(sortingObject).sort((elA, elB) => (elA[sort] < elB[sort] ? 1 : -1));
    }

    function sortAndFilter() {
        let arr = [];
        arr = ITEMS;
        if (sort !== '') {
            arr = sortingCard().map((el:sortingCard) => ITEMS.filter((e) => e.name === el.name)[0]);
        }
        if (filter !== '') arr.sort((item) => (item.filter === Number(filter) ? -1 : 1));
        return arr;
    }

    const newItems = sortAndFilter();

    useEffect(() => { console.log(sortingObject); });
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

export default Dashboard;
