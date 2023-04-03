export type Setup = 'npm_script' | 'docker_compose' | 'default'

export interface Command {
	cmd: string
	setup?: Setup
}

export interface YamlConfig {
	commands: { [commandName: string]: Command }
}
