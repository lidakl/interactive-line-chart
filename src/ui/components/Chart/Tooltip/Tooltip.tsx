import {type FunctionComponent, isValidElement} from 'react';
import {Tooltip as ChartTooltip} from '@visx/xychart';
import {useChartContext} from '../Chart/ChartContext.tsx';
import {DefaultTooltip} from './DefaultTooltip.tsx';
import type {CustomTooltipProps, TooltipProps, TooltipWithChildrenProps, TooltipWithLabelsProps} from './types.ts';
import styles from './styles.module.css';

export function Tooltip<T extends object[]>(props: TooltipProps<T>) {
    const {
        labels,
        showVerticalLine = false,
        showHorizontalLine = false,
        valueColor,
        labelColor,
        children,
    } = props as TooltipWithLabelsProps & TooltipWithChildrenProps<T>;

    const {keys} = useChartContext();
    const ids = Object.keys(keys.current);

    return (
        <ChartTooltip
            showVerticalCrosshair={showVerticalLine}
            showHorizontalCrosshair={showHorizontalLine}
            className={styles.tooltip}
            renderTooltip={({tooltipData}) => {
                if (children) {
                    if (isValidElement(children)) {
                        return children;
                    }

                    const Component = children as FunctionComponent<CustomTooltipProps<T>>;
                    const customData: object[] = [];

                    ids.forEach((id) => {
                        customData.push(tooltipData?.datumByKey[id]?.datum as T);
                    });

                    return <Component data={customData.filter(Boolean) as T}></Component>;
                }

                return (
                    <DefaultTooltip
                        labels={labels}
                        data={tooltipData}
                        valueColor={valueColor}
                        labelColor={labelColor}
                    />
                );
            }}
        />
    );
}
