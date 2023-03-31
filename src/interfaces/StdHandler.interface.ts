import { ChildProcess } from 'child_process'
import { ExecutionCallbackProps } from './ExecutorCallbackProps.interface.js'

export type StdHandler = (
	childProcess: ChildProcess,
	cb: (executorCallbackProps: ExecutionCallbackProps) => void,
) => void
