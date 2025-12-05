import {useState} from 'react';
import {formatDate} from '../../../shared/api/logic/date';
import {AreaChart} from '../../../ui/components/Chart/AreaChart/AreaChart';
import {AxisX} from '../../../ui/components/Chart/Axes/AxisX';
import {AxisY} from '../../../ui/components/Chart/Axes/AxisY';
import {Chart} from '../../../ui/components/Chart/Chart/Chart';
import {GridColumns} from '../../../ui/components/Chart/Grid/GridColumns';
import {GridRows} from '../../../ui/components/Chart/Grid/GridRows';
import {LineChart} from '../../../ui/components/Chart/LineChart/LineChart';
import {SmoothChart} from '../../../ui/components/Chart/SmoothChart/SmoothChart';
import {Tooltip} from '../../../ui/components/Chart/Tooltip/Tooltip';
import {getMinMax} from '../logic';
import {StatisticsActions} from '../StatisticsActions/StatisticsActions';
import type {ChartSettings} from '../types';
import {CHART_COLORS} from './constants';
import {aggregateChartData, convertRawStatisticsToChartData, getRawStatistics} from './logic';
import styles from './styles.module.css';

export function Statistics() {
    const data = getRawStatistics();
    const chartData = convertRawStatisticsToChartData(data);

    const variationOptions = chartData.map((item) => ({value: item.id, label: item.name}));
    const variationLabels = variationOptions.map((item) => item.label);

    const [settings, setSettings] = useState<ChartSettings>({
        lineStyle: 'line',
        groupBy: 'day',
        variations: chartData.map((item) => item.id),
    });

    const _filteredData = chartData.filter((data) => settings.variations.includes(data.id));
    const filteredData = settings.groupBy === 'week' ? aggregateChartData(_filteredData) : _filteredData;

    const labels = {
        labels: [...new Set(filteredData.flatMap((data) => data.data).map((item) => item.date))],
    };

    const allDataPoints = filteredData.flatMap((data) => data.data);
    const minMaxConversionRate = getMinMax(allDataPoints, 'conversionRate')[0];

    const minMaxY = {
        min: 0,
        max: minMaxConversionRate.max ?? 0,
    };

    const updateSetting = <K extends keyof ChartSettings>(key: K, value: ChartSettings[K]) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const axesTickFormat = () => '';

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <StatisticsActions
                    settings={settings}
                    updateSetting={updateSetting}
                    variationOptions={variationOptions}
                />
            </div>

            <Chart size="lg" className={styles.chart} x={labels} y={minMaxY}>
                <GridColumns dashed count={10} />
                <GridRows count={5} />

                <AxisX hideTicks tickFormat={(v) => `${formatDate(v as unknown as string)}`} />
                <AxisX hideTicks position="top" tickFormat={axesTickFormat} />
                <AxisY hideTicks tickFormat={(v) => `${v}%`} count={5} />
                <AxisY hideTicks position="right" tickFormat={axesTickFormat} />

                {filteredData.map((data, index) => {
                    const color = CHART_COLORS[index] ?? undefined;

                    switch (settings.lineStyle) {
                        case 'line':
                            return (
                                <LineChart
                                    key={data.id}
                                    data={data.data}
                                    color={color}
                                    xKey="date"
                                    yKey="conversionRate"
                                />
                            );
                        case 'line_curve':
                            return (
                                <LineChart
                                    key={data.id}
                                    data={data.data}
                                    color={color}
                                    xKey="date"
                                    yKey="conversionRate"
                                    curve
                                />
                            );
                        case 'area':
                            return (
                                <AreaChart
                                    key={data.id}
                                    data={data.data}
                                    color={color}
                                    xKey="date"
                                    yKey="conversionRate"
                                    curve
                                />
                            );
                        case 'smooth':
                            return (
                                <SmoothChart
                                    key={data.id}
                                    data={data.data}
                                    color={color}
                                    xKey="date"
                                    yKey="conversionRate"
                                />
                            );
                        default:
                            return null;
                    }
                })}

                <Tooltip showVerticalLine labels={variationLabels} />
            </Chart>
        </div>
    );
}
