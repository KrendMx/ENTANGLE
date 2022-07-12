import React, { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Select, { Option } from 'UI/ui-kit/Select';
import Typography from 'UI/ui-kit/Typography';
import ChartWrapper from 'UI/ui-kit/ChartWrapperNew/ChartWrapper';
import { CHART_DATA_TEST, initState } from './Stable.const';
import AssetItem from './AssetItem';
import type { IAssetItem } from './Stable.interfaces';

import styles from './style.module.css';

const StakeStable: React.FC = () => {
    const [stableState, setStableState] = useState<IAssetItem[]>(initState);
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortValue, setSortValue] = useState<string>('');

    const addOneStable = () => {};

    const filterSortStables = () => {};

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
                        data={Array.apply(null, { length: 10 }).map(Function.call, Math.random)}
                        labels={Array.from(Array(10).keys())}
                        total="1568'530'000"
                        percentChange={54.345}
                    />
                </div>
                <div className={styles.chart}>
                    <ChartWrapper
                        label={t('slpSupply')}
                        data={Array.apply(null, { length: 10 }).map(Function.call, Math.random)}
                        labels={Array.from(Array(10).keys())}
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
                    <Image
                        src="/images/coming.png"
                        width={1267}
                        height={345}
                        quality={100}
                        alt="coming-banner"
                    />
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
