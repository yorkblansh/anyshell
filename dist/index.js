#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { App } from './ui.js';
import { Command } from 'commander';
const program = new Command();
program.option('--debug_logs');
program.parse();
render(React.createElement(App, null));
