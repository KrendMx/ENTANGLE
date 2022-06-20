interface ChartDataProps {
    label: string;
    labels: number[];
    total: string;
    miniGraph?: boolean;
    percentChange: number;
    data: number[];
}

export type {
    ChartDataProps,
};
