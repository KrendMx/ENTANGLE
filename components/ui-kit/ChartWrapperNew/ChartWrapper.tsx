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
    label,
    total,
    percentChange,
    data: dataProps,
}) => {
    function createLineGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

        gradient.addColorStop(0, 'rgba(0, 148, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(104, 49, 214, 0.87)');
        gradient.addColorStop(1, 'rgba(255, 94, 186, 1)');

        return gradient;
    }

    function createAreaGradient(
        ctx: CanvasRenderingContext2D,
        area: ChartArea,
    ) {
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

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
                    display: false,
                },
            },
            x: {
                grid: { color: 'rgba(82, 87, 102, 0.2)' },
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
