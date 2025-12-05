import type {StylesConfig} from 'react-select';
import type {AxisScaleOutput} from '@visx/axis';
import type {BandScaleConfig, LinearScaleConfig, TimeScaleConfig} from '@visx/scale';

export const scaleBand: BandScaleConfig<string> = {type: 'band'};

export const scaleTime: TimeScaleConfig<AxisScaleOutput> = {type: 'time'};

export const scaleLinear: LinearScaleConfig<AxisScaleOutput> = {type: 'linear'};

export type ScaleType = BandScaleConfig<string> | LinearScaleConfig<AxisScaleOutput> | TimeScaleConfig<AxisScaleOutput>;

export const mdSize = {width: 600, height: 300};

export const marginSVG = {top: 50, right: 50, bottom: 50, left: 50};

export type KeyAccessor<T extends object> = (d: T) => number | string;

export type Key<T extends object> = keyof T | KeyAccessor<T>;

export interface ChartProps<T extends object> {
    data: T[];
    xKey: ((d: T) => number | string) | keyof T;
    yKey: ((d: T) => number | string) | keyof T;
}

export interface MinMax {
    min?: number;
    max?: number;
}

export interface Range {
    min?: number;
    max: number;
}

export interface Labels {
    labels: string[];
}

export type Scale = Range | Labels;

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

const commonSelectStyles: StylesConfig<Option> = {
    valueContainer: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
    }),

    placeholder: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
    }),

    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? 'var(--select-color-focused)' : 'var(--select-color)',
        backgroundColor: state.isSelected || state.isFocused ? 'var(--select-bg-color-focused)' : 'var(--select-bg)',
        '&:active': {
            color: 'var(--select-color-focused)',
            backgroundColor: 'var(--select-bg-color-active)',
        },
    }),

    menuList: (provided) => ({
        ...provided,
        backgroundColor: 'var(--select-bg)',
    }),
};

export const singleSelectStyles: StylesConfig<Option, false> = {
    ...commonSelectStyles,
    control: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    }),
};

export const multiSelectStyles: StylesConfig<Option, true> = {
    ...commonSelectStyles,
    control: (provided) => ({
        ...provided,
        width: '200px',
        minWidth: '200px',
        maxWidth: '200px',
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg)',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    }),

    multiValue: (provided) => ({
        ...provided,
        maxWidth: 'calc(100% - 10px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'var(--select-color)',
        backgroundColor: 'var(--select-bg-color-selected)',
    }),

    multiValueLabel: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
    }),

    multiValueRemove: (provided) => ({
        ...provided,
        color: 'var(--select-color)',
        ':hover': {
            backgroundColor: 'var(--select-bg-color-remove)',
        },
    }),
};
