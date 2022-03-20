# Equivalent Windows and Linux Commands

|   Linux  |  Windows |
|:--------:|:--------:|
|    cat   |   type   |
|   more   |    more  |
| ifconfig | ipconfig |
|   sleep  |  timeout |
|   sudo   |   runas  |

## ipconfig

### Display Current DNS Settings

```bat
ipconfig /displaydns | more
```

### Flush Local DNS Cache

```bat
ipconfig /flushdns
```

## runas

```powershell
runas /user:$USERNAME $EXECUTABLE
```

`$USERNAME` may also be specified as `$DOMAIN\$USERNAME` for domain-joined machines.

`$EXECUTABLE` is treated normally (as if not prefixed by the `runas` command), so a full or relative path is only necessary when it’s not already in the Windows path.

## References

* [What is the Windows equivalent of the Unix command cat?](https://superuser.com/questions/434870/what-is-the-windows-equivalent-of-the-unix-command-cat#434876)
* [2022-02-27 ITPro.TV: CompTIA Security+ (SY0-601)](../log/2022-02-27-itprotv-comptia-security-plus.md)
* [Windows: Run as Different User](https://www.shellhacks.com/windows-run-as-different-user/)
* [Windows runas command syntax and examples](https://www.windows-commandline.com/windows-runas-command-prompt/)
* [2022-03-19 TryHackMe: Jr. Penetration Tester](../log/2022-03-19-tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 19, 2022
