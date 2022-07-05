import React, {
    useEffect, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import InvestCard from './InvestCard';
import Typography from '@/ui-kit/Typography';
import Select, { Option } from '@/ui-kit/Select';
import InfoBlock from '@/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from '@/ui-kit/InfoBlock/InfoBlock.constants';

import styles from './style.module.css';
import ProfileChart from './ProfileChart/ProfileChart';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import { networks } from '@/src/utils/GlobalConst';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import { SortArray, loader } from './Profile.constant';
import type { IFilter } from './Profile.interfaces';

const Profile = () => {
    const {
        profits, totalBalance, balances, cardLoaded,
    } = useAppSelector(
        ({ userReducer }) => userReducer,
    );
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
    const [change, setChange] = useState<number[]>([0, 0]);
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
        let changeLocal = 0;
        let valueLocal = 0;
        for (let i = 0; i < Object.keys(networks).length; i++) {
            if (profits.get(Object.keys(networks)[i])) {
                changeLocal = profits.get(Object.keys(networks)[i]).change + changeLocal;
                valueLocal = profits.get(Object.keys(networks)[i]).value + valueLocal;
            }
        }
        setChange([valueLocal, changeLocal]);
    }, [profits]);

    const [filter, setFilter] = React.useState<IFilter>('Sort by');

    const handleChangeFilter = (value: IFilter) => setFilter(value);

    const { t } = useTranslation('profile');

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
                                    info={t('currentBalance')}
                                    value={totalBalance}
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
                                    info={t('allProfit')}
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
                                info={t('bestPerformer')}
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
                                info={t('worstPermormer')}
                                value={worstProfit.change}
                                options={{
                                    changeValue: worstProfit.value,
                                    image: (
                                        <Image
                                            width={30}
                                            height={30}
                                            quality={100}
                                            src={
                                                networks[worstProfit.chain]
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
                    <Typography type="title">{t('yourAssets')}</Typography>
                    <div className={styles.selectWrapper}>
                        <Select value={filter} onChange={handleChangeFilter}>
                            <Option value="Sort by">{t('sortBy')}</Option>
                            {SortArray.map((el, key) => (
                                <Option value={el.sort} key={key}>
                                    {t(el.title)}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {!cardLoaded ? (
                    loader
                ) : (
                    <InvestCard
                        balances={balances}
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
