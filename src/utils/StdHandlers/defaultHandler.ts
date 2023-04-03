import { StdHandler } from '../../interfaces/StdHandler.interface.js'

export const defaultHandler: StdHandler = (childProcess, callback, logger) => {
	childProcess.on('close', (code, signal) => {
		logger().log(code)
		if (code !== null) callback({ exitCode: code })
	})
}
