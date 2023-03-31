export const defaultHandler = (childProcess, callback) => {
    childProcess.on('close', (code, signal) => {
        if (code !== null)
            callback({ exitCode: code });
    });
};
