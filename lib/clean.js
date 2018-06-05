'use strict';

const path = require('path');
const fs = require('fs');
const exec = require('execa');
const pify = require('pify');

const removeFile = pify(fs.unlink);

module.exports = context => {
	const image = `test-${context.name}-${context.version}`;
	const options = {cwd: context.cwd};

	return removeFile(path.join(context.cwd, `.${context.version}.dockerfile`))
		.then(() => {
			let output = '';
			const ps = exec('docker', ['rmi', image], options);
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
		});
};
