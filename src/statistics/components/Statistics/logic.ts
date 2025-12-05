import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import statistics from '../../../mocks/statistics.json';
import type {ChartStatistics, VariationChartDataSet, VariationStatistics} from './types';

dayjs.extend(weekOfYear);

export const getRawStatistics = () => {
    return statistics as VariationStatistics;
};

export const convertRawStatisticsToChartData = (data: VariationStatistics) => {
    const variationIds = data.variations.map((variation) => String(variation.id ?? ''));

    return variationIds.map((id) => {
        const variationMeta = data.variations.find((v) => (v.id?.toString() || '0') === id);
        const name = variationMeta?.name || `Variation ${id}`;

        const variationData: ChartStatistics[] = data.data.map((dataPoint) => {
            const visits = dataPoint.visits[id] || 0;
            const conversions = dataPoint.conversions[id] || 0;

            const rate = visits > 0 ? (conversions / visits) * 100 : 0;

            return {
                date: dataPoint.date,
                conversionRate: parseFloat(rate.toFixed(2)),
            };
        });

        return {
            id,
            name,
            data: variationData,
        };
    });
};

function aggregateStatistics(statistics: ChartStatistics[]) {
    if (statistics.length === 0) {
        return [];
    }

    const sortedStats = [...statistics].sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
    const startDate = dayjs(sortedStats[0].date).startOf('day');
    const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

    type WeeklyAccumulatorEntry = {
        date: string;
        sumRate: number;
        count: number;
        weekLabel: string;
    };

    const weeklyAccumulator: {[key: string]: WeeklyAccumulatorEntry} = {};

    sortedStats.forEach((item) => {
        const currentDate = dayjs(item.date);

        const diffTime = currentDate.valueOf() - startDate.valueOf();
        const weekIndex = Math.floor(diffTime / MS_PER_WEEK);

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

    const result: ChartStatistics[] = Object.values(weeklyAccumulator).map((weekStats) => ({
        date: weekStats.date,
        conversionRate: parseFloat((weekStats.sumRate / weekStats.count).toFixed(2)),
        weekLabel: weekStats.weekLabel,
    }));

    result.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    return result;
}

export function aggregateChartData(dataSets: VariationChartDataSet[]) {
    return dataSets.map((dataSet) => {
        const aggregatedData = aggregateStatistics(dataSet.data);

        return {
            ...dataSet,
            data: aggregatedData,
        };
    });
}
