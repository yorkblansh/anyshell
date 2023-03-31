import { Command, Setup } from '../interfaces/YamlConfig.interface.js'
import { ExecutionCallbackProps } from '../interfaces/ExecutorCallbackProps.interface.js'
import shelljs from 'shelljs'
import { dockerComposeHandler } from './StdHandlers/dockerComposeHandler.js'
import { StdHandler } from '../interfaces/StdHandler.interface.js'

export const commandExecutor = (
	{ shellCommand, setup }: Command,
	callback: (executionCallbackProps: ExecutionCallbackProps) => void,
) => {
	const childProcess = shelljs.exec(shellCommand, { async: true, silent: true })
	const handlersMap: { [everyName in Setup]: StdHandler } = {
		docker_compose: dockerComposeHandler,
		default: () => {},
	}

	setup
		? handlersMap[setup](childProcess, callback)
		: handlersMap['default'](childProcess, callback)
}
