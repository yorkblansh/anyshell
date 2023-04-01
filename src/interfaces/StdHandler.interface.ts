import { ChildProcess } from 'child_process'
import { ExecutionCallbackProps } from './ExecutorCallbackProps.interface.js'
import { logger } from '../utils/logger.js'

export type StdHandler = (
	childProcess: ChildProcess,
	callback: (executorCallbackProps: ExecutionCallbackProps) => void,
	_logger: typeof logger,
) => void
