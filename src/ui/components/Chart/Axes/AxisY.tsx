import {AxisLeft, AxisRight} from '@visx/axis';
import {useChartContext} from '../Chart/ChartContext';
import {marginSVG} from '../constants';
import type {AxisProps, ValueFormat} from './types';

export function AxisY<T extends object>(props: AxisProps<T>) {
    const {hideTicks, position = 'left', count, tickFormat} = props;
    const {width, yScale, setYKeyFormat} = useChartContext();

    if (tickFormat) {
        setYKeyFormat(tickFormat as ValueFormat<unknown>);
    }

    const commonProps = {
        hideTicks: Boolean(hideTicks),
        stroke: 'var(--chart-line-color)',
        tickLabelProps: () => ({
            fill: 'var(--chart-tick-color)',
            textAnchor: 'end' as const,
            dy: '0.33em',
            fontSize: '11',
            fontFamily: 'Roboto',
            fontWeight: '500',
        }),
        numTicks: count,
        tickFormat,
    };

    return (
        <>
            {position === 'left' && <AxisLeft scale={yScale} left={marginSVG.left} {...commonProps} />}
            {position === 'right' && <AxisRight scale={yScale} left={width - marginSVG.right} {...commonProps} />}
        </>
    );
}
