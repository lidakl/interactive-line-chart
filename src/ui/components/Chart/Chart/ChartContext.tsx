import {createContext, type ReactNode, type RefObject, useContext, useRef} from 'react';
import type {AxisScale} from '@visx/axis';
import type {ValueFormat} from '../Axes/types';
import type {Key} from './types';

interface ChartContextData {
    width: number;
    height: number;
    xScale: AxisScale;
    yScale: AxisScale;
    setMainKey<T extends object>(key: Key<T>): void;
    setMainKeyFormat(format: ValueFormat<unknown>): void;
    setYKeyFormat(format: ValueFormat<unknown>): void;
    setChartKeys<T extends object>(id: string, keys: Key<T>[]): void;
    setChartColors(id: string, colors: string[]): void;
    mainKey: RefObject<Key<object>>;
    mainKeyFormat: RefObject<ValueFormat<unknown>>;
    yKeyFormat: RefObject<ValueFormat<unknown>>;
    keys: RefObject<Record<string, Key<object>[]>>;
    colors: RefObject<Record<string, string[]>>;
}

const ChartContext = createContext<ChartContextData>({
    width: 0,
    height: 0,
    xScale: {} as AxisScale,
    yScale: {} as AxisScale,
    setMainKey() {},
    setMainKeyFormat() {},
    setYKeyFormat() {},
    setChartKeys() {},
    setChartColors() {},
    mainKey: {current: {} as Key<object>},
    mainKeyFormat: {current: {} as ValueFormat<unknown>},
    yKeyFormat: {current: {} as ValueFormat<unknown>},
    keys: {current: {}},
    colors: {current: {}},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useChartContext = () => useContext(ChartContext);

interface ChartContextProviderProps {
    width: number;
    height: number;
    xScale: AxisScale;
    yScale: AxisScale;
    children: ReactNode;
}

export const ChartContextProvider = (props: ChartContextProviderProps) => {
    const {width, height, children, xScale, yScale} = props;
    const mainKey = useRef<Key<object>>({} as Key<object>);
    const mainKeyFormat = useRef<ValueFormat<unknown>>({} as ValueFormat<unknown>);
    const yKeyFormat = useRef<ValueFormat<unknown>>({} as ValueFormat<unknown>);
    const keys = useRef<Record<string, Key<object>[]>>({});
    const colors = useRef<Record<string, string[]>>({});
    keys.current = {};
    colors.current = {};

    const setMainKey = (chartKey: Key<object>) => {
        if (!mainKey.current.length) {
            mainKey.current = chartKey;
        }
    };

    const setMainKeyFormat = (format: ValueFormat<unknown>) => {
        if (!mainKeyFormat.current.length) {
            mainKeyFormat.current = format;
        }
    };

    const setYKeyFormat = (format: ValueFormat<unknown>) => {
        if (!yKeyFormat.current.length) {
            yKeyFormat.current = format;
        }
    };

    const setChartKeys = (id: string, chartKeys: Key<object>[]) => {
        if (!keys.current[id]) {
            keys.current[id] = chartKeys;
        }
    };

    const setChartColors = (id: string, chartColors: string[]) => {
        if (!colors.current[id]) {
            colors.current[id] = chartColors;
        }
    };

    return (
        <ChartContext.Provider
            value={{
                width,
                height,
                xScale,
                yScale,
                setMainKey,
                setMainKeyFormat,
                setYKeyFormat,
                setChartKeys,
                setChartColors,
                mainKey,
                mainKeyFormat,
                yKeyFormat,
                keys,
                colors,
            }}
        >
            {children}
        </ChartContext.Provider>
    );
};
