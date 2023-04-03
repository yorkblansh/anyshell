export const npmScriptHandler = (childProcess, callback, logger) => {
    childProcess.on('close', (code, signal) => {
        if (code !== null)
            callback({ exitCode: code });
    });
};
