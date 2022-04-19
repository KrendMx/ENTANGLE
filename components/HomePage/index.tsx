import React from 'react';
import styles from './style.module.css';
import ActionPanel from './ActionPanel';
import Dashboard from './Dashboard';
import SummaryInfoBoard from './SummaryInfoBoard/SummaryInfoBoard';

const HomePage = () => (
    <div className={styles.wrapper}>
        <ActionPanel />
        <Dashboard />
        <SummaryInfoBoard />
    </div>
);

export default HomePage;
