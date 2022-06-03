import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import { changeActiveCard } from '@/src/Redux/store/reducers/AppSlice';
import ActionPanel from '../HomePage/ActionPanel';

import DashboardCards from './Dashboard';
import styles from './style.module.css';
import Sidebar from '../MintSidebar';

const MintPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();

    const closeSidebar = () => {
        dispatch(changeActiveCard(null));
    };

    return (
        <div className={styles.wrapper}>
            <Sidebar hanldeClose={closeSidebar} />
            <div onClick={() => { closeSidebar(); }}>
                <ActionPanel
                    search={search}
                    filter={filter}
                    setFilter={setFilter}
                    setSearch={setSearch}
                />
            </div>
            <DashboardCards filter={filter} query={search} handleClose={closeSidebar} />
        </div>
    );
};
export default MintPage;
