import React, { useState } from 'react';
import { useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { changeActiveCard } from '@/src/Redux/store/reducers/AppSlice';
import ActionPanel from '../../../HomePage/ActionPanel';

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
            <Sidebar handleClose={closeSidebar} />
            <div>
                <ActionPanel
                    search={search}
                    filter={filter}
                    setFilter={setFilter}
                    setSearch={setSearch}
                />
            </div>
            <DashboardCards filter={filter} query={search} />
        </div>
    );
};
export default MintPage;
