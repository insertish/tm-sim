// @ts-check

import { readFile } from 'fs/promises';

const s = await readFile('machine_src/binaryPalindrome.tm.asm').then(x => x.toString());

const RE_BLOCK = /([=:{])/g;
const RE_EOL = /$/m;

/**
 * @param {string} input Source code
 */
function transpile(input) {
    // current state block
    /** @type {{ name: string, directions: Record<string, { state: string, write: string, direction: string }> } | undefined} */
    let currentState;

    let pointer = 0;
    while (pointer < input.length) {
        RE_BLOCK.lastIndex = pointer;

        const result = RE_BLOCK.exec(input);
        if (result) {
            const blockChar = result[0];
            if (!currentState && blockChar === '{') {
                throw "Tried to open top-level direction.";
            }

            const blockName = input.substring(pointer, result.index).trim();
            if (blockChar === '=') {
                // Read metadata to EOL
                RE_EOL.lastIndex = result.index;
                const eol = RE_EOL.exec(input);
                if (!eol) throw "Could not seek to EOL!";

                pointer = eol.index;
                const value = input.substring(result.index + 1, eol.index).trim();
                console.info(`${blockName} = ${value}`);
            } else {
                if (currentState) {
                    // TODO: commit
                }

                // Begin new block
                

                break;
            }
        } else {
            // TODO: trim string
            console.info('Unexpected EOF');
            break;
        }

        if (currentState) {
            // TODO: commit
        }

        // break;
    }
}

transpile(s);
