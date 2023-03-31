import { useInput } from 'ink';
/**
 * clean command rersults (`done` or `error`) from screen after command had been done
 */
export const useProcessResultReset = (predicat, setPercent) => useInput((input, key) => {
    if (predicat) {
        if (key.downArrow || key.upArrow) {
            setPercent(0);
        }
    }
});
