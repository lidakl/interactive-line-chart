import {GroupBySelect} from '../GroupBySelect/GroupBySelect';
import {LineStyleSelect} from '../LineStyleSelect/LineStyleSelect';
import {ToggleTheme} from '../ToggleTheme/ThemeToggle';
import type {ChartSettings, Option} from '../types';
import {VariationMultiSelect} from '../VariationMultiSelect/VariationMultiSelect';
import styles from './styles.module.css';

interface Props {
    settings: ChartSettings;
    updateSetting: <K extends keyof ChartSettings>(key: K, value: ChartSettings[K]) => void;
    variationOptions: Option[];
}

export const StatisticsActions = ({settings, updateSetting, variationOptions}: Props) => {
    return (
        <div className={styles.actionsContainer}>
            <div className={styles.group}>
                <VariationMultiSelect
                    values={settings.variations}
                    onChange={(value) => updateSetting('variations', value)}
                    options={variationOptions}
                />
                <GroupBySelect value={settings.groupBy} onChange={(value) => updateSetting('groupBy', value)} />
            </div>

            <div className={styles.group}>
                <LineStyleSelect value={settings.lineStyle} onChange={(value) => updateSetting('lineStyle', value)} />
                <ToggleTheme />
            </div>
        </div>
    );
};
