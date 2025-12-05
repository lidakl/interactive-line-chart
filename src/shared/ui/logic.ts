import dayjs, {Dayjs} from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import type {ChartStatistics, VariationChartDataSet} from '../api/types/types';
import type {MinMax} from './types';

dayjs.extend(weekOfYear);

export function getAccessors<T extends object>(
    x: ((d: T) => number | string) | keyof T,
    y: ((d: T) => number | string) | keyof T,
) {
    const xAccessor = typeof x === 'function' ? x : (d: T) => new Date(d[x]);
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
    const xAccessor = typeof x === 'function' ? x : (d: T) => new Date(d[x]);
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

// export const aggregateChartData = (
//     inputData: VariationChartDataSet[],
//     groupBy: 'day' | 'week',
// ): VariationChartDataSet[] => {
//     if (groupBy === 'day') {
//         // Если выбрана группировка по дням, просто возвращаем исходные данные
//         return inputData;
//     }

//     // Логика агрегации по НЕДЕЛЯМ:
//     const weeklyDataSets: VariationChartDataSet[] = [];

//     inputData.forEach((dataSet) => {
//         // Map для сбора данных по каждой неделе: Ключ: 'YYYY-MM-DD' -> Значение: { totalRateSum: number, count: number }
//         const weeklyMap = new Map<string, {totalRateSum: number; count: number}>();

//         dataSet.data.forEach((dailyStat) => {
//             const startOfWeekKey = dayjs(dailyStat.date).startOf('week').format('YYYY-MM-DD');

//             if (!weeklyMap.has(startOfWeekKey)) {
//                 weeklyMap.set(startOfWeekKey, {totalRateSum: 0, count: 0});
//             }

//             const weeklyStats = weeklyMap.get(startOfWeekKey)!;

//             // Суммируем ежедневные коэффициенты и считаем количество дней
//             weeklyStats.totalRateSum += dailyStat.conversionRate;
//             weeklyStats.count += 1;
//         });

//         // Преобразуем Map обратно в массив ChartStatistics
//         const weeklyChartStatistics: ChartStatistics[] = [];
//         weeklyMap.forEach((metrics, period) => {
//             // Расчет среднего коэффициента конверсии за неделю
//             const averageConversionRate = metrics.totalRateSum / metrics.count;

//             weeklyChartStatistics.push({
//                 date: period,
//                 conversionRate: parseFloat(averageConversionRate.toFixed(2)),
//             });
//         });

//         // Сортируем итоговые данные по дате и добавляем в результат
//         weeklyDataSets.push({
//             id: dataSet.id,
//             name: dataSet.name,
//             data: weeklyChartStatistics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
//         });
//     });

//     return weeklyDataSets;
// };

function aggregateStatistics(statistics: ChartStatistics[]): ChartStatistics[] {
    if (statistics.length === 0) return [];

    // 1. Сортируем данные по дате, чтобы найти самую раннюю дату
    const sortedStats = [...statistics].sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
    const startDate = dayjs(sortedStats[0].date).startOf('day'); // Начало дня первой даты
    const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

    type WeeklyAccumulatorEntry = {
        date: string; // ISO string начала недели
        sumRate: number;
        count: number;
        weekLabel: string;
    };

    const weeklyAccumulator: {[key: string]: WeeklyAccumulatorEntry} = {};

    sortedStats.forEach((item) => {
        const currentDate = dayjs(item.date);

        // 2. Рассчитываем количество полных недель, прошедших с startDate
        const diffTime = currentDate.valueOf() - startDate.valueOf();
        const weekIndex = Math.floor(diffTime / MS_PER_WEEK); // Индекс 0, 1, 2...

        // 3. Рассчитываем фактическую дату начала этой "пользовательской" недели
        const weekStartDate = startDate.add(weekIndex * 7, 'day');
        const weekKey = weekStartDate.toISOString();

        if (!weeklyAccumulator[weekKey]) {
            const weekEndDate = weekStartDate.add(6, 'day');
            weeklyAccumulator[weekKey] = {
                date: weekStartDate.toISOString(),
                sumRate: 0,
                count: 0,
                weekLabel: `${weekStartDate.format('DD MMM')} - ${weekEndDate.format('DD MMM')}`,
            };
        }

        weeklyAccumulator[weekKey].sumRate += item.conversionRate;
        weeklyAccumulator[weekKey].count += 1;
    });

    // 4. Финализируем и сортируем результат
    const result: ChartStatistics[] = Object.values(weeklyAccumulator).map((weekStats) => ({
        date: weekStats.date,
        conversionRate: parseFloat((weekStats.sumRate / weekStats.count).toFixed(2)),
        weekLabel: weekStats.weekLabel,
    }));

    result.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    return result;
}

/**
 * Группирует данные статистики по неделям для всего набора вариаций.
 * Привязывает начало первой недели к самой первой дате в данных.
 */
export function aggregateChartData(dataSets: VariationChartDataSet[]): VariationChartDataSet[] {
    return dataSets.map((dataSet) => {
        const aggregatedData = aggregateStatistics(dataSet.data);

        return {
            ...dataSet,
            data: aggregatedData,
        };
    });
}
