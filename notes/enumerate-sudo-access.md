# Enumerate "sudo" Access

* **author**:: Nathan Acks
* **date**:: 2021-10-30

The `sudo -l` command will helpfully tell us what we can run as the superuser without a password (NOPASSWD), as well as what environment variables may be preserved (useful if you're going to try to exploit LD_PRELOAD or LD_LIBRARY_PATH).

NOTE: The use of `sudo -l` requires that the user have *some* level of sudo access to begin with, and *will* be logged!

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [Basic Pentesting](tryhackme-basic-pentesting.md)
* [Shell Escapes](shell-escapes.md)
* [Exploiting LD_PRELOAD](exploiting-ld-preload.md)
* [Exploiting LD_LIBRARY_PATH](exploiting-ld-library-path.md)
