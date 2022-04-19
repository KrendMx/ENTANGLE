import React from 'react';
import styles from './style.module.css';
import AvalancheContainer from './DashboardItem/containers/AvalancheContainer';
import FantomContainer from './DashboardItem/containers/FantomContainer';
import SolanaContainer from './DashboardItem/containers/SolanaContainer';
import USDContainer from './DashboardItem/containers/USDContainer';
import BUSDContainer from './DashboardItem/containers/BUSDContainer';
import ETHContainer from './DashboardItem/containers/ETHContainer';

const Dashboard = () => (
    <div className={styles.wrapper}>
        <FantomContainer />
        <AvalancheContainer />
        <ETHContainer />
        <SolanaContainer />
        <USDContainer />
        <BUSDContainer />
    </div>
);

export default React.memo(Dashboard);
