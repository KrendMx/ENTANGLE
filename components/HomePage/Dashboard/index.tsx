import React from 'react';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({ filter = '', query = '' }) => (
    <div className={styles.wrapper}>
        {ITEMS.map((i, key) => {
            let isFiltered = false;
            if (filter !== '') {
                isFiltered = !i.filter.includes(Number(filter));
            }
            if (query !== '') {
                isFiltered = isFiltered || !i.query.join('/').toLowerCase().includes(query.toLowerCase().trim());
            }
            return i.element(isFiltered, key);
        })}
    </div>
);

export default Dashboard;
