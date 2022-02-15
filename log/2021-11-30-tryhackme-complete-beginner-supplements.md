# TryHackMe: Complete Beginner (Supplements)

## CC: Pen Testing

### Metasploit Modules

I’ve already noted most of the commands mentioned here in my [Using Metasploit](../notes/metasploit.md) note. A few additional things:

* Search for modules using `search`.
* Module options can be displayed with the `options` command (once a module is loaded). Use `advanced` for “advanced” options.
* Most modules support the ARCH and PAYLOAD options (for specifying target architecture and the payload to deliver). These options can also be set by directly calling a fully-specified [payload](../notes/metasploit.md).

### Meterpreter

Sometimes the `migrate` process will allow you to move laterally or even escalate privileges within a system.

Some more commands:

* The `execute` command allows host commands to be executed from within Meterpreter.
* The `search` command acts similarly to the NIX “find” command.
* Use `cat` to dump a file’s contents.

### Hashcat

Hashcat mode 100 corresponds to SHA1; 900 is MD4.

### SQLMap

* `-u URL`/`--url=URL` — process URL (this *must* include the query parameters *with values* to test *or* you must specify POST parameters *with values* using `--data`)
* `-p` — which URL parameter(s) (variables) to test
* `--dbms=DB_TYPE` — only use injections for a given type of backend database (MySQL, PostgreSQL, etc.)
* `-D`/`-T`/`-C` — select a specific database/table/column to dump
* `--dump` — dump data
* `--os-shell` — attempt to spawn an interactive shell
* `--os-pwn` — attempt to spawn a [Meterpreter](../notes/metasploit.md) shell or VNC session

### A Note on Manual SQL Injection

[OWASP actually has a good tutorial for SQL injection attacks.](https://owasp.org/www-community/attacks/SQL_Injection)

### Web Application SQL Injection Vulnerabilities

* `--forms` — parse target URL for forms, and use these
* `--dbs` — enumerate DBs

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 30, 2021
