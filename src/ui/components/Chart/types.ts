export interface ChartProps<T extends object> {
    data: T[];
    xKey: ((d: T) => number | string) | keyof T;
    yKey: ((d: T) => number | string) | keyof T;
}
