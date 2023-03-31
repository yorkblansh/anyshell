import { useEffect, useState } from 'react'

export const useBeforeRender = (
	effect: React.EffectCallback,
	deps?: React.DependencyList | undefined,
) => {
	const [isRun, setIsRun] = useState(false)

	if (!isRun) {
		effect()
		setIsRun(true)
	}

	useEffect(() => () => setIsRun(false), deps)
}
