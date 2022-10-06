// @ts-check

import { parseFromFile } from './src/parse.mjs';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

const files = await readdir('machines');
for (const fn of files) {
    console.info(`Testing machine ${fn}`);
    const configuration = await parseFromFile(resolve('machines', fn));
    configuration.test();
}
