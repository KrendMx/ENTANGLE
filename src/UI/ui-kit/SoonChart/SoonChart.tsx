import React from 'react';
import Image from 'next/image';

import styles from './style.module.css';

const SoonChart: React.FC = () => (
    <div>
        <div className={styles.wrapper}>
            <div className={styles.imgWrapper}>
                <Image width={100} height={50} quality={100} src="/images/soonChart.svg" alt="" />
            </div>
        </div>
    </div>
);

export default SoonChart;
