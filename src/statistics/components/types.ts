export interface MinMax {
    min?: number;
    max?: number;
}

export type LineStyleType = 'line' | 'line_curve' | 'area' | 'smooth';

export type GroupByType = 'day' | 'week';

export interface ChartSettings {
    lineStyle: LineStyleType;
    groupBy: GroupByType;
    variations: string[];
}

export interface Option {
    value: string;
    label: string;
}
