import {AxisBottom, AxisTop} from '@visx/axis';
import {useChartContext} from '../Chart/ChartContext';
import {marginSVG} from '../types';
import type {AxisProps, ValueFormat} from './types';

export function AxisX<T extends object>(props: AxisProps<T>) {
    const {hideTicks, position = 'bottom', count, tickFormat, ...other} = props;
    const {height, xScale, setMainKeyFormat} = useChartContext();

    if (tickFormat) {
        setMainKeyFormat(tickFormat as ValueFormat<unknown>);
    }

    const commonProps = {
        hideTicks: Boolean(hideTicks),
        stroke: 'var(--chart-line-color)',
        tickLabelProps: () => ({
            fill: '#918F9A',
            textAnchor: 'middle' as const,
            fontSize: '11',
            fontFamily: 'Roboto',
            fontWeight: '500',
        }),
        numTicks: count,
        tickFormat,
        ...other,
    };

    return (
        <>
            {position === 'bottom' && <AxisBottom scale={xScale} top={height - marginSVG.bottom} {...commonProps} />}
            {position === 'top' && <AxisTop scale={xScale} top={marginSVG.top} {...commonProps} />}
        </>
    );
}
