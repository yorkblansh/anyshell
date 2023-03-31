import { StdHandler } from '../../interfaces/StdHandler.interface.js'

export const defaultHandler: StdHandler = (childProcess, callback) => {
	childProcess.on('close', (code, signal) => {
		if (code !== null) callback({ exitCode: code })
	})
}
