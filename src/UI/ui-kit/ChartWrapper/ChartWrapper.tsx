import React, { useEffect, useRef, useState } from 'react';
import type { ChartArea, ChartData } from 'chart.js';
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

const ChartWrapper: React.FC<ChartDataProps> = React.memo(({
    labels,
    labelFormat = 'DD MMM',
    data: dataProps,
}) => {
    function createLineGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(1, '#0094FF');

        return gradient;
    }

    function createAreaGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(1, '#0094FF40');
        gradient.addColorStop(0, '#0094FF10');

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
            labels,
            datasets: [
                {
                    data: dataProps,
                    pointRadius: 0,
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
                tension: 0.1,
                borderJoinStyle: 'round',
            })),
        };
        setChartData(updatedData);
    }, [chartRef.current, dataProps]);

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: { color: 'rgba(82, 87, 102, 0.2)' },
                ticks: {
                    // @ts-ignore
                    callback: (value) =>
                        `$${numberFormatter(value, 2)}`,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 8,
                },
            },
            x: {
                grid: { color: 'rgba(82, 87, 102, 0.2)' },
                ticks: {
                    // @ts-ignore
                    callback: (value, index) =>
                        moment(labels[index])
                            .format(labelFormat)
                            .split(' ')
                            .map((i) => i.replace('-', ' ')),
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 6,
                },
            },
        },
        elements: {
            point: {
                borderWidth: 1,
                backgroundColor: 'rgba(0,0,0,0)',
            },
        },
        plugins: {
            legend: {
                display: false,
            },

        },
    };
    return (
        <div className={styles.wrapper}>
            <Chart
                ref={chartRef}
                type="line"
                options={options}
                data={chartData}
                width={10}
            />
        </div>
    );
});

export default ChartWrapper;
