import {useEffect, useId} from 'react';
import {curveMonotoneX} from '@visx/curve';
import {LineSeries} from '@visx/xychart';
import {useChartContext} from '../Chart/ChartContext';
import {getAccessors} from '../logic';
import type {ChartProps} from '../types';

interface Props<T extends object> extends ChartProps<T> {
    color: string;
    curve?: unknown;
}

export function LineChart<T extends object>(props: Props<T>) {
    const {data, xKey, yKey, color, curve} = props;
    const {setMainKey, setChartKeys, setChartColors} = useChartContext();
    const id = useId();
    const accessors = getAccessors(xKey, yKey);

    useEffect(() => {
        setMainKey(xKey);
        setChartKeys(id, [yKey]);
        setChartColors(id, [color]);
    }, [color, id, setChartColors, setChartKeys, setMainKey, xKey, yKey]);

    return (
        <LineSeries dataKey={id} data={data} curve={curve ? curveMonotoneX : undefined} stroke={color} {...accessors} />
    );
}
