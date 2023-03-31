import shelljs from 'shelljs';
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js';
export const commandExecutor = ({ shellCommand, setup }, callback) => {
    const childProcess = shelljs.exec(shellCommand, { async: true, silent: true });
    const handlersMap = {
        docker_compose: dockerComposeHandler,
        default: () => { },
    };
    setup
        ? handlersMap[setup](childProcess, callback)
        : handlersMap['default'](childProcess, callback);
};
