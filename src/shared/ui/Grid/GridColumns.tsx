import {GridColumns as VerticalGrid} from '@visx/grid';
import {useChartContext} from '../Chart/ChartContext';
import {marginSVG} from '../types';
import type {GridProps} from './types';

export function GridColumns(props: GridProps) {
    const {count, dashed} = props;
    const {height, xScale} = useChartContext();

    return (
        <VerticalGrid
            scale={xScale}
            height={height - marginSVG.top - marginSVG.bottom}
            top={marginSVG.top}
            numTicks={count}
            strokeDasharray={dashed ? '5, 5' : undefined}
            stroke="var(--chart-line-color)"
        />
    );
}
