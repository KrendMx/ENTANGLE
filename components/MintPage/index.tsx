import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import {
    changeActiveCard,
} from '@/src/Redux/store/reducers/AppSlice';
import ActionPanel from '../HomePage/ActionPanel';
import SidebarRow from '../MintSidebar';
import DashboardCards from './Dashboard';
import styles from './style.module.css';

const MintPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();

    const sliderReference = useRef();
    const { activeCard } = useAppSelector((state) => state.appReducer);
    function closeSidebar(e: React.MouseEvent<HTMLElement>) {
        if (e.target !== sliderReference.current && activeCard)dispatch(changeActiveCard(null));
    }

    return (
        <div className={styles.wrapper} onClick={(e) => { closeSidebar(e); }}>
            <SidebarRow ref={sliderReference} />
            <ActionPanel
                search={search}
                filter={filter}
                setFilter={setFilter}
                setSearch={setSearch}
            />
            <DashboardCards filter={filter} query={search} />
        </div>
    );
};
export default MintPage;
