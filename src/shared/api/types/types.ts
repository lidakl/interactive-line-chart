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
    id: string; // "0", "10001", "10002"
    name: string; // "Original", "Variation A"
    data: ChartStatistics[];
}
