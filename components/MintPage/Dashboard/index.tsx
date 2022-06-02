import React, { useState, useEffect } from 'react';
// import type { ChainIdType } from '../../../Redux/types';
// import {
//     useAppDispatch,
//     useAppSelector,
// } from '../../../Redux/store/hooks/redux';
// import userSlice from '../../../Redux/store/reducers/UserSlice';
import type { MintDashboardItemCardType } from '../types';
import styles from './style.module.css';
import type { IDashboardProps } from '@/components/HomePage/Dashboard/Dashboard.interfaces';
import ITEMS from './Dashboard.consts';

// type DasboardCardType = {
//     chainId: ChainIdType
// }

const DashboardCards: React.FC<IDashboardProps> = ({
    filter = '',
    query = '',
}) => {
    // const { account } = useAppSelector((state) => state.walletReducer);
    // const { txLoading } = useAppSelector((state) => state.userReducer);
    // // const { changeLoadingTx } = userSlice.action;
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     console.log(userSlice);
    // }, []);

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
