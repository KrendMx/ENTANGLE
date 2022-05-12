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

const ChartWrapper: React.FC<ChartDataProps> = ({
    labels,
    labelFormat = 'DD MMM',
    data: dataProps,
}) => {
    function createLineGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(0, '#FF5EBA');
        gradient.addColorStop(0.5, 'rgba(104, 49, 214, 0.87)');
        gradient.addColorStop(1, '#0094FF');

        return gradient;
    }

    function createAreaGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(0, 'rgba(104, 49, 214, 0)');
        gradient.addColorStop(0.5, 'rgba(104, 49, 214, 0.3)');
        gradient.addColorStop(1, 'rgba(104, 49, 214, 0.9)');

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
                grid: { color: 'rgba(82, 87, 102, 0.2)' },
                ticks: {
                    // @ts-ignore
                    callback: (value, index, tick) =>
                        `$${numberFormatter(value, 2)}`,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            x: {
                grid: { color: 'rgba(82, 87, 102, 0.2)' },
                ticks: {
                    // @ts-ignore
                    callback: (value, index, tick) =>
                        moment(labels[index])
                            .format(labelFormat)
                            .split(' ')
                            .map((i) => i.replace('-', ' ')),
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: 7,
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
    };
    return (
        <div className={styles.wrapper}>
            <Chart
                ref={chartRef}
                type="line"
                options={options}
                data={chartData}
            />
        </div>
    );
};

export default ChartWrapper;
