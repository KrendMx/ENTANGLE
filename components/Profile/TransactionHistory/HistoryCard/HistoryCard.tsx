import React from 'react';
import moment from 'moment/moment';
import classNames from 'classnames';
import styles from './style.module.css';
import { networks } from '../../../../src/utils/GlobalConst';

type CardProps = {
    chainId: keyof typeof networks;
    date: Date;
    price: number;
};
const HistoryCard: React.FC<CardProps> = ({ chainId, date, price }) => {
    const transactionDateMoment = moment(date);
    let priceSign = '';
    if (price > 0) {
        priceSign = '+';
    } else if (price < 0) {
        priceSign = '-';
    }
    return (
        <div className={styles.root}>
            <div className={styles.logoWrapper}>
                <img
                    src={`./images/networks/${networks[chainId].icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <p className={styles.pare}>{networks[chainId].currencyMin}</p>
                <p className={styles.undertitle}>
                    Generates yield by running an autocompound UST/USDC strategy
                    on sunny.ag
                </p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Date/Time</p>
                    <p className={styles.itemValue}>
                        {transactionDateMoment.format('Do MMMM YYYY')}
                    </p>
                    <p className={styles.undertitle}>
                        {transactionDateMoment.format('hh:mm')}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Price</p>
                    <p
                        className={classNames(styles.itemValue, {
                            [styles.buy]: priceSign === '+',
                            [styles.sell]: priceSign === '-',
                        })}
                    >
                        {priceSign}
                        $
                        {Math.abs(price).toFixed(9)}
                    </p>
                    <p className={styles.undertitle}>
                        {networks['250'].currency}
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default HistoryCard;
