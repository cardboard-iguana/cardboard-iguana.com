# TryHackMe: Pre Security

## Windows Fundamentals

### Windows Updates

Quick access to Windows Update:

```powershell
control /name Microsoft.WindowsUpdate
```

### Firewall & Network Protection

Windows Firewall network classifications:

| Network Type | Description                                                                                                                                         |
|:------------ |:--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain       | The domain profile applies to networks where the host system can authenticate to a domain controller.                                               |
| Private      | The private profile is a user-assigned profile and is used to designate private or home networks.                                                   |
| Public       | The default profile is the public profile, used to designate public networks such as Wi-Fi hotspots at coffee shops, airports, and other locations. |

The Windows Firewall snap-in is WF.msc.

### Volume Shadow Copy Service

Shadow copies are stored in the System Volume Information folder, and managed by the Volume Shadow Copy Service (VSS).

## The find Command

### Start finding

You can use wildcards as an alternative to find’s path spec. For example:

```bash
find file*
find *.txt
```

This implicitly only searches the current working directory, however.

### Know Exactly What You’re Looking For

The -user and -group flags match files owned by a particular user or group (both numeric and symbolic-readable names are allowed).

The -size flag matches files of size 𝑛.

Prefix 𝑛 with + or - to match files *strictly* greater than or less than 𝑛 in size. To specify useful sizes, use a suffix.

| Suffix | Meaning   |
|:------:|:--------- |
|   c    | Bytes     |
|   k    | Kilobytes |
|   M    | Megabytes |
|   G    | Gigabytes |

For example, use `-size +4G` to find files over 4 GB (i.e., those that can’t be written to a FAT32 file system).

The -perm flag matches files with a given permission. Both numeric and symbolic permissions are allowed.

Use the / or - prefix to match files with *any* of the specified permissions or *at least* the specified permissions. For example, `-perm -644` will match any file where the current user has *at least* read + write access and any other user has *at least* read access. Likewise, `-perm /666` will match files where the current user has read + write access and/or the current group has read + write access and/or everyone has read + write access.

The -Xmin and -Xtime flags match files accessed (a), had their *contents* modified (m), or had their *inode* changed (c) 𝑛 minutes (-Xmin) or days (-Xtime) ago.

All mtime changes are ctime changes, but the reverse is not necessarily true.

Prefix 𝑛 with + or - to match files *strictly* before or after the specified time in the *past*.

For example:

* `-amin +30` matches files accessed *more* than 30 minutes ago.
* `-mtime -7` matches files modified *less* than 7 days ago.
* `-mtime 0` matches files modified *today*.

References:

* [Symbolic Permissions](../notes/symbolic-permissions.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> September 19, 2021
