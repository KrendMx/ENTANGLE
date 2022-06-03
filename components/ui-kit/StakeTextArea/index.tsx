import React from 'react';
import styles from './style.module.css';

type IStakeTextArea = {
    title: string;
    children: string;
    extraText?: string;
}

const StakeTextArea: React.FC<IStakeTextArea> = ({ title, children, extraText }) => (
    <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        <div className={styles.extraBlock}>
            <h3 className={styles.content}>{children}</h3>
            {extraText && <p className={styles.extraText}>{extraText}</p>}
        </div>
    </div>
);

export default StakeTextArea;
