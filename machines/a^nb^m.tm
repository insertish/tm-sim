name: Check if word is in language L = {a^nb^m, n>m}
init: q1
accept: qAccept
testAccept: a,a,b
testAccept: a
testReject: a,b
testReject: a,b,b
testReject: _
testReject: d

q1,a
q2,_,>

q1,b
qReject,_,-

q1,b
qReject,_,-

q2,a
q2,a,>

q2,_
qAccept,_,-

q2,b
q3,b,>

q3,b
q3,b,>

q3,a
qReject,_,-

q3,_
q4,_,<

q4,b
q5,_,<

q5,b
q5,b,<

q5,_
qReject,_,-

q5,a
q6,a,<

q6,a
q6,a,<

q6,_
q1,_,>
