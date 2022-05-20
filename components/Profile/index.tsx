import React, {
    useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { Contract, providers } from 'ethers';
import InvestCard from './InvestCard';
import Typography from '../ui-kit/Typography';
import Select, { Option } from '../ui-kit/Select';
import InfoBlock from '../ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from '../ui-kit/InfoBlock/InfoBlock.constants';
import {
    avaDex, avaSynth, ftmDex, ftmSynth,
} from '../../src/ChainService/abi';
import { ServiceContext } from '../../src/context/ServiceContext/ServiceContext';

import styles from './style.module.css';
import ProfileChart from './ProfileChart/ProfileChart';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import { networks } from '../../src/utils/GlobalConst';
import { useAppSelector } from '../../Redux/store/hooks/redux';

export type IFilter = 'Price increase' | 'Price decrease' | 'Profit increase' | 'Profit decrease' | 'Sort by';

export interface IState {
    positions: string;
    price: string;
    avg?: number;
}

const Profile = () => {
    const { positionSum, profits } = useAppSelector((state) => state.userReducer);
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
        const data = Object.keys(networks).map((i) => (
            profits.get(i)
                ? {
                    chain: i as keyof typeof networks,
                    ...profits.get(i),
                }
                : {
                    chain: i as keyof typeof networks,
                    value: 0,
                    change: 0,
                }
        ));
        setBestProfit(data.reduce((l, e) => (e.value > l.value ? e : l)));
        setWorstProfit(data.reduce((l, e) => (e.value < l.value ? e : l)));
    }, [profits]);
    const [avaxState, setAvaxState] = useState<IState>();
    const [ftmState, setFtmState] = useState<IState>();
    const [cardLoaded, setCardLoaded] = useState<boolean>(false);
    const [change, setChange] = useState<number[]>([]);
    const { account } = useAppSelector((state) => state.walletReducer);
    const { txLoading } = useAppSelector((state) => state.userReducer);

    const [filter, setFilter] = React.useState<IFilter>('Sort by');

    const handleChangeFilter = (value: IFilter) => setFilter(value);

    const loader = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '100px 0',
                fontSize: '3rem',
            }}
        >
            <i className="fa fa-spinner fa-spin" />
        </div>
    );

    const ftmSynthContract = useMemo(
        () =>
            new Contract(
                '0x90fF5B6ADD1ABAcB1C6fF9e7772B843614655a71',
                ftmSynth,
                new providers.JsonRpcProvider('https://rpc.ftm.tools'),
            ),
        [],
    );

    const ftmDEXContract = useMemo(
        () =>
            new Contract(
                '0x9A43E738194DE3369D457C918E2A4CF6FA8BdB8d',
                ftmDex,
                new providers.JsonRpcProvider('https://rpc.ftm.tools'),
            ),
        [],
    );

    const avaSynthContract = useMemo(
        () =>
            new Contract(
                '0xf4fB65ecbc1F01ADa45617a5CcB6348Da59c03F3',
                avaSynth,
                new providers.JsonRpcProvider(
                    'https://api.avax.network/ext/bc/C/rpc',
                ),
            ),
        [],
    );

    const avaDEXContract = useMemo(
        () =>
            new Contract(
                '0xAf4EC4b3DEA223625C5B6dd6b66fde9B22Ea2Aa8',
                avaDex,
                new providers.JsonRpcProvider(
                    'https://api.avax.network/ext/bc/C/rpc',
                ),
            ),
        [],
    );

    useEffect(() => {
        (async function () {
            if (account) {
                const avaxChange = await getProfit(account, 67);
                const ftmChange = await getProfit(account, 8);
                setChange([
                    avaxChange.stable + ftmChange.stable,
                    avaxChange.percentage + ftmChange.percentage,
                ]);
            }
        }());
    }, [account]);

    useEffect(() => {
        (async () => {
            if (account) {
                setCardLoaded(false);
                const ftmDec = await ftmSynthContract.decimals();

                const avaxRate = await ftmDEXContract.rate();
                const avaxPrice = 1 / (Number(avaxRate.toBigInt()) / 10 ** 18);

                const avaxAccountBalance = await ftmSynthContract.balanceOf(
                    account,
                );
                const avaxSynthPosition = Number(avaxAccountBalance.toBigInt()) / 10 ** ftmDec;

                const avaxPosition = avaxSynthPosition * avaxPrice;
                const avaDec = await avaSynthContract.decimals();

                const rate = await avaDEXContract.rate();
                const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

                const accountBalance = await avaSynthContract.balanceOf(
                    account,
                );
                const synthPosition = Number(accountBalance.toBigInt()) / 10 ** avaDec;
                const position = synthPosition * price;
                setFtmState({
                    price: `${Number(price.toFixed(6))}`,
                    positions: `${Number(position.toFixed(2))}`,
                });
                setAvaxState({
                    positions: `${Number(avaxPosition.toFixed(2))}`,
                    price: `${Number(avaxPrice.toFixed(6))}`,
                });
                setCardLoaded(true);
            }
        })();
    }, [account, txLoading]);

    useEffect(() => {
        if (
            (ftmState?.positions && ftmState?.price)
            || (avaxState?.positions && avaxState?.price)
        ) {
            const ftmBalance = Number(ftmState?.positions!) * Number(ftmState?.price!);
            const avaxBalance = Number(avaxState?.positions!) * Number(avaxState?.price!);
            setBalance(ftmBalance + avaxBalance);
        }
    }, [ftmState?.positions, avaxState?.positions]);

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
                                        <img
                                            src={
                                                networks[bestProfit.chain]
                                                    .mainIcon
                                            }
                                            alt=""
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
                                        <img
                                            src={
                                                networks[worstProfit.chain]
                                                    .mainIcon
                                            }
                                            alt=""
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
                            <Option
                                value="Price increase"
                            >
                                Price increase
                            </Option>
                            <Option
                                value="Price decrease"
                            >
                                Price decrease
                            </Option>
                            <Option
                                value="Profit increase"
                            >
                                Profit increase
                            </Option>
                            <Option
                                value="Profit decrease"
                            >
                                Profit decrease
                            </Option>
                        </Select>
                    </div>
                </div>
                {
                    !cardLoaded ? (
                        loader
                    )
                        : (
                            <InvestCard
                                ftmState={ftmState}
                                avaxState={avaxState}
                                filter={filter}
                            />
                        )
                }

            </section>
            <section className={styles.section}>
                <TransactionHistory />
            </section>
        </div>
    );
};

export default Profile;
