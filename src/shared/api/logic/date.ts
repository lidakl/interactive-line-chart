import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY';

export const formatDate = (date: string, format = DATE_FORMAT) => {
    return dayjs(date).format(format);
};
