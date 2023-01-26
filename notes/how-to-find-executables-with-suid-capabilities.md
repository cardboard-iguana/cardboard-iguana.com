# How to Find Executables with SUID Capabilities

* **author**:: Nathan Acks
* **date**:: 2022-04-21

Executables can also have an SUID "capability" set in Linux, which is *not* the same as the SUID permission!

The `getcap` command displays a binary's capabilities (if there are any), and can even be used to perform a search for such binaries using `getcap -r $PATH 2> /dev/null`.
