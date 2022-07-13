import React, {
    useEffect, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Typography from 'UI/ui-kit/Typography';
import Select, { Option } from 'UI/ui-kit/Select';
import InfoBlock from 'UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'UI/ui-kit/InfoBlock/InfoBlock.constants';

import { networks } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import type { availableChains } from 'utils/Global/Types';
import styles from './style.module.css';
import ProfileChart from '../../Components/Profile.Components/ProfileChart/ProfileChart';
import TransactionHistory from '../../Components/Profile.Components/TransactionHistory/TransactionHistory';
import InvestCard from '../../Components/Profile.Components/InvestCard';
import { SortArray, loader } from './Profile.constant';
import type { IFilter } from './Profile.interfaces';

const Profile = () => {
    const { store } = useStore((store) => ({
        UserEntity: store.UserEntity,
    }));
    const {
        profits, totalBalance, balances, cardLoaded,
    } = store.UserEntity;

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
        const names = Object.keys(profits);
        let best = { value: 0.0000001, change: 0, chain: '250' };
        let worst = { value: 0.0000001, change: 0, chain: '250' };
        let counter = 0;
        let valueLocal = 0;
        let changeLocal = 0;
        for (const name in names) {
            for (const chain in Object.keys(profits[name])) {
                if (profits[name][chain].change > bestProfit.change) {
                    best = {
                        value: profits[name][chain].value,
                        change: profits[name][chain].change,
                        chain,
                    };
                } else if (profits[name][chain].change < worstProfit.change) {
                    worst = {
                        value: profits[name][chain].value,
                        change: profits[name][chain].change,
                        chain,
                    };
                }
                valueLocal += profits[name][chain].value;
                changeLocal += profits[name][chain].change;
                counter++;
            }
        }
        setChange([(valueLocal / counter), (changeLocal / counter)]);
        setBestProfit((best as typeof bestProfit));
        setWorstProfit((worst as typeof worstProfit));
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
