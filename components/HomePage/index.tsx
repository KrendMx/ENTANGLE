import React, { useState } from 'react';
import styles from './style.module.css';
import ActionPanel from './ActionPanel';
import Dashboard from './Dashboard';
import SummaryInfoBoard from './SummaryInfoBoard/SummaryInfoBoard';

const HomePage = () => {
    const [filter, setFilter] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>('');

    return (
        <div className={styles.wrapper}>
            <ActionPanel
                filter={filter}
                search={search}
                setFilter={setFilter}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
            />
            <Dashboard filter={filter} query={search} sort={sort} />
            <SummaryInfoBoard />
        </div>
    );
};

export default HomePage;
