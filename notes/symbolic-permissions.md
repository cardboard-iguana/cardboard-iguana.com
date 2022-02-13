# Symbolic Permissions

Numeric permissions are sometimes called *absolute* permissions, because they exactly specify an object’s permissions. Symbolic permissions are a bit more flexible.

Like absolute permissions, symbolic permissions are divided into user (u), group (g), and others (o). *Unlike* absolute permissions, not all of these permission sets need to be specified. Sets are separated by commas, and identical sets can be combined (e.g., ug).

This specifier is then followed by an *operator* that specifies whether the following permissions should be granted (+), removed (-), or set exactly (=). (Note that when [using “find”](how-to-use-find-with-file-metadata.md) only ”=“ makes sense.)

Permissions themselves are given as one or more of the following:

| Permission | Symbol | Numeric Equivalent | Notes                                                                                                                                                                                                             |
|:---------- |:------:|:------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read       |    r   |          4         |                                                                                                                                                                                                                   |
| Write      |    w   |          2         |                                                                                                                                                                                                                   |
| Execute    |    x   |          1         |                                                                                                                                                                                                                   |
| SUID       |   s,S  |          4         | Only applied to the user when set symbolically, or to the prefix digit if set numerically. Use lowercase if the user *also* has execute permissions, uppercase if the user *doesn’t* have execute permissions.    |
| SGID       |   s,S  |          2         | Only applied to the group when set symbolically, or to the prefix digit if set numerically. Use lowercase if the group *also* has execute permissions, uppercase if the group *doesn’t* have execute permissions. |
| Sticky Bit |    t   |          1         | Only applied to the “other” permission set, or to the prefix digit if set numically. *Only* applied to directories.                                                                                               |

## SUID

Execute as the file owner, rather than the user passing the command.

## SGID

If set on a file, this operates similarly to SUID: The file is executed as if the user passing the command was in the *group* with the SGID bit set. (I honestly have rarely seen this used.)

If set on a directory, files created in the directory will have their group ownership set to the same group as the directory itself. (In my experience this is the more common use case.)

## Sticky Bit

*Only* applied to directories. A file in a directory with the sticky bit set can only be deleted by its owner (and root). For example, /tmp always has the sticky bit set.

## References

* [How to manage Linux permissions for users, groups, and others](https://www.redhat.com/sysadmin/manage-permissions)
* [Linux permissions: SUID, SGID, and sticky bit](https://www.redhat.com/sysadmin/suid-sgid-sticky-bit)

- - - -

👤 Nathan Acks  
📅 September 19, 2021
