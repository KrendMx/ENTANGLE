import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import { changeActiveCard } from '@/src/Redux/store/reducers/AppSlice';
import ActionPanel from '../HomePage/ActionPanel';
import SidebarRow from '../MintSidebar';
import DashboardCards from './Dashboard';
import styles from './style.module.css';

const MintPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();

    const sliderReference = useRef();
    useEffect(() => {
        const handleClick = (e: MouseEvent) => e.target !== sliderReference.current && dispatch(changeActiveCard(null));

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className={styles.wrapper}>
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
