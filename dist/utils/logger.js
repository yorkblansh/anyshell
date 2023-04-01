export const logger = () => {
    return {
        log: (smth) => console.dir(smth, {
            colors: true,
            depth: null,
            showHidden: true,
        }),
    };
};
