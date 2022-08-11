import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type IValidatorBar = {
    title: string;
    date: string;
    delegated: string;
};

const ValidatorBar: React.FC<IValidatorBar> = ({ title, date, delegated }) => (
    <div className={styles.root}>
        <div className={styles.main}>
            <p className={styles.pare}>{title}</p>
        </div>
        <div className={styles.circleDel}>
            <div className={styles.circleText}>
                <p>Delegate</p>
            </div>
        </div>
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <p className={styles.undertitle}>Start time</p>
                <p className={styles.itemValue}>
                    {date}
                </p>
            </li>
        </ul>
        <ul className={styles.list}>
            <li className={styles.listItem}>
                <p className={styles.undertitle}>EN Delegated</p>
                <p
                    className={classNames(styles.itemValue)}
                >
                    {delegated}
                </p>
            </li>
        </ul>
    </div>
);

export default ValidatorBar;
