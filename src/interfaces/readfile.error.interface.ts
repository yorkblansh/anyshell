export interface ReadFileError {
	errno: number
	code: string
	syscall: string
	path: string
}
