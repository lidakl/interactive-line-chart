import {useLocalStorage} from '@mantine/hooks';

const LOCAL_STORAGE_KEY = 'theme';

export const useTheme = () =>
    useLocalStorage({key: LOCAL_STORAGE_KEY, defaultValue: 'light', getInitialValueInEffect: false});
