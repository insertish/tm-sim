name: Binary Palindrome
init: qInit
accept: qAccept
testAccept: _
testAccept: 1
testAccept: 0
testAccept: 1,1
testAccept: 0,0
testAccept: 1,0,1
testAccept: 0,1,0
testAccept: 0,0,1,0,0
testReject: 1,1,0
testReject: 0,0,1

// read first digit
qInit,_
qAccept,_,-

qInit,0
qSeek0,0,>

qInit,1
qSeek1,1,>

// seek to end of string
qSeek0,_
qCheck0,_,<

qSeek0,0
qSeek0,0,>

qSeek0,1
qSeek0,1,>

qSeek1,_
qCheck1,_,<

qSeek1,0
qSeek1,0,>

qSeek1,1
qSeek1,1,>

// check if end of string matches
qCheck0,0
qSeekStart,_,<

qCheck1,1
qSeekStart,_,<

// seek to start
qSeekStart,_
qDelete,_,>

qSeekStart,0
qSeekStart,0,<

qSeekStart,1
qSeekStart,1,<

// delete and restart process
qDelete,_
qAccept,_,-

qDelete,0
qInit,_,>

qDelete,1
qInit,_,>