#!/usr/bin/env node
import React, { useState } from 'react'
import chalk from 'chalk'
import Menu from 'ink-select-input'
import HiddenMenu from 'ink-select-input'
import { Text } from 'ink'
import shell from 'shelljs'
import _ from 'lodash'
import Spinner from 'ink-spinner'
import figures from 'figures'
import { useBeforeRender } from './hooks/useBeforeRender.js'
import { useYamlConfig } from './hooks/useYamlConfig.js'
import { commandExecutor } from './utils/commandExecutor.js'
import { useProcessResultReset } from './hooks/useProcessResultsReset.js'
import { logger } from './utils/logger.js'

export const App = () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])
	const [isScriptDone, setIsScriptDone] = useState(true)
	const [percent, setPercent] = useState(0)
	useProcessResultReset(isScriptDone, setPercent)

	const { yamlConfig, isError, isLoading } = useYamlConfig()

	const commandNames = yamlConfig ? Object.keys(yamlConfig.commands) : undefined

	return (
		<>
			<Text>
				{chalk.hex('#ff0055').italic.bgWhiteBright(' anyshell ')} cli app to run
				your scripts
			</Text>
			<Text> </Text>
			<Text>
				{chalk.bgBlue(' INFO ')} use up and down arrows to select script
			</Text>
			{isLoading ? (
				<Text>
					Чтение конфига:{' '}
					{chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml ')}
				</Text>
			) : isError ? (
				<Text>
					Не найден конфиг-файл:{' '}
					{chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml ')}
				</Text>
			) : (
				<Menu
					isFocused={isScriptDone}
					onSelect={(item) => {
						setIsScriptDone(false)
						commandExecutor(
							item.value!,
							(callbackProps) => {
								if (callbackProps.exitCode === 0) {
									setIsScriptDone(true)
									setPercent(100)
								} else {
									setIsScriptDone(false)
								}



								if (callbackProps.percentage)
									setPercent(callbackProps.percentage)
							},
							logger,
						)
					}}
					items={commandNames?.map((commandName) => ({
						label: commandName,
						key: commandName,
						value: yamlConfig?.commands[commandName],
					}))}
					indicatorComponent={({ isSelected }) =>
						isSelected ? (
							<Text color="#ffff86">
								{percent === 100 ? 'done' : null} {figures.pointer}{' '}
								{isScriptDone ? null : <Spinner type="circle" />}
							</Text>
						) : null
					}
					itemComponent={({ isSelected, label }) =>
						isSelected ? (
							<Text color="#ff5eea">
								{label} {percent === 100 || percent === 0 ? null : percent}
								{/* {percent !== 0 ? percent : percent === 100 ? null : percent} */}
							</Text>
						) : (
							<Text color="#aaeef3">
								{' ' + ' '}
								{label}
							</Text>
						)
					}
					initialIndex={2}
				/>
			)}
			<HiddenMenu
				indicatorComponent={() => null}
				items={[{ label: '', value: '' }]}
				isFocused={!isScriptDone}
			/>
		</>
	)
}
