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
export const App = () => {
    useBeforeRender(() => {
        shell.exec('clear');
    }, []);
    const [percent, setPercent] = useState(0);
    const { yamlConfig, isError, isLoading } = useYamlConfig();
    const commandNames = yamlConfig
        ? Object.keys(yamlConfig.commandList)
        : undefined;
    const [isMenuFocused, setMenuFocus] = useState(true);
    useProcessResultReset(isMenuFocused, setPercent);
    return (React.createElement(React.Fragment, null,
        React.createElement(Text, null,
            chalk.hex('#ff0055').italic.bgWhiteBright(' cliper '),
            " \u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432"),
        React.createElement(Text, null, " "),
        React.createElement(Text, null,
            chalk.bgBlue(' INFO '),
            " \u0421\u0442\u0440\u0435\u043B\u043A\u0430\u043C\u0438 update tst \u0432\u0432\u0435\u0440\u0445 \u0438 \u0432\u043D\u0438\u0437 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430"),
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
                });
            }, items: commandNames?.map((commandName) => ({
                label: commandName,
                key: commandName,
                value: yamlConfig?.commandList[commandName],
            })), indicatorComponent: ({ isSelected }) => isSelected ? (React.createElement(Text, { color: "#ffff86" },
                percent === 100 ? 'done' : null,
                " ",
                figures.pointer)) : null, itemComponent: ({ isSelected, label }) => isSelected ? (React.createElement(Text, { color: "#ff5eea" },
                ' ',
                label,
                " ",
                percent === 100 || percent === 0 ? null : percent)) : (React.createElement(Text, { color: "#aaeef3" },
                ' ' + ' ',
                label)), initialIndex: 2 })),
        React.createElement(HiddenMenu, { indicatorComponent: () => null, items: [{ label: '', value: '' }], isFocused: !isMenuFocused })));
};
