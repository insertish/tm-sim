// @ts-check

import { inspect } from "util";
import { run } from "./run.mjs";

export function dbg(v) {
    console.info(inspect(v, false, 100, true));
}

export function assertAccepted(configuration, input) {
    const result = run(configuration, input);
    if (!result.accepted) {
        console.info(configuration);
        throw `Did not accept ${input}!`;
    }

    console.info(`Accepted on input ${input}`);
}

export function assertRejected(configuration, input) {
    const result = run(configuration, input);
    if (result.accepted) {
        console.info(configuration);   
        throw `Did not reject ${input}!`;
    }
    
    console.info(`Rejected on input ${input}`);
}
