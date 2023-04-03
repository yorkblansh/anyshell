import { StdHandler } from '../../interfaces/StdHandler.interface.js'
import _ from 'lodash'

export const npmScriptHandler: StdHandler = (
	childProcess,
	callback,
	logger,
) => {
	childProcess.on('close', (code, signal) => {
		if (code !== null) callback({ exitCode: code })
	})
}
