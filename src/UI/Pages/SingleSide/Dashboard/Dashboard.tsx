import React from 'react';
import type { IDashboardSASSProps } from './Dashboard.interfaces';
import { Containers } from './DashboardItem/Dashboard.constant';
import styles from './style.module.css';

export const Dashboard: React.FC<IDashboardSASSProps> = ({
    search,
    timeStatus,
    network,
}) => {
    const detectDuration = (x: number): boolean =>
        x === Number(timeStatus) || !timeStatus;

    const detectSearch = (x: string[]): boolean =>
        x.join(' ').includes(search) || !search;

    return (
        <div className={styles.wrapper}>
            {Containers.map(
                (el) =>
                    detectDuration(el.term)
                    && detectSearch(el.name)
                    && el.component,
            )}
        </div>
    );
};
