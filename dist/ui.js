#!/usr/bin/env node
import React, { useState } from 'react';
import chalk from 'chalk';
import Menu from 'ink-select-input';
import HiddenMenu from 'ink-select-input';
import { Text } from 'ink';
import shell from 'shelljs';
import figures from 'figures';
import { useBeforeRender } from './hooks/useBeforeRender.js';
import { useYamlConfig } from './hooks/useYamlConfig.js';
import { commandExecutor } from './utils/commandExecutor.js';
import { useProcessResultReset } from './hooks/useProcessResultsReset.js';
import { logger } from './utils/logger.js';
export const App = () => {
    useBeforeRender(() => {
        shell.exec('clear');
    }, []);
    const [percent, setPercent] = useState(0);
    const { yamlConfig, isError, isLoading } = useYamlConfig();
    const commandNames = yamlConfig
        ? Object.keys(yamlConfig.commands)
        : undefined;
    const [isMenuFocused, setMenuFocus] = useState(true);
    useProcessResultReset(isMenuFocused, setPercent);
    return (React.createElement(React.Fragment, null,
        React.createElement(Text, null,
            chalk.hex('#ff0055').italic.bgWhiteBright(' anyshell '),
            " cli app to run your scripts"),
        React.createElement(Text, null, " "),
        React.createElement(Text, null,
            chalk.bgBlue(' INFO '),
            " use up and down arrows to select script"),
        isLoading ? (React.createElement(Text, null,
            "\u0427\u0442\u0435\u043D\u0438\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0430:",
            ' ',
            chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml '))) : isError ? (React.createElement(Text, null,
            "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043A\u043E\u043D\u0444\u0438\u0433-\u0444\u0430\u0439\u043B:",
            ' ',
            chalk.hex('#ff0055').italic.bgWhiteBright(' .anyshell.yaml '))) : (React.createElement(Menu, { isFocused: isMenuFocused, onSelect: (item) => {
                setMenuFocus(false);
                commandExecutor(item.value, (callbackProps) => {
                    callbackProps.exitCode === 0
                        ? setMenuFocus(true)
                        : setMenuFocus(false);
                    if (callbackProps.percentage)
                        setPercent(callbackProps.percentage);
                }, logger);
            }, items: commandNames?.map((commandName) => ({
                label: commandName,
                key: commandName,
                value: yamlConfig?.commands[commandName],
            })), indicatorComponent: ({ isSelected }) => isSelected ? (React.createElement(Text, { color: "#ffff86" },
                percent === 100 ? 'done' : null,
                " ",
                figures.pointer)) : null, itemComponent: ({ isSelected, label }) => isSelected ? (React.createElement(Text, { color: "#ff5eea" },
                label,
                " ",
                percent === 100 || percent === 0 ? null : percent)) : (React.createElement(Text, { color: "#aaeef3" },
                ' ' + ' ',
                label)), initialIndex: 2 })),
        React.createElement(HiddenMenu, { indicatorComponent: () => null, items: [{ label: '', value: '' }], isFocused: !isMenuFocused })));
};
