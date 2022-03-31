# Equivalent Windows and \*NIX Commands

|      Linux | Windows  |
| ----------:|:-------- |
|        cat | type     |
|        dig | nslookup |
|       more | more     |
|   ifconfig | ipconfig |
|    netstat | nbtstat  |
|       ping | ping     |
|      sleep | timeout  |
|       sudo | runas    |
|    tcpdump | windump  |
| traceroute | tracert  |

## ping

Windows `ping` uses the `-n` flag to specify the number of packets sent (in contrast to Linux’s `-c`).

## dig

```bash
# dig command syntax; only $DOMAIN is required
#
dig @$NAME_SERVER $DOMAIN $QUERY_TYPE

# Examples
#
dig @8.8.8.8 microsoft.com A
dig @1.1.1.1 tryhackme.com
dig          google.com    MX
```

## nslookup

```powershell
# nslookup command syntax; only $DOMAIN is required
#
nslookup -type=$QUERY_TYPE $DOMAIN $NAME_SERVER

# Examples
#
nslookup -type=A  microsoft.com 8.8.8.8
nslookup          tryhackme.com 1.1.1.1
nslookup -type=MX google.com
```

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
* [2022-03-27 ITPro.TV: CompTIA Security+ (SY0-601)](../log/2022-03-27-itprotv-comptia-security-plus.md)
* [2022-03-29 ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-03-29-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
* [2022-03-30 ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-03-30-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 30, 2022
