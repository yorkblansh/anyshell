export const logger = () => {
	return {
		log: (smth: any) =>
			console.dir(smth, {
				colors: true,
				depth: null,
				showHidden: true,
			}),
	}
}
