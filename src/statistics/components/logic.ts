import type {MinMax} from './types';

export const getMinMax = <T extends object>(
    data: T[],
    ...keys: (((d: T) => number | string) | keyof T)[]
): MinMax[] => {
    const minMax: MinMax[] = [];
    data.forEach((_value) => {
        keys.forEach((key, index) => {
            if (!minMax[index]) {
                minMax[index] = {min: undefined, max: undefined};
            }

            const value = typeof key === 'function' ? key(_value) : _value[key];

            if (typeof value === 'number') {
                const currentValue = value as number;

                if (minMax[index].min === undefined || currentValue < minMax[index].min!) {
                    minMax[index].min = currentValue;
                }

                if (minMax[index].max === undefined || currentValue > minMax[index].max!) {
                    minMax[index].max = currentValue;
                }
            }
        });
    });

    return minMax;
};
