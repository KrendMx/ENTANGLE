import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { networks } from '../../../src/utils/GlobalConst';
import type { IState } from '../index';
import styles from './style.module.css';

const InvestCardFantom: React.FC<IState> = ({ price, positions }) => {
    const isLoss = true;
    const isUp = false;

    return (
        <div className={styles.root}>
            <div className={styles.logoWrapper}>
                <img
                    src={`./images/networks/${networks['250'].icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <p className={styles.pare}>{networks['250'].currencyMin}</p>
                <p className={styles.undertitle}>
                    Generates yield by running an autocompound UST/USDC strategy
                    on sunny.ag
                </p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Your Position</p>
                    <p className={styles.itemValue}>{positions}</p>
                    <p className={styles.undertitle}>
                        {networks['250'].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Price</p>
                    <p className={styles.itemValue}>{price}</p>
                    <p className={styles.undertitle}>
                        {networks['250'].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Avg Buy Price</p>
                    <p className={styles.itemValue}>$1</p>
                    <p className={styles.undertitle}>
                        {networks['250'].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Profit</p>
                    <p className={styles.itemValue}>$96.589</p>
                    <p
                        className={classNames(
                            styles.undertitle,
                            { [styles.loss]: isLoss },
                            { [styles.up]: isUp }
                        )}
                    >
                        +35%
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default InvestCardFantom;
