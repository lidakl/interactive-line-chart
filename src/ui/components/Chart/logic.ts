import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export function getAccessors<T extends object>(
    x: ((d: T) => number | string) | keyof T,
    y: ((d: T) => number | string) | keyof T,
) {
    const xAccessor = typeof x === 'function' ? x : (d: T) => new Date(d[x] as string);
    const yAccessor = typeof y === 'function' ? y : (d: T) => d[y];

    return {
        xAccessor,
        yAccessor,
    };
}

export function getSmoothAccessors<T extends object>(
    x: ((d: T) => number | string) | keyof T,
    y: ((d: T) => number | string) | keyof T,
    offset: number,
) {
    const xAccessor = typeof x === 'function' ? x : (d: T) => new Date(d[x] as string);
    const baseYAccessor = typeof y === 'function' ? (d: T) => y(d) as number : (d: T) => d[y] as number;

    const y0Accessor = (d: T) => (baseYAccessor(d) - offset < 0 ? 0 : baseYAccessor(d) - offset);
    const y1Accessor = (d: T) => baseYAccessor(d) + offset;

    return {
        xAccessor,
        yAccessor: baseYAccessor,
        y0Accessor,
        y1Accessor,
    };
}
