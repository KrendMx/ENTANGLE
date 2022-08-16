import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';

export const Arrow = React.memo(() => (
    <div className={styles.arrow}>
        <Image
            src="/images/Arrow.svg"
            width={100}
            height={100}
            quality={100}
            alt="arrow-icon"
        />
    </div>
));
