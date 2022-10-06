// @ts-check

import { parseFromFile } from './src/parse.mjs';

const fn = process.argv[2];
if (!fn) {
    console.info(`Usage: node index.mjs <file.tm>`);
}

const configuration = await parseFromFile(fn);
configuration.test();
