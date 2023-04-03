import shelljs from 'shelljs';
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js';
import { logger } from './logger.js';
import { defaultHandler } from './StdHandlers/defaultHandler.js';
import { npmScriptHandler } from './StdHandlers/npmScriptHandler.js';
export const commandExecutor = ({ cmd, setup }, callback, _logger) => {
    const childProcess = shelljs.exec(cmd, { async: true, silent: true });
    const handlersMap = {
        docker_compose: dockerComposeHandler,
        default: defaultHandler,
        npm_script: npmScriptHandler,
    };
    if (setup) {
        handlersMap[setup](childProcess, callback, logger);
    }
    else {
        handlersMap['default'](childProcess, callback, logger);
    }
};
