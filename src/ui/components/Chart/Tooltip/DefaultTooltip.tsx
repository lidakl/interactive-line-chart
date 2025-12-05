import {CiTrophy} from 'react-icons/ci';
import {FaCalendar} from 'react-icons/fa';
import {useChartContext} from '../Chart/ChartContext';
import {TooltipItem} from './TooltipItem';
import type {DefaultTooltipProps} from './types';
import styles from './styles.module.css';

export const DefaultTooltip = <T extends object>(props: DefaultTooltipProps<T>) => {
    const {labels, data, valueColor, labelColor} = props;
    const {
        mainKey: _mainKey,
        mainKeyFormat: _mainKeyFormat,
        yKeyFormat: _yKeyFormat,
        keys: _keys,
        colors: _colors,
    } = useChartContext();
    const mainKey = _mainKey.current;
    const mainKeyFormat = _mainKeyFormat.current;
    const yKeyFormat = _yKeyFormat.current;
    const ids = Object.keys(_keys.current);
    const keys = Object.values(_keys.current);
    const colors = Object.values(_colors.current);

    const title =
        typeof mainKey === 'function' ? mainKey(data?.nearestDatum?.datum ?? {}) : data?.nearestDatum?.datum[mainKey];

    const tooltipItems: {label: string; value?: string | number; color: string}[] = [];
    labels.map((label, labelIndex) => {
        let tooltipLabel: string;
        let tooltipSubLabel: string[];

        if (typeof label === 'string') {
            tooltipLabel = label;
        } else {
            tooltipLabel = Object.keys(label)[0];
            tooltipSubLabel = Object.values(label)[0];
        }

        keys[labelIndex]?.forEach((key, index) => {
            const label = tooltipSubLabel ? `${tooltipLabel}, ${tooltipSubLabel[index]}` : tooltipLabel;
            const value =
                typeof key === 'function'
                    ? key(data?.datumByKey[ids[labelIndex]].datum ?? ({} as T))
                    : data?.datumByKey[ids[labelIndex]]?.datum[key];
            const color = colors[labelIndex][index];
            tooltipItems.push({label, value, color});
        });
    });

    const sortedTooltipItems = [...tooltipItems].sort((a, b) => {
        if (typeof a.value === 'number' && typeof b.value === 'number') {
            return b.value - a.value;
        }

        return 0;
    });

    return (
        <div className={styles.default}>
            <div className={styles.header}>
                <FaCalendar className={styles.icon} size={20} />
                <span className={styles.date}>{mainKeyFormat ? mainKeyFormat(title) : title}</span>
            </div>
            {sortedTooltipItems.map(({value, label, color}, itemIndex) => {
                const showTrophy = typeof value === 'number' && itemIndex === 0;

                return (
                    <div key={itemIndex}>
                        {keys[itemIndex]?.map((_, index) => {
                            return (
                                <TooltipItem key={index} color={color}>
                                    <span style={labelColor ? {color: labelColor} : {}} className={styles.label}>
                                        {label}
                                        {showTrophy && (
                                            <CiTrophy
                                                size={12}
                                                style={{transform: 'scale(2)'}}
                                                className={styles.icon}
                                            />
                                        )}
                                    </span>
                                    <span style={valueColor ? {color: valueColor} : {}}>
                                        {yKeyFormat ? yKeyFormat(value) : value}
                                    </span>
                                </TooltipItem>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
