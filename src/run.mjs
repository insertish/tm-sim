// @ts-check

export function run(configuration, input, options = { max_steps: 10000 }) {
    const state = {
        memory: {},
        pointer: 0,
        state: configuration.init,
        accepted: false
    };

    input.forEach((v, i) => state.memory[i] = v);

    function read() {
        if (!state.memory[state.pointer])
            state.memory[state.pointer] = '_';
        
        return state.memory[state.pointer];
    }

    function write(v) {
        if (v === '-') return;
        state.memory[state.pointer] = v;
    }

    let steps = 0;
    while (state != configuration.accept) {
        if (++steps > options.max_steps) {
            break;
        }

        const value = read();
        const directions = configuration.graph[state.state] ?? {};

        const task = directions[value];
        if (task) {
            state.state = task.target;
            write(task.write);

            if (task.direction === '>') {
                state.pointer++;
            } else if (task.direction === '<') {
                state.pointer--;
            }

            if (state.state === configuration.accept) {
                break;
            }
        } else {
            break;
        }
    }

    if (state.state === configuration.accept) {
        state.accepted = true;
    }

    return state;
}
