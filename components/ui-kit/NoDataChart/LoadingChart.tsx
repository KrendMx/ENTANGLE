import React from 'react';

import styles from './style.module.css';

const LoadingChart: React.FC = () => <div>
    <div className={styles.wrapper}>
        <div className={styles.imgWrapper}>
            <img src="./images/noDataChart.svg" alt=""/>
        </div>
    </div>
</div>

export default LoadingChart;
