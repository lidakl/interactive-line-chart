import {type HTMLAttributes, type PropsWithChildren, useState} from 'react';
import classNames from 'classnames';
import {extent} from 'd3-array';
import {type AxisScale} from '@visx/axis';
import {ParentSize} from '@visx/responsive';
import {
    scaleBand as _scaleBand,
    scaleLinear as _scaleLinear,
    scaleTime as _scaleTime,
    type TimeDomain,
} from '@visx/scale';
import {XYChart} from '@visx/xychart';
import {marginSVG, mdSize, scaleBand, scaleLinear, scaleTime} from '../constants';
import {ChartContextProvider} from './ChartContext';
import type {Labels, Range, Scale, ScaleType} from './types';
import styles from './styles.module.css';

interface ChartProps extends HTMLAttributes<HTMLDivElement> {
    x: Scale;
    y: Scale;
    size?: 'sm' | 'md' | 'lg';
}

export function Chart(props: PropsWithChildren<ChartProps>) {
    const {className, size = 'md', x: _x, y: _y, children, ...other} = props;
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const x = _x as Labels & Range;
    const y = _y as Labels & Range;
    let xScale: AxisScale;
    let xScaleType: ScaleType;

    if (x.labels) {
        xScale = _scaleTime({
            range: [marginSVG.left, width - marginSVG.right],
            domain: extent(x.labels, (d: string) => new Date(d)) as TimeDomain,
            nice: true,
        });
        xScaleType = scaleTime;
    } else {
        xScale = _scaleLinear({
            range: [marginSVG.left, width - marginSVG.right],
            domain: [x.min ?? 0, x.max],
        });
        xScaleType = scaleLinear;
    }

    let yScale: AxisScale;
    let yScaleType: ScaleType;

    if (y.labels) {
        yScale = _scaleBand({
            range: [height - marginSVG.bottom, marginSVG.top],
            domain: y.labels,
        });
        yScaleType = scaleBand;
    } else {
        yScale = _scaleLinear({
            range: [height - marginSVG.bottom, marginSVG.top],
            domain: [y.min ?? 0, y.max],
        });
        yScaleType = scaleLinear;
    }

    const resizeChart = (width: number, height: number) => {
        setTimeout(() => {
            setWidth(width);
            setHeight(height);
        });
    };

    return (
        <div
            className={classNames(styles.chart, className, {
                [styles.sm]: size === 'sm',
                [styles.md]: size === 'md',
                [styles.lg]: size === 'lg',
            })}
            {...other}
        >
            <ParentSize>
                {(parent) => {
                    resizeChart(parent.width, parent.height);

                    return (
                        <ChartContextProvider
                            width={parent.width || mdSize.width}
                            height={parent.height || mdSize.height}
                            xScale={xScale}
                            yScale={yScale}
                        >
                            <XYChart height={height} width={width} xScale={xScaleType} yScale={yScaleType}>
                                {children}
                            </XYChart>
                        </ChartContextProvider>
                    );
                }}
            </ParentSize>
        </div>
    );
}
