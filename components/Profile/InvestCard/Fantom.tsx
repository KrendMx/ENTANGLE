import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { networks } from '../../../src/utils/GlobalConst';
import type { IState } from '../index';
import styles from './style.module.css';
import APIService from '../../../api';
import { ProviderContext } from '../../../context/ProviderContext';

const InvestCardFantom: React.FC<IState> = ({ price, positions, avg }) => {
    const { setProfit: setProfitProvider, account } = useContext(ProviderContext);
    const [profit, setProfit] = useState<number>();
    const [profitChange, setProfitChange] = useState<number>();
    const isLoss = true;
    const isUp = false;

    useEffect(() => {
        (async function () {
            if (account) {
                const data = await APIService.getProfit(account, 8);
                setProfit(data.stable);
                setProfitChange(data.percentage);
                setProfitProvider(data.stable, data.percentage, '250');
            }
        }());
    }, []);

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
                    <p className={styles.itemValue}>
                        $
                        {avg?.toFixed(2)}
                    </p>
                    <p className={styles.undertitle}>
                        {networks['250'].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Profit</p>
                    <p className={styles.itemValue}>
                        $
                        {profit}
                    </p>
                    <p
                        className={classNames(
                            styles.undertitle,
                            { [styles.loss]: profitChange! < 0 },
                            { [styles.up]: profitChange! > 0 },
                        )}
                    >
                        {profitChange! > 0
                            ? `+${profitChange}`
                            : `${profitChange}`}
                        %
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default InvestCardFantom;
