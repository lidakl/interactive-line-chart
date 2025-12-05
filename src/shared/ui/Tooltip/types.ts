import type {ForwardRefExoticComponent, JSX, NamedExoticComponent, ReactNode} from 'react';
import type {TooltipData} from '@visx/xychart';

export interface CustomTooltipProps<T extends object> {
    data: T;
}

interface TooltipCommonProps {
    showVerticalLine?: boolean;
    showHorizontalLine?: boolean;
}

export interface TooltipWithLabelsProps extends TooltipCommonProps {
    labels: (Record<string, string[]> | string)[];
    titleColor?: string;
    valueColor?: string;
    labelColor?: string;
}

export interface TooltipWithChildrenProps<T extends object[]> extends TooltipCommonProps {
    children:
        | JSX.Element
        | ((props: CustomTooltipProps<T>) => ReactNode)
        | NamedExoticComponent<CustomTooltipProps<T>>
        | ForwardRefExoticComponent<CustomTooltipProps<T>>;
}

export type TooltipProps<T extends object[]> = TooltipWithChildrenProps<T> | TooltipWithLabelsProps;

export interface DefaultTooltipProps<T extends object> extends TooltipWithLabelsProps {
    data: TooltipData<T> | undefined;
}
