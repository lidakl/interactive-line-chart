import type {AxisScaleOutput} from '@visx/axis';
import type {BandScaleConfig, LinearScaleConfig, TimeScaleConfig} from '@visx/scale';

export const scaleBand: BandScaleConfig<string> = {type: 'band'};

export const scaleTime: TimeScaleConfig<AxisScaleOutput> = {type: 'time'};

export const scaleLinear: LinearScaleConfig<AxisScaleOutput> = {type: 'linear'};

export const mdSize = {width: 600, height: 300};

export const marginSVG = {top: 50, right: 50, bottom: 50, left: 50};
