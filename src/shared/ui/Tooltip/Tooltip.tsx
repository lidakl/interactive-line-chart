import {type FunctionComponent, isValidElement} from 'react';
import {Tooltip as ChartTooltip} from '@visx/xychart';
import {useChartContext} from '../Chart/ChartContext.tsx';
import {DefaultTooltip} from './DefaultTooltip';
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

    const {keys: _keys} = useChartContext();
    const ids = Object.keys(_keys.current);
    // const keys = Object.values(_keys.current);

    // if (labels && labels.length !== keys.length) {
    //     return null;
    // }

    return (
        <ChartTooltip
            showVerticalCrosshair={showVerticalLine}
            showHorizontalCrosshair={showHorizontalLine}
            className={styles.chartTooltip}
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
