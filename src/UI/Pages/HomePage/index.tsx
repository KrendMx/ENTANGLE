import React, { useState } from 'react';
import ActionPanel from 'UI/Components/Home.Components/ActionPanel';
import Dashboard from 'UI/Components/Home.Components/Dashboard';
import SummaryInfoBoard from 'UI/Components/Home.Components/SummaryInfoBoard/SummaryInfoBoard';
import styles from './style.module.css';

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
            <SummaryInfoBoard />
            <Dashboard filter={filter} query={search} sort={sort} />
        </div>
    );
};

export default HomePage;
