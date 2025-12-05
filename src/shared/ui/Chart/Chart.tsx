import {type HTMLAttributes, type PropsWithChildren, useState} from 'react';
import classNames from 'classnames';
import {extent} from 'd3-array';
import {ParentSize} from '@visx/responsive';
import {
    scaleBand as _scaleBand,
    scaleLinear as _scaleLinear,
    scaleTime as _scaleTime,
    type TimeDomain,
} from '@visx/scale';
import {type AxisScale, XYChart} from '@visx/xychart';
import {
    type Labels,
    marginSVG,
    mdSize,
    type Range,
    type Scale,
    scaleBand,
    scaleLinear,
    scaleTime,
    type ScaleType,
} from '../types';
import {ChartContextProvider} from './ChartContext';
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
        // xScale = _scaleBand({
        //     range: [marginSVG.left, width - marginSVG.right],
        //     domain: x.labels,
        // });
        xScale = _scaleTime({
            range: [marginSVG.left, width - marginSVG.right],
            domain: extent(x.labels, (d: string) => new Date(d)) as TimeDomain,
            nice: true,
        });
        xScaleType = scaleTime;
        // xScaleType = scaleBand;
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
