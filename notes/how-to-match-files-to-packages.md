# How to Match Files to Packages

author:: Nathan Acks  
date:: 2022-07-10

## Debian

```bash
# List all installed packages
#
dpkg-query -l

# List files in an installed package
#
dpkg-query -L $PACKAGE_NAME

# List the package that owns a particular file
#
dpkg-query -S $FULL_PATH_TO_FILE
```

## Red Hat

```bash
# List all installed packages
#
rpm -qa

# List files in an installed package
#
rpm -ql $PACKAGE_NAME

# List the package that owns a particular file
#
rpm -qf $FULL_PATH_TO_FILE
```

## References

* [How do I get a list of installed files from a package?](https://askubuntu.com/questions/32507/how-do-i-get-a-list-of-installed-files-from-a-package)
* [How do I find out which package owns a file?](https://superuser.com/questions/179353/how-do-i-find-out-which-package-owns-a-file)
* [List All Installed Packages on Debian 11](https://linuxhint.com/list_installed_packages_debian/)
* [slyth11907 / Cheatsheets](https://github.com/slyth11907/Cheatsheets)
* [Linux rpm List Installed Packages Command](https://www.cyberciti.biz/faq/howto-list-installed-rpm-package/)
* [RPM List Files That are in a Package](https://linuxhint.com/rpm-list-files-in-package/)
* [How to find which rpm package provides a specific file or library in RHEL / CentOS](https://www.thegeekdiary.com/how-to-find-which-rpm-package-provides-a-specific-file-or-library-in-rhel-centos/)
