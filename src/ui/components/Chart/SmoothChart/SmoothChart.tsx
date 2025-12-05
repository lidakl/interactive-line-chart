import {useEffect, useId} from 'react';
import {curveMonotoneX} from '@visx/curve';
import {AreaSeries, LineSeries} from '@visx/xychart';
import {useChartContext} from '../Chart/ChartContext';
import {getSmoothAccessors} from '../logic';
import type {ChartProps} from '../types';

interface Props<T extends object> extends ChartProps<T> {
    color: string;
}

export function SmoothChart<T extends object>(props: Props<T>) {
    const {data, xKey, yKey, color} = props;
    const {setMainKey, setChartKeys, setChartColors} = useChartContext();

    const id = useId();
    const accessors = getSmoothAccessors(xKey, yKey, 1);

    useEffect(() => {
        setMainKey(xKey);
        setChartKeys(id, [yKey]);
        setChartColors(id, [color]);
    }, [color, id, setChartColors, setChartKeys, setMainKey, xKey, yKey]);

    return (
        <>
            <AreaSeries
                data={data}
                dataKey={`area-${id}`}
                fill={color}
                fillOpacity={0.5}
                renderLine={false}
                curve={curveMonotoneX}
                yAccessor={accessors.y1Accessor}
                y0Accessor={accessors.y0Accessor}
                xAccessor={accessors.xAccessor}
            />
            <LineSeries
                data={data}
                dataKey={id}
                curve={curveMonotoneX}
                stroke={color}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yAccessor}
            />
        </>
    );
}
