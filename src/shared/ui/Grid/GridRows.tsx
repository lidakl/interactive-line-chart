import {GridRows as HorizontalGrid} from '@visx/grid';
import {useChartContext} from '../Chart/ChartContext';
import {marginSVG} from '../types';
import type {GridProps} from './types';

export function GridRows(props: GridProps) {
    const {count, dashed} = props;
    const {width, yScale} = useChartContext();

    return (
        <HorizontalGrid
            scale={yScale}
            width={width - marginSVG.left - marginSVG.right}
            left={marginSVG.left}
            numTicks={count}
            strokeDasharray={dashed ? '5, 5' : undefined}
            stroke="var(--chart-line-color)"
        />
    );
}
