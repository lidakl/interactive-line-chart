import {AxisBottom, AxisTop} from '@visx/axis';
import {useChartContext} from '../Chart/ChartContext';
import {marginSVG} from '../constants';
import type {AxisProps, ValueFormat} from './types';

export function AxisX<T extends object>(props: AxisProps<T>) {
    const {hideTicks, position = 'bottom', count, tickFormat} = props;
    const {height, xScale, setMainKeyFormat} = useChartContext();

    if (tickFormat) {
        setMainKeyFormat(tickFormat as ValueFormat<unknown>);
    }

    const commonProps = {
        hideTicks: Boolean(hideTicks),
        stroke: 'var(--chart-line-color)',
        tickLabelProps: () => ({
            fill: 'var(--chart-tick-color)',
            textAnchor: 'middle' as const,
            fontSize: '11',
            fontFamily: 'Roboto',
            fontWeight: '500',
        }),
        numTicks: count,
        tickFormat,
    };

    return (
        <>
            {position === 'bottom' && <AxisBottom scale={xScale} top={height - marginSVG.bottom} {...commonProps} />}
            {position === 'top' && <AxisTop scale={xScale} top={marginSVG.top} {...commonProps} />}
        </>
    );
}
