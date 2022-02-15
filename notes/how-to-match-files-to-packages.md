# How to Match Files to Packages

## Debian

```bash
# List files in an installed package.
#
dpkg-query -L $PACKAGE_NAME

# List the package that owns a particular file.
#
dpkg-query -S $FULL_PATH_TO_FILE
```

## References

* [How do I get a list of installed files from a package?](https://askubuntu.com/questions/32507/how-do-i-get-a-list-of-installed-files-from-a-package)
* [How do I find out which package owns a file?](https://superuser.com/questions/179353/how-do-i-find-out-which-package-owns-a-file)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 3, 2021
