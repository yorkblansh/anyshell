import { Command, Setup } from '../interfaces/YamlConfig.interface.js'
import { ExecutionCallbackProps } from '../interfaces/ExecutorCallbackProps.interface.js'
import shelljs from 'shelljs'
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js'
import { StdHandler } from '../interfaces/StdHandler.interface.js'
import { logger } from './logger.js'

export const commandExecutor = (
	{ cmd, setup }: Command,
	callback: (executionCallbackProps: ExecutionCallbackProps) => void,
	_logger?: typeof logger,
) => {
	const childProcess = shelljs.exec(cmd, { async: true, silent: true })
	const handlersMap: { [everyName in Setup]: StdHandler } = {
		docker_compose: dockerComposeHandler,
		default: () => {},
	}

	setup
		? handlersMap[setup](childProcess, callback, logger)
		: handlersMap['default'](childProcess, callback, logger)
}
