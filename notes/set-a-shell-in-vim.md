# Set a Shell in ViM

If the user shell is set to something non-standard in /etc/passwd, Vi and ViM may not be able to shell out with `:shell` or execute shell commands with `!`. This is because these apps are attempting to execute `$SHELL` (in the case of `:shell`) or `$SHELL -c $COMMAND` (in the case of `!`).

Fortunately, Vi and ViM can be set to override the default $SHELL using `:set shell=/bin/bash`.

(Exotic shells in /etc/passwd can also cause commands executed via ssh to fail for the same reason.)

## References

* [ssh works with my custom shell but can't execute commands directly using ssh](https://s

- - - -

<span aria-hidden="true">👤</span> Nathan Acks
