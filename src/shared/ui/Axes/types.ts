type AxisXPosition = 'top' | 'bottom';

type AxisYPosition = 'left' | 'right';

export type ValueFormat<T> = (value: T) => string | undefined;

export interface AxisProps<T extends object> {
    hideTicks?: unknown;
    position?: AxisXPosition | AxisYPosition;
    tickFormat?: ValueFormat<T>;
    count?: number;
}
