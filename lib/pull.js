'use strict';

const exec = require('execa');

module.exports = context => {
	const image = `node:${context.version}-onbuild`;

	let output = '';
	const ps = exec('docker', ['pull', image]);
	ps.stdout.on('data', chunk => {
		output += chunk;
	});

	ps.stderr.on('data', chunk => {
		output += chunk;
	});

	return ps.then(() => {
		context.output += output;
		return context;
	});
};
