import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { ChartArea, ChartData } from 'chart.js';
import Image from 'next/image';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    LineElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import moment from 'moment/moment';
import classNames from 'classnames';
import { numberFormatter } from '../InfoBlock/InfoBlock.constants';

import styles from './style.module.css';
import type { ChartDataProps } from './ChartWrapper.interfaces';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    LineElement,
);

const ChartWrapper: React.FC<ChartDataProps> = ({
    label,
    labels,
    total,
    miniGraph = false,
    percentChange,
    data: dataProps,
}) => {
    function createLineGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);

        gradient.addColorStop(0, 'rgba(0, 148, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(104, 49, 214, 0.87)');
        gradient.addColorStop(1, 'rgba(255, 94, 186, 1)');

        return gradient;
    }

    const change = useMemo(() => {
        if (percentChange > 0) {
            return {
                mark: '+',
                img: (
                    <Image
                        src="/images/bulks/plus.svg"
                        height={24}
                        width={24}
                        quality={100}
                        alt={'plus-mini-chart'}
                    />
                ),
                style: styles.plus,
            };
        } else {
            return {
                mark: '-',
                img: (
                    <Image
                        src="/images/bulks/minus.svg"
                        height={24}
                        width={24}
                        quality={100}
                        alt={'plus-mini-chart'}
                    />
                ),
                style: styles.minus,
            };
        }
    }, [dataProps, percentChange]);

    function createAreaGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);

        gradient.addColorStop(0, 'rgba(0, 148, 255, 0.22)');
        gradient.addColorStop(0.5, 'rgba(104, 49, 214, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 94, 186, 0.22)');

        return gradient;
    }

    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const data = {
            labels: labels,
            datasets: [
                {
                    data: dataProps,
                    pointRadius: 0,
                    tension: 0.2,
                },
            ],
        };
        const updatedData = {
            ...data,
            datasets: data.datasets.map((dataset) => ({
                ...dataset,
                borderWidth: 2,
                borderColor: createLineGradient(chart.ctx, chart.chartArea),
                backgroundColor: createAreaGradient(chart.ctx, chart.chartArea),
                fill: true,
            })),
        };
        setChartData(updatedData);
    }, [chartRef.current, dataProps]);

    const options = {
        scales: {
            y: {
                grid: { color: 'rgb(18, 18, 24)' },
                display: false,
            },
            x: {
                grid: { color: 'rgb(18, 18, 24)' },
                ticks: {
                    display: false,
                },
            },
        },
        elements: {
            point: {
                borderWidth: 0,
                backgroundColor: 'rgba(0,0,0,0)',
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <p className={styles.label}>{label}</p>
                <div className={styles.data}>
                    <p className={styles.total}>{total}</p>
                    <div className={styles.changeBlock}>
                        <p
                            className={classNames(styles.change, change.style)}
                        >
                            {change.mark}
                            {percentChange} %
                        </p>
                        {miniGraph && change.img}
                    </div>
                </div>
            </div>
            <div className={styles.chartBlock}>
                <Chart
                    ref={chartRef}
                    type="line"
                    options={options}
                    data={chartData}
                />
            </div>
        </div>
    );
};

export default React.memo(ChartWrapper);
