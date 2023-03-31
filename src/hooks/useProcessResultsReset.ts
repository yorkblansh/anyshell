import { useInput } from 'ink'
import { Dispatch, SetStateAction } from 'react'

/**
 * clean command rersults (`done` or `error`) from screen after command had been done
 */
export const useProcessResultReset = (
	predicat: boolean,
	setPercent: Dispatch<SetStateAction<number>>,
) =>
	useInput((input, key) => {
		if (predicat) {
			if (key.downArrow || key.upArrow) {
				setPercent(0)
			}
		}
	})
