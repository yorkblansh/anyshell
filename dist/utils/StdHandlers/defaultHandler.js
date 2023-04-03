export const defaultHandler = (childProcess, callback, logger) => {
    console.log('default handler');
    childProcess.on('close', (code, signal) => {
        logger().log(code);
        if (code !== null)
            callback({ exitCode: code });
    });
    childProcess.stdout?.on('data', (chunk) => {
        logger().log({ data_chunk: chunk });
    });
    childProcess.stdout?.on('error', (chunk) => {
        logger().log({ error_chunk: chunk });
    });
    childProcess.stderr?.on('data', (chunk) => {
        logger().log({ error_chunk: chunk });
    });
};
