import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { ChartDataProps } from 'UI/ui-kit/ChartWrapper/ChartWrapper.interfaces';
import ChartWrapper from 'UI/ui-kit/ChartWrapper/ChartWrapper';
import SoonChart from 'UI/ui-kit/SoonChart/SoonChart';
import { useStore } from 'core/store';
import type { BalanceChartTick } from './ProfileChart.ineterfaces';
import styles from './style.module.css';
import ChartLoader from './ProfileCharts.constant';

const ProfileChart: React.FC = () => {
    const [data, setData] = useState<BalanceChartTick[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { store } = useStore((store) => ({
        WalletEntity: store.WalletEntity,
        UserEntity: store.UserEntity,
    }));
    const { chartData: rawChartData } = store.UserEntity;

    useEffect(() => {
        setData(rawChartData);
    }, [rawChartData]);

    const filters = {
        '24H': moment().subtract(1, 'days').toDate(),
        '1W': moment().subtract(1, 'weeks').toDate(),
        '1M': moment().subtract(1, 'months').toDate(),
        '1Y': moment().subtract(1, 'year').toDate(),
        All: moment(0).toDate(),
    };

    const labelFormats = {
        '24H': 'HH:MM A',
        '1W': 'ddd D',
        '1M': 'ddd D',
        '1Y': 'MMM-D YYYY',
        All: 'MMM-D YYYY',
    };
    const [selectedFilter, setSelectedFilter] = useState<keyof typeof filters>('24H');

    const [chartData, setChartData] = useState<ChartDataProps | null>(null);
    const filterChanged = () => {
        const filtredData = data.filter(
            (i) => new Date(i.label) > filters[selectedFilter],
        );
        const res = {
            labels: filtredData.map((i) => i.label),
            data: filtredData.map((i) => i.value),
        };
        setChartData(res);
        setIsLoaded(true);
    };

    useEffect(() => {
        filterChanged();
    }, [selectedFilter, isLoaded]);

    if (!isLoaded) return <ChartLoader />;

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.filterWrapper}>
                {Object.keys(filters).map((i) => (
                    <div
                        onClick={() => {
                            setSelectedFilter(i as keyof typeof filters);
                        }}
                        key={i}
                        className={classNames(styles.filter, {
                            [styles.filterActive]: i === selectedFilter,
                        })}
                    >
                        {i}
                    </div>
                ))}
            </div>
            {chartData ? (
                <ChartWrapper
                    labelFormat={labelFormats[selectedFilter]}
                    labels={chartData.labels}
                    data={chartData.data}
                />
            ) : (
                <SoonChart />
            )}
        </div>
    );
};
export default ProfileChart;
