import shelljs from 'shelljs';
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js';
import { logger } from './logger.js';
export const commandExecutor = ({ cmd, setup }, callback, _logger) => {
    const childProcess = shelljs.exec(cmd, { async: true, silent: true });
    const handlersMap = {
        docker_compose: dockerComposeHandler,
        default: () => { },
    };
    setup
        ? handlersMap[setup](childProcess, callback, logger)
        : handlersMap['default'](childProcess, callback, logger);
};
