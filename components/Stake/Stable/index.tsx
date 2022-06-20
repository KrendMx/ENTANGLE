import React, { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { CHART_DATA_TEST, initState } from './Stable.const';
import AssetItem from './AssetItem';
import Select, { Option } from '@/components/ui-kit/Select';
import type { IAssetItem } from './Stable.interfaces';

import Typography from '@/components/ui-kit/Typography';
import ChartWrapper from '@/components/ui-kit/ChartWrapperNew/ChartWrapper';

import styles from './style.module.css';

const StakeStable: React.FC = () => {
    const [stableState, setStableState] = useState<IAssetItem[]>(initState);
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortValue, setSortValue] = useState<string>('');

    const addOneStable = () => {};

    const filterSortStables = () => {};

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
                    Stake Stablecoins for Synth-LP Liquidity
                </Typography>
            </div>
            <div className={styles.chartBlock}>
                <div className={classNames(styles.chart, styles.mgr)}>
                    <ChartWrapper
                        label="TVL"
                        data={Array.apply(null, {length: 10}).map(Function.call, Math.random)}
                        labels={Array.from(Array(10).keys())}
                        total="1568'530'000"
                        percentChange={54.345}
                    />
                </div>
                <div className={styles.chart}>
                    <ChartWrapper
                        label="Total Synth-LP Circulation Supply"
                        data={Array.apply(null, {length: 10}).map(Function.call, Math.random)}
                        labels={Array.from(Array(10).keys())}
                        total="1568'530'000"
                        percentChange={54.345}
                    />
                </div>
            </div>
            <div className={styles.assetHeader}>
                <Typography type="title" classNameModifier={styles.textHeader}>
                    Assets
                </Typography>
                <div className={styles.filterBlock}>
                    <Select
                        value={filterValue}
                        onChange={setFilterValue}
                        disabled
                        customClassName={classNames(styles.select, styles.mgr)}
                    >
                        <Option value="">Filter by</Option>
                        <Option value="1">Filter by</Option>
                    </Select>
                    <Select
                        value={sortValue}
                        onChange={setSortValue}
                        disabled
                        customClassName={styles.select}
                    >
                        <Option value="">Sort by</Option>
                        <Option value="1">Sort by</Option>
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
                        <p>New assets coming soon</p>
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
