import type {AxisScaleOutput} from '@visx/axis';
import type {BandScaleConfig, LinearScaleConfig, TimeScaleConfig} from '@visx/scale';

export type ScaleType = BandScaleConfig<string> | LinearScaleConfig<AxisScaleOutput> | TimeScaleConfig<AxisScaleOutput>;

type KeyAccessor<T extends object> = (d: T) => number | string;
export type Key<T extends object> = keyof T | KeyAccessor<T>;

export interface Range {
    min?: number;
    max: number;
}

export interface Labels {
    labels: string[];
}

export type Scale = Range | Labels;
