import React, { useEffect, useReducer, useState } from 'react';
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
            <Typography type="title" classNameModifier={styles.textHeader}>
                Stake Stablecoins for Synth-LP Liquidity
            </Typography>
            <div className={styles.chartBlock}>
                {/* <ChartWrapper label="TVL" data={CHART_DATA_TEST} total="1568'530'000" percentChange={54.345} /> */}
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
            </div>
        </div>
    );
};

export default StakeStable;
