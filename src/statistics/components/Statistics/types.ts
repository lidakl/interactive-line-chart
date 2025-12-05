interface Metric {
    [variationId: string]: number;
}

interface Statistics {
    date: string;
    visits: Metric;
    conversions: Metric;
}

export interface VariationStatistics {
    variations: {name: string; id?: number}[];
    data: Statistics[];
}

export interface ChartStatistics {
    date: string;
    conversionRate: number;
}

export interface VariationChartDataSet {
    id: string;
    name: string;
    data: ChartStatistics[];
}
