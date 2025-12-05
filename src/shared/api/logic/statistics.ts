import statistics from '../mocks/statistics.json';
import type {ChartStatistics, VariationChartDataSet, VariationStatistics} from '../types/types';

export const getRawStatistics = () => {
    return statistics as VariationStatistics;
};

export const convertRawStatisticsToChartData = (data: VariationStatistics) => {
    // const variationIds = Object.keys(data.data?.[0]?.visits || {});
    const variationIds = data.variations.map((variation) => String(variation.id ?? ''));

    // 2. Преобразуем данные в массив наборов данных для каждой вариации
    const finalChartData: VariationChartDataSet[] = variationIds.map((id) => {
        // Находим имя вариации
        const variationMeta = data.variations.find((v) => (v.id?.toString() || '0') === id);
        const name = variationMeta?.name || `Variation ${id}`;

        // Преобразуем данные для конкретно этой вариации
        const dataForThisVariation: ChartStatistics[] = data.data.map((dataPoint) => {
            const visits = dataPoint.visits[id] || 0;
            const conversions = dataPoint.conversions[id] || 0;

            const rate = visits > 0 ? (conversions / visits) * 100 : 0;

            return {
                // date: new Date(dataPoint.date),
                date: dataPoint.date,
                conversionRate: parseFloat(rate.toFixed(2)),
            };
        });

        return {
            id,
            name,
            data: dataForThisVariation,
        };
    });

    return finalChartData;
};
