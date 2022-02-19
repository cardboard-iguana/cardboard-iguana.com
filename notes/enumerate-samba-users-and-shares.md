# Enumerate Samba Users and Shares

## NMAP

CIFS users and shares can be enumerated by nmap during scanning:

```bash
nmap -vv -sT \
     --script smb-enum-shares.nse,smb-enum-users.nse \
     -p445 $TARGET_IP
```

NOTE: While smb-enum-shares.nse returns results for UNIX-like systems, I’ve found smb-enum-users.nse to be kind of hit-or-miss.

## Metasploit

Metasploit can also enumerate CIFS users using the auxiliary/smb/smb_lookupsid module.

Like NMAP, I’ve found this to be a bit unreliable on UNIX-like systems.

## enum4linux

For UNIX-like systems running Samba, enum4linux works well.

```bash
enum4linux -a $TARGET_IP
```

As of the time of this writing (November 5, 2021) however, it looks like enum4linux’s normal user enumeration has been broken for quite some time. However, the ”RID cycling” method of discovering users still works — so just call enum4linux with either the -r flag (to specifically use RID cycling to enumerate users) or the -a flag (which does a complete enumeration, including RID cycling) rather than the -U flag.

## smbclient

Samba services can be enumerated by smbclient using:

```bash
smbclient -L $SERVER_NAME -I $IP_ADDRESS
```

Here `$SERVER_NAME` is the machine's NetBIOS domain name, which can be found with enum4linux (see above).

## References

* [Basic Pentesting](tryhackme-basic-pentesting.md)
* [Nmap SMB Scripts and SMB Enumeration Step-By-Step Pentesting Guide](https://www.infosecademy.com/nmap-smb-scripts-enumeration/)
* [A Little Guide to SMB Enumeration](https://www.hackingarticles.in/a-little-guide-to-smb-enumeration/)
* [Enumerate SMB with Enum4linux & Smbclient](https://null-byte.wonderhowto.com/how-to/enumerate-smb-with-enum4linux-smbclient-0198049/)
* [Kenobi](tryhackme-complete-beginner.md)
* [Attacktive Directory](tryhackme-attacktive-directory.md)
* [Using “nmap”](nmap.md)
* [Using Metasploit](metasploit.md)
* [Use of uninitialized value $user, what does this mean?](https://github.com/CiscoCXSecurity/enum4linux/issues/4)
* [Working With Samba](working-with-samba.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 5, 2021
