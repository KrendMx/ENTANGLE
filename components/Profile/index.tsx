import React, {
    useContext, useEffect, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { ChainConfig } from '@/src/ChainService/config';
import InvestCard from './InvestCard';
import Typography from '@/ui-kit/Typography';
import Select, { Option } from '@/ui-kit/Select';
import InfoBlock from '@/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from '@/ui-kit/InfoBlock/InfoBlock.constants';
import { ServiceContext } from '@/src/context/ServiceContext/ServiceContext';

import styles from './style.module.css';
import ProfileChart from './ProfileChart/ProfileChart';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import { networks } from '@/src/utils/GlobalConst';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import { getAverageBuyPrice } from '@/src/Redux/store/reducers/UserSlice';
import { SortArray, calculatePosPrice, loader } from './Profile.constant';
import type { IFilter } from './Profile.interfaces';

const Profile = () => {
    const { positionSum, profits } = useAppSelector(
        (state) => state.userReducer,
    );
    const dispatch = useAppDispatch();
    const { getProfit } = useContext(ServiceContext);
    const [balance, setBalance] = useState<number>(0);
    useEffect(() => {
        setBalance(Number(positionSum));
    }, [positionSum]);
    const [bestProfit, setBestProfit] = useState<{
        value: number;
        change: number;
        chain: keyof typeof networks;
    }>({ value: 0.0000001, change: 0, chain: '250' });
    const [worstProfit, setWorstProfit] = useState<{
        value: number;
        change: number;
        chain: keyof typeof networks;
    }>({ value: -0.0000001, change: 0, chain: '43114' });
    useEffect(() => {
        const data = Object.keys(networks).map((i) =>
            (profits.get(i)
                ? {
                    chain: i as keyof typeof networks,
                    ...profits.get(i),
                }
                : {
                    chain: i as keyof typeof networks,
                    value: 0,
                    change: 0,
                }));
        setBestProfit(data.reduce((l, e) => (e.value > l.value ? e : l)));
        setWorstProfit(data.reduce((l, e) => (e.value < l.value ? e : l)));
    }, [profits]);
    const [cryptoBalances, setCryptoBalances] = useState<{}>();
    const [cardLoaded, setCardLoaded] = useState<boolean>(false);
    const [change, setChange] = useState<number[]>([]);
    const { account } = useAppSelector((state) => state.walletReducer);
    const { txLoading } = useAppSelector((state) => state.userReducer);

    const [filter, setFilter] = React.useState<IFilter>('Sort by');

    const handleChangeFilter = (value: IFilter) => setFilter(value);

    useEffect(() => {
        (async function getAvg() {
            if (account) {
                dispatch(getAverageBuyPrice({ account }));
            }
        }());
    }, [account]);

    useEffect(() => {
        (async () => {
            if (account) {
                setCardLoaded(false);
                const balances: { [key: string]: { price: number, positions: number } } = {};
                const keys = Object.keys(ChainConfig);
                for (const key of keys) {
                    const Balance: { price: number, positions: number } = { price: 0, positions: 0 };
                    for (
                        let i = 0;
                        i < ChainConfig[key].SYNTH.length;
                        i++
                    ) {
                        const { positions, price } = await calculatePosPrice(account, key, i);
                        Balance.positions += Number(positions.toFixed(2));
                        Balance.price += price;
                    }
                    balances[key] = Balance;
                    setBalance((prev) => prev + Balance.price);
                }
                setCryptoBalances(balances);
                setCardLoaded(true);
            }
        })();
    }, [account, txLoading]);

    return (
        <div>
            <section className={styles.section}>
                <div className={styles.verticalWrapper}>
                    <div
                        className={classNames(
                            styles.horisontalWrapper,
                            styles.pt2,
                            styles.smCol,
                        )}
                    >
                        <ProfileChart />
                        <div
                            className={classNames(
                                styles.verticalWrapper,
                                styles.flex1,
                                styles.smCol,
                                styles.smRow,
                            )}
                        >
                            <div
                                className={classNames(
                                    styles.flex1,
                                    styles.flex,
                                )}
                            >
                                <InfoBlock
                                    info="Current balance"
                                    value={balance}
                                    type={InfoBlockTypes.BALANCE}
                                    options={{ changeValue: change[1] || 0 }}
                                />
                            </div>
                            <div
                                className={classNames(
                                    styles.smFlex1,
                                    styles.smFlex,
                                )}
                            >
                                <InfoBlock
                                    info="All time profit"
                                    value={change[0] || 0}
                                    options={{ changeValue: change[1] || 0 }}
                                    type={InfoBlockTypes.PERCENTAGE_MIXED}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.horisontalWrapper}>
                        <div className={styles.flex1}>
                            <InfoBlock
                                info="Best performer"
                                value={bestProfit.change}
                                options={{
                                    changeValue: bestProfit.value,
                                    image: (
                                        <Image
                                            width={30}
                                            height={30}
                                            quality={100}
                                            src={
                                                networks[bestProfit.chain]
                                                    .mainIcon
                                            }
                                            alt="best coin@"
                                        />
                                    ),
                                }}
                                type={InfoBlockTypes.PERCENTAGE_MIXED}
                            />
                        </div>
                        <div className={styles.flex1}>
                            <InfoBlock
                                info="Worst permormer"
                                value={worstProfit.change}
                                options={{
                                    changeValue: worstProfit.value,
                                    image: (
                                        <Image
                                            width={30}
                                            height={30}
                                            quality={100}
                                            src={
                                                networks[bestProfit.chain]
                                                    .mainIcon
                                            }
                                            alt="worst coin"
                                        />
                                    ),
                                }}
                                type={InfoBlockTypes.PERCENTAGE_MIXED}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.panel}>
                    <Typography type="title">Your Entangle Assets</Typography>
                    <div className={styles.selectWrapper}>
                        <Select value={filter} onChange={handleChangeFilter}>
                            <Option value="Sort by">Sort by</Option>
                            {SortArray.map((el, key) => (
                                <Option value={el} key={key}>
                                    {el}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {!cardLoaded ? (
                    loader
                ) : (
                    <InvestCard
                        balances={cryptoBalances}
                        filter={filter}
                    />
                )}
            </section>

            <section className={styles.section}>
                <TransactionHistory />
            </section>
        </div>
    );
};

export default Profile;
