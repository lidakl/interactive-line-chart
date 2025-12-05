import {useState} from 'react';
import {formatDate} from './shared/api/logic/date';
import {convertRawStatisticsToChartData, getRawStatistics} from './shared/api/logic/statistics';
import {AreaChart} from './shared/ui/AreaChart/AreaChart';
import {AxisX} from './shared/ui/Axes/AxisX';
import {AxisY} from './shared/ui/Axes/AxisY';
import {Chart} from './shared/ui/Chart/Chart';
import {GridColumns} from './shared/ui/Grid/GridColumns';
import {GridRows} from './shared/ui/Grid/GridRows';
import {LineChart} from './shared/ui/LineChart/LineChart';
import {aggregateChartData, getMinMax} from './shared/ui/logic';
import {SmoothChart} from './shared/ui/SmoothChart/SmoothChart';
import {StatisticsActions} from './shared/ui/StatisticsActions/StatisticsActions';
import {Tooltip} from './shared/ui/Tooltip/Tooltip';
import type {ChartSettings} from './shared/ui/types';
// eslint-disable-next-line boundaries/no-unknown
import styles from './styles.module.css';

const CHART_COLORS = [
    'var(--y-chart-first)',
    'var(--y-chart-second)',
    'var(--y-chart-third)',
    'var(--y-chart-fourth)',
    'var(--y-chart-fifth)',
];

export function App() {
    const data = getRawStatistics();
    const chartData = convertRawStatisticsToChartData(data);
    // const chartDataFlat = chartData.flatMap((dataset) => dataset.data);
    const variationOptions = chartData.map((item) => ({value: item.id, label: item.name}));

    const [settings, setSettings] = useState<ChartSettings>({
        lineStyle: 'line',
        groupBy: 'day',
        variations: variationOptions.map((item) => item.value),
    });

    const variationLabels = variationOptions.map((item) => item.label);

    const _filteredData = chartData.filter((dataSet) => settings.variations.includes(dataSet.id));
    const filteredData = settings.groupBy === 'week' ? aggregateChartData(_filteredData) : _filteredData;

    const labels = {
        labels: filteredData.flatMap((dataset) => dataset.data).map((item) => item.date),
    };

    const minMax_1 = getMinMax(
        filteredData.flatMap((dataset) => dataset.data),
        'conversionRate',
    )[0];

    const minMaxY = {
        min: 0,
        max: minMax_1.max ?? 0,
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

                {settings.lineStyle === 'line' && (
                    <>
                        {filteredData.map((data, index) => (
                            <LineChart
                                data={data.data}
                                color={CHART_COLORS[index] ?? undefined}
                                xKey="date"
                                yKey="conversionRate"
                            />
                        ))}
                    </>
                )}

                {settings.lineStyle === 'line_curve' && (
                    <>
                        {filteredData.map((data, index) => (
                            <LineChart
                                data={data.data}
                                color={CHART_COLORS[index] ?? undefined}
                                xKey="date"
                                yKey="conversionRate"
                                curve
                            />
                        ))}
                    </>
                )}

                {settings.lineStyle === 'area' && (
                    <>
                        {filteredData.map((data, index) => (
                            <AreaChart
                                data={data.data}
                                xKey="date"
                                yKey="conversionRate"
                                curve
                                color={CHART_COLORS[index]}
                            />
                        ))}
                    </>
                )}
                {settings.lineStyle === 'smooth' && (
                    <>
                        {filteredData.map((data, index) => (
                            <SmoothChart
                                data={data.data}
                                xKey="date"
                                yKey="conversionRate"
                                color={CHART_COLORS[index]}
                            />
                        ))}
                    </>
                )}

                <Tooltip showVerticalLine labels={variationLabels} />
            </Chart>
        </div>
    );
}

export default App;
