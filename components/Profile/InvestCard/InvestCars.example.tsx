import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { networks } from '../../../src/utils/GlobalConst';
import { ServiceContext } from '../../../src/context/ServiceContext/ServiceContext';

import styles from './style.module.css';
import { useAppSelector, useAppDispatch } from '../../../src/Redux/store/hooks/redux';
import type { availableChains } from '../../../src/utils/GlobalConst';
import { setPrices, setProfit } from '../../../src/Redux/store/reducers/UserSlice';

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
    const { account } = useAppSelector((state) => state.walletReducer);
    const { profits, avgPrices } = useAppSelector((state) => state.userReducer);
    const { getProfit, getAVGPrice } = useContext(ServiceContext);

    useEffect(() => {
        (async function GetAvg() {
            if (account) {
                const avgData = await getAVGPrice(account);
                dispatch(setPrices({
                    '250': avgData.fantomSynth.toFixed(3),
                    '43114': avgData.avaxSynth.toFixed(3),
                }));
                const data = await getProfit(account, networks[chainId].farm);
                dispatch(setProfit({ n: data.stable, change: data.percentage, key: chainId }));
            }
        }());
    }, []);

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
                    <p className={styles.itemValue}>{positions}</p>
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
