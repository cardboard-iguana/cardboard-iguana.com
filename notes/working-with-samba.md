# Working With Samba

## smbmap

* `-h` — IP address or host to enumerate
* `-u` — username to use during enumeration (attempts to use the NULL session if not supplied)
* `-p` — password or [NTLM hash](windows-password-hashes.md) to use during enumeration
* `-d` — domain (or workgroup) to use during enumeration
* `-s` — share to enumerate (defaults to `C$` if not supplied)
* `-x` — attempt to execute the supplied command (!!!) on the server (if the user you’re connecting as has permission to do so)
* `--download`/`--upload` — download or upload a file to specified share

## smbclient

```bash
smbclient //$IP/$SHARE -U $USER -p $PORT
```

* `-I` — IP address to connect to
* `-U` — username to use for the connection
* `-P` — password to use for the connection
* `-N` — attempt to connect without a password
* `-W` — domain (or workgroup) to use for the connection
* `-p` — connect to a non-standard port
* `-c` — attempt to execute the supplied command (!!!) on the server (if the user you’re connecting as has permission to do so)

The -p directive is only necessary if working over a non-standard port (e.g., *not* 445).

If -U is not included, smbclient will use your current (local) username, so probably best to fill something else in. If a password needs to be sent, specify the user as `${USER}%${PASSWORD}`.

The interface is reminiscent of old-school FTP clients.

## smbget

```bash
smbget smb://$IP/$SHARE/$FILE -U $USER
```

Download `$FILE` from `$SHARE` at `$IP`.

Note that the semantics are annoyingly slightly different from smbclient — no port specification, and the `smb:` protocol portion of the URI must be included.

Use -R (and omit `$FILE`) to recursively download an entire directory.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 2, 2021
