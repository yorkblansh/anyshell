export type Setup = 'docker_compose' | 'default'

export interface Command {
	shellCommand: string
	silent?: boolean
	async?: boolean
	setup?: Setup
}

export interface YamlConfig {
	commandList: { [commandName: string]: Command }
}
