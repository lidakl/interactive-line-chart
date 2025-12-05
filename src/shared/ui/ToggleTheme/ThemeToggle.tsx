import {useLayoutEffect} from 'react';
import {MdDarkMode, MdLightMode} from 'react-icons/md';
import {useTheme} from './hooks/useTheme';
import styles from './styles.module.css';

export const ToggleTheme = () => {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = newTheme;
        setTheme(newTheme);
    };

    useLayoutEffect(() => {
        if (theme) {
            document.documentElement.dataset.theme = theme;
        }
    }, [theme]);

    return (
        <>
            <button className={styles.themeToggle} onClick={toggleTheme}>
                {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
            </button>
        </>
    );
};
