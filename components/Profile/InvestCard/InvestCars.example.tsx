import React, { useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { networks } from '@/src/utils/GlobalConst';

import styles from './style.module.css';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import type { availableChains } from '@/src/utils/GlobalConst';
import { setProfit } from '@/src/Redux/store/reducers/UserSlice';
import QueryRequests from '@/src/GraphService/queryRequests';
import Loader from '@/ui-kit/Loader';

interface IState {
    chainId: availableChains;
    description: string;
    positions: number;
    price: number;
}

const InvestCardExp: React.FC<IState> = ({
    positions,
    price,
    chainId,
    description,
}) => {
    const dispatch = useAppDispatch();
    const {
        profits, avgPrices, txHistory, txLoading,
    } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        (async function GetProfit() {
            if (txHistory.length) {
                const { percentage, stable } = await QueryRequests.calculateProfit(txHistory, price, chainId);
                console.log(percentage);
                console.log(stable);
                dispatch(setProfit({ n: stable, change: percentage, key: chainId }));
            }
        }());
    }, [txHistory, txLoading]);

    return (
        <div className={styles.root}>
            <div className={styles.logoWrapper}>
                <Image
                    width={100}
                    height={100}
                    quality={100}
                    src={`/images/networks/${networks[chainId].icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <p className={styles.pare}>{networks[chainId].currencyMin}</p>
                <p className={styles.undertitle}>{description}</p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Your Position</p>
                    <p className={styles.itemValue}>{Number(positions.toFixed(2))}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Price</p>
                    <p className={styles.itemValue}>{Number(price.toFixed(6))}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currencyMin}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Avg Buy Price</p>
                    {avgPrices[chainId] ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {avgPrices[chainId]}
                            </p>
                            <p className={styles.undertitle}>
                                {networks[chainId].currency}
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <Loader />
                        </p>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Profit</p>
                    {profits.get(chainId)?.value ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {profits.get(chainId)?.value}
                            </p>
                            <p
                                className={classNames(
                                    styles.undertitle,
                                    {
                                        [styles.loss]:
                                            profits.get(chainId)?.change! < 0,
                                    },
                                    {
                                        [styles.up]:
                                            profits.get(chainId)?.change! > 0,
                                    },
                                )}
                            >
                                {profits.get(chainId)?.change! > 0
                                    ? `+${profits.get(chainId)?.change}`
                                    : `${profits.get(chainId)?.change}`}
                                %
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <Loader />
                        </p>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default InvestCardExp;
