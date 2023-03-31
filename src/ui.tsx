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

export const App = () => {
	useBeforeRender(() => {
		shell.exec('clear')
	}, [])

	const [percent, setPercent] = useState(0)

	const { yamlConfig, isError, isLoading } = useYamlConfig()

	const commandNames = yamlConfig
		? Object.keys(yamlConfig.commandList)
		: undefined

	const [isMenuFocused, setMenuFocus] = useState(true)

	useProcessResultReset(isMenuFocused, setPercent)

	return (
		<>
			<Text>
				{chalk.hex('#ff0055').italic.bgWhiteBright(' cliper ')} Приложение для
				запуска скриптов
			</Text>
			<Text> </Text>
			<Text>
				{chalk.bgBlue(' INFO ')} Стрелками update tst вверх и вниз выберите
				приложение для запуска
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
					isFocused={isMenuFocused}
					onSelect={(item) => {
						setMenuFocus(false)
						commandExecutor(item.value!, (callbackProps) => {
							callbackProps.exitCode === 0
								? setMenuFocus(true)
								: setMenuFocus(false)

							if (callbackProps.percentage) setPercent(callbackProps.percentage)
						})
					}}
					items={commandNames?.map((commandName) => ({
						label: commandName,
						key: commandName,
						value: yamlConfig?.commandList[commandName],
					}))}
					indicatorComponent={({ isSelected }) =>
						isSelected ? (
							<Text color="#ffff86">
								{percent === 100 ? 'done' : null} {figures.pointer}
							</Text>
						) : null
					}
					itemComponent={({ isSelected, label }) =>
						isSelected ? (
							<Text color="#ff5eea">
								{' '}
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
				isFocused={!isMenuFocused}
			/>
		</>
	)
}
