import React, { useState } from 'react';
import ActionPanel from '../HomePage/ActionPanel';
import DashboardCards from './Dashboard';
import styles from './style.module.css';

const MintPage: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    return (
        <div className={styles.wrapper}>
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
