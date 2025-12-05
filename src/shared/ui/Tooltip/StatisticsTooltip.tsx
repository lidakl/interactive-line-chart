import type {ChartStatistics} from '../../api/types/types';
import type {CustomTooltipProps} from './types';

export const StatisticsTooltip = ({data}: CustomTooltipProps<[ChartStatistics]>) => {
    return <span>{data[0].date}</span>;
};
