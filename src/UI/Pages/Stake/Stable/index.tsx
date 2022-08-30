import React, { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Select, { Option } from 'UI/ui-kit/Select';
import Typography from 'UI/ui-kit/Typography';
import ChartWrapper from 'UI/ui-kit/ChartWrapperNew/ChartWrapper';
import AssetItem from 'UI/Components/StakeStable.Components/AssetItem';
import { initState } from './Stable.const';
import type { IAssetItem } from './Stable.interfaces';

import styles from './style.module.css';

const StakeStable: React.FC = () => {
    const [stableState, setStableState] = useState<IAssetItem[]>(initState);
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortValue, setSortValue] = useState<string>('');

    const addOneStable = () => {};

    const filterSortStables = () => {};

    const generateGraph = (): number[] => {
        // eslint-disable-next-line prefer-spread
        const arr = Array.apply(null, { length: 25 });
        return arr.map((el : number, i: number) => Math.random() * (30 - 10) + i);
    };

    const { t } = useTranslation('stable');
    const { t: tIndex } = useTranslation('index');
    return (
        <div className={styles.wrapper}>
            <div className={classNames(styles.glow, styles.blue)}>
                <Image
                    src="/images/GlowBlue.svg"
                    height={631}
                    width={552}
                    quality={100}
                    alt="glow-blue-asset"
                />
            </div>
            <div className={styles.header}>
                <Typography type="title" classNameModifier={styles.textHeader}>
                    {t('stakeStablecoins')}
                </Typography>
            </div>
            <div className={styles.chartBlock}>
                <div className={classNames(styles.chart, styles.mgr)}>
                    <ChartWrapper
                        label={t('tvl')}
                        data={generateGraph()}
                        labels={Array.from(Array(25).keys())}
                        total="1568'530'000"
                        percentChange={54.345}
                    />
                </div>
                <div className={styles.chart}>
                    <ChartWrapper
                        label={t('slpSupply')}
                        data={generateGraph()}
                        labels={Array.from(Array(25).keys())}
                        total="1568'530'000"
                        percentChange={54.345}
                    />
                </div>
            </div>
            <div className={styles.assetHeader}>
                <Typography type="title" classNameModifier={styles.textHeader}>
                    {t('assets')}
                </Typography>
                <div className={styles.filterBlock}>
                    <Select
                        value={filterValue}
                        onChange={setFilterValue}
                        disabled
                        customClassName={classNames(styles.select, styles.mgr)}
                    >
                        <Option value="">{tIndex('filterBy')}</Option>
                        <Option value="1">{tIndex('filterBy')}</Option>
                    </Select>
                    <Select
                        value={sortValue}
                        onChange={setSortValue}
                        disabled
                        customClassName={styles.select}
                    >
                        <Option value="">{tIndex('sortBy')}</Option>
                        <Option value="1">{tIndex('sortBy')}</Option>
                    </Select>
                </div>
            </div>
            <div className={styles.assetWrapper}>
                {stableState.map((el, idx) => (
                    <AssetItem
                        key={idx}
                        title={el.title}
                        apr={el.apr}
                        availableNetworks={el.availableNetworks}
                        volume={el.volume}
                    />
                ))}
                <div className={styles.banner}>
                    <div className={styles.soon}>
                        <p>{t('newAsset')}</p>
                    </div>
                    <div className={styles.soonDesk}>
                        <Image
                            src="/images/coming.png"
                            width={1267}
                            height={345}
                            quality={100}
                            alt="coming-banner"
                        />
                    </div>
                    <div className={styles.soonMobile}>
                        <Image
                            src="/images/coming_mobile.png"
                            layout="fill"
                            quality={100}
                            alt="coming-banner"
                        />
                    </div>
                </div>
            </div>
            <div className={classNames(styles.glow, styles.purple)}>
                <Image
                    src="/images/GlowPurple.svg"
                    height={631}
                    width={552}
                    quality={100}
                    alt="glow-purple-asset"
                />
            </div>
        </div>
    );
};

export default StakeStable;
