import React from 'react';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({ filter = '', query = '' }) => {
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

export default Dashboard;
