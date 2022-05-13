import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { networks } from '../../../src/utils/GlobalConst';
import { ServiceContext } from '../../../src/context/ServiceContext/ServiceContext';

import styles from './style.module.css';
import type { availableChains } from '../../../src/utils/GlobalConst';
import { ProviderContext } from '../../../src/context/ProviderContext';

interface IState {
    chainId: availableChains;
    description: string;
    positions: string;
    price: string;
    avg?: number;
}

const InvestCardExp: React.FC<IState> = ({
    positions,
    price,
    chainId,
    description,
}) => {
    const {
        setProfit: setProfitProvider,
        profits,
        account,
        setPrices,
        avgPrices,
    } = useContext(ProviderContext);
    const { getProfit, getAVGPrice } = useContext(ServiceContext);
    const isLoss = true;
    const isUp = false;

    useEffect(() => {
        (async function () {
            if (account) {
                const avgData = await getAVGPrice(account);
                setPrices({
                    '250': avgData.fantomSynth.toFixed(3),
                    '43114': avgData.avaxSynth.toFixed(3),
                });
                const data = await getProfit(account, networks[chainId].farm);
                setProfitProvider(data.stable, data.percentage, chainId);
            }
        }());
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.logoWrapper}>
                <img
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
                    <p className={styles.itemValue}>{positions}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Price</p>
                    <p className={styles.itemValue}>{price}</p>
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
                                fUSDT/USDC Synthetic LP
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <i className="fa fa-spinner fa-spin" />
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
                            <i className="fa fa-spinner fa-spin" />
                        </p>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default InvestCardExp;
