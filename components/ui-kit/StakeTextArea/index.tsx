import React from 'react';
import styles from './style.module.css';

type IStakeTextArea = {
    title: string;
    children: string;
}

const StakeTextArea: React.FC<IStakeTextArea> = ({ title, children }) => (
    <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.content}>{children}</h3>
    </div>
);

export default StakeTextArea;
