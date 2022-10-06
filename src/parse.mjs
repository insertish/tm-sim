// @ts-check

import { readFile } from "fs/promises";
import { assertAccepted, assertRejected } from "./debug.mjs";

const RE_FRONTMATTER = /^(\w+): ([^\n]+)$/;
const RE_INPUT = /^([\w\d_]+),([\w\d_]+)$/;
const RE_OUTPUT = /^([\w\d_]+),([\w\d_]+),([<>-])$/;

function testRunner() {
    for (const [accept, input] of this.tests) {
        (accept ? assertAccepted : assertRejected)(this, input);
    }
}

export function parse(input) {
    const instructions = input
        .split('\n')
        .map(v => v.trim())
        .filter(v => v && !v.startsWith('#') && !v.startsWith('//'));

    let configuration = {
        init: null,
        accept: null,
        graph: {},
        /** @type {[boolean, string[]][]} */
        tests: [],

        test: testRunner
    };

    /** @type {{ cell: string, read: string } | null} */
    let inputValue = null;    
    for (const instruction of instructions) {
        if (RE_INPUT.test(instruction)) {
            const line = RE_INPUT.exec(instruction);
            if (line) {
                const [ _, cell, read ] = line;
                inputValue = { cell, read };
            }
        } else if (RE_OUTPUT.test(instruction) && inputValue) {
            const line = RE_OUTPUT.exec(instruction);
            if (line) {
                const [ _, target, write, direction ] = line;
                const { cell, read } = inputValue;

                if (!configuration.graph[cell]) {
                    configuration.graph[cell] = {};
                }

                configuration.graph[cell][read] = {
                    target, write, direction
                };
            }
        } if (RE_FRONTMATTER.test(instruction)) {
            const line = RE_FRONTMATTER.exec(instruction);
                if (line) {
                    const [_, key, value] = line;
                
                if (key in configuration) {
                    configuration[key] = value;
                }

                if (key === 'testAccept' || key === 'testReject') {
                    configuration.tests.push([
                        key === 'testAccept',
                        value.trim().split(',')
                    ]);
                }
            }
        }
    }
    
    return configuration;
}

export async function parseFromFile(fn) {
    const source = await readFile(fn).then(f => f.toString());
    return parse(source);
}
