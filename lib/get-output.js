'use strict';

const indentString = require('indent-string');
const figures = require('figures');
const table = require('text-table');
const chalk = require('chalk');
const {
	STATE_DOWNLOADING,
	STATE_BUILDING,
	STATE_CLEANING,
	STATE_RUNNING,
	STATE_SUCCESS,
	STATE_ERROR
} = require('./states');

module.exports = (state, logs) => {
	const items = [];

	for (const [version, currentState] of state) {
		let message;
		let icon;

		if (currentState === STATE_DOWNLOADING) {
			message = chalk.grey('downloading base image');
			if (logs.has(version)) {
				message += '\n' + indentString(logs.get(version), 3);
			}
			icon = chalk.grey(figures.circleDotted);
		}

		if (currentState === STATE_BUILDING) {
			message = chalk.grey('building environment');
			if (logs.has(version)) {
				message += '\n' + indentString(logs.get(version), 3);
			}
			icon = chalk.grey(figures.circleDotted);
		}

		if (currentState === STATE_CLEANING) {
			message = chalk.grey('cleaning up');
			if (logs.has(version)) {
				message += '\n' + indentString(logs.get(version), 3);
			}
			icon = chalk.grey(figures.circleDotted);
		}

		if (currentState === STATE_RUNNING) {
			message = chalk.grey('running');
			if (logs.has(version)) {
				message += '\n' + indentString(logs.get(version), 3);
			}
			icon = chalk.grey(figures.circleDotted);
		}

		if (currentState === STATE_SUCCESS) {
			message = chalk.green('success');
			if (logs.has(version)) {
				message += '\n' + indentString(logs.get(version), 3);
			}
			icon = chalk.green(figures.tick);
		}

		if (currentState === STATE_ERROR) {
			message = chalk.red('error');
			icon = chalk.red(figures.cross);
		}

		items.push([icon, ` ${version}: `, message]);
	}

	return '\n' + indentString(table(items, {hsep: ''}), 1);
};
