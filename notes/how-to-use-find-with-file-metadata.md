# How to Use “find” With File Metadata

Some useful find flags related to file metadata.

## -user and -group

Matches files owned by a particular user or group (both numeric and symbolic-readable names are allowed).

## -size

Matches files of size 𝑛.

Prefix 𝑛 with + or - to match files *strictly* greater than or less than 𝑛 in size. To specify useful sizes, use a suffix.

| Suffix | Meaning   |
|:------:|:--------- |
|   c    | Bytes     |
|   k    | Kilobytes |
|   M    | Megabytes |
|   G    | Gigabytes |

For example, use `-size +4G` to find files over 4 GB (i.e., those that can’t be written to a FAT32 file system).

## -perm

Matches files with a given permission. Both numeric and [symbolic permissions](symbolic-permissions.md) are allowed.

Use the / or - prefix to match files with *any* of the specified permissions or *at least* the specified permissions. For example, `-perm -644` will match any file where the current user has *at least* read + write access and any other user has *at least* read access (so, `-` requires the specified permissions, but is agnostic as to the presence/absence of additional permissions). Likewise, `-perm /666` will match files where the current user has read + write access and/or the current group has read + write access and/or everyone has read + write access (so, `/` requires that at least *one* of the specified permissions groups matches exactly, but is agnostic to the state of any other group outside of that match).

### Quick-and-Dirty Search for SUID and SGID Executables

```bash
find / -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null
```

## -Xmin and -Xtime

Matches files accessed (a), had their *contents* modified (m), or had their *inode* changed (c) 𝑛 minutes (-Xmin) or days (-Xtime) ago.

All mtime changes are ctime changes, but the reverse is not necessarily true.

Prefix 𝑛 with + or - to match files *strictly* before or after the specified time in the *past*.

For example:

* `-amin +30` matches files accessed *more* than 30 minutes ago.
* `-mtime -7` matches files modified *less* than 7 days ago.
* `-mtime 0` matches files modified *today*.

## References

* [TryHackMe - The find Command](tryhackme-the-find-command.md)
* [How to modify “last status change” (ctime) property of a file in Unix?](https://stackoverflow.com/questions/8346852/how-to-modify-last-status-change-ctime-property-of-a-file-in-unix#8346905)
* [TryHackMe - Complete Beginner](tryhackme-complete-beginner.md)

- - - -

👤 Nathan Acks  
📅 September 19, 2021
