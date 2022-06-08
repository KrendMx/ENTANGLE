import React from 'react';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({ filter = '', query = '', sort = '' }) => {
    function sortAndFilter() {
        console.log(sort);
        let arr = [];
        arr = ITEMS;
        if (filter !== '') arr.sort((item) => (item.filter === Number(filter) ? -1 : 1));
        if (sort !== '') {
            if (sort.includes('desk')) {
                console.log(sort.split(' ')[0]);
                arr.sort((itemA, itemB) => (itemA[sort.split(' ')[0]] < itemB[sort.split(' ')[0]] ? 1 : -1));
            } else {
                arr.sort((itemA, itemB) => (itemA[sort.split(' ')[0]] < itemB[sort.split(' ')[0]] ? -1 : 1));
            }
        }
        return arr;
    }

    const newItems = sortAndFilter();
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
