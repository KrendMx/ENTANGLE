import React from 'react';
import { useStore } from 'core/store';
import type { CardData } from 'core/Cards/CardEntity/CardEntity.interfaces';
import styles from './style.module.css';
import ITEMS from './Dashboard.consts';
import type { IDashboardProps } from './Dashboard.interfaces';

const Dashboard: React.FC<IDashboardProps> = ({
    filter = '',
    query = '',
    sort = '',
}) => {
    const { store } = useStore((store) => ({
        CardEntity: store.CardsEntity,
    }));

    const { data } = store.CardEntity;

    const deskDetect = () => (sort.includes('desk') ? -1 : 1);

    function sortingCard() {
        const arr = Object.values(data);
        switch (sort.split(' ')[0]) {
        case 'apr':
            return arr.sort(
                (a, b) =>
                    ((Number(a[sort.split(' ')[0]]) < Number(b[sort.split(' ')[0]]) ? 1 : -1) * deskDetect()),
            );
        case 'available':
            return arr.map((el: CardData) => (el.available === 'Unlimited'
                ? { ...el, available: 100000000 }
                : { ...el, available: Number(el.available) })).sort(
                (a, b) =>
                    ((Number(a[sort.split(' ')[0]]) < Number(b[sort.split(' ')[0]]) ? 1 : -1) * deskDetect()),

            );
        default:
            return arr;
        }
    }

    function sortAndFilter() {
        let arr = ITEMS;
        if (sort !== '') {
            arr = sortingCard().map(
                (el: any) => ITEMS.filter((e) => e.filter === Number(el.localChain))[0],
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
