INIT=qInit

qInit:
    _ {
        state qAccept
    }
    0 {
        state q0Seek
    }
    1 {
        state q1Seek
    }

q0Seek:
    _ {
        move left
        state q0Check
    }
