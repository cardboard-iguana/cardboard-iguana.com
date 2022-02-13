# TryHackMe: Complete Beginner

## Linux PrivEsc

### Cron Jobs

Remember the `locate` tool! It’s faster than `find` (assuming that it’s installed, and the database is up-to-date, and the file you’re looking for is accessible to `nobody`…).

Also, the [Bash reverse shell](../notes/exploiting-bash.md) makes an appearance here!

Remember that SUID Bash will drop privileges by default; execute with the `-p` option to avoid this.

Okay, this is wild… It looks like the wildcard expansion (`*`) in Bash scripts doesn’t get pushed to the command, but is instead expanded in place. This means that files named like command-line switches *will be interpreted as command line switches*. This can be used, for example, to exploit sloppy [tar](https://gtfobins.github.io/gtfobins/tar/)-based backup scripts.

### SUID / SGID Executables

Quick-n-dirty command to find all SUID/SGID executables.

```bash
find / -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null
```

Quickly see what shared libraries an executable is trying to load:

```bash
strace $EXECUTABLE 2>&1 | grep open
```

If there are missing libraries in paths that we’re able to access, then code similar to the [LD_PRELOAD trick](../notes/exploiting-ld-preload.md) can be used to inject malicious code

Running `strings` on a binary can also give us a sense of what helper applications might be getting executed.

[There are lots of wacky things you can do with Bash.](../notes/exploiting-bash.md)

### NFS

Files created on NFS shares inherit the *remote* UID. By default, NFS enables “root squashing”, which maps UID 0 to the `nobody` user.

Root squashing can be *disabled* in /etc/exports with the `no_root_squash` flag. 

Unrelatedly, [msfvenom](../notes/metasploit.md) can be used to generate executables that immediately shell out, similar to the [LD_PRELOAD trick](../notes/exploiting-ld-preload.md).

### Kernel Exploits

* [Linux Exploit Suggester 2](https://github.com/jondonas/linux-exploit-suggester-2)

### Privilege Escalation Scripts

* [LinEnum](https://github.com/diego-treitos/linux-smart-enumeration)
* [Linux Smart Enumeration (LSE)](https://github.com/diego-treitos/linux-smart-enumeration)
* [LinPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS)

LinEnum is very fast, but LSE and LinPEAS produce more intelligible output.

- - - -

👤 Nathan Acks
📅 November 2, 2021
