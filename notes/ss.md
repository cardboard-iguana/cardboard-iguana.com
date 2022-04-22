# Using “ss”

"Socket statistics" (`ss`) is a `netstat`-like tool with slightly nicer formatting; `ss -tulpn` will produce a nice list of open ports.

| Flag | Purpose                                                      |
|:----:|:------------------------------------------------------------ |
| `-t` | Display TCP sockets                                          |
| `-u` | Display UDP sockets                                          |
| `-l` | Display listening sockets (not just established connections) |
| `-p` | Show the process using the socket (broken?)                  |
| `-n` | Show raw port numbers (not named services)                   |

## References

* [TryHackMe: Game Zone](tryhackme-game-zone.md)
* [Using “netstat”](netstat.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 21, 2022
