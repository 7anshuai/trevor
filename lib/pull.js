'use strict';

const path = require('path');
const exec = require('execa');

module.exports = context => {
	const image = path.join(context.registry, `node:${context.version}-onbuild`);

	return exec('docker', ['pull', image]).then(() => context);
};
