import {useEffect, useId} from 'react';
import {curveMonotoneX} from '@visx/curve';
import {AreaSeries} from '@visx/xychart';
import {useChartContext} from '../Chart/ChartContext';
import {getAccessors} from '../logic';
import type {ChartProps} from '../types';
import styles from './styles.module.css';

interface Props<T extends object> extends ChartProps<T> {
    color: string;
    curve?: unknown;
}

export function AreaChart<T extends object>(props: Props<T>) {
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
        <AreaSeries
            dataKey={id}
            data={data}
            fillOpacity={0.5}
            curve={curve ? curveMonotoneX : undefined}
            className={styles.area}
            stroke="blue !!important"
            fill={color}
            style={{'--area-stroke-color': color} as React.CSSProperties}
            lineProps={{className: styles.area}}
            {...accessors}
        />
    );
}
