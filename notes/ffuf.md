# Using “fuff”

A general web fuzzing tool. Use `FUZZ` as your placeholder.

## Directory/File Enumeration

```bash
ffuf -w /usr/share/wordlists/dirb/common.txt \
     -u https://$DOMAIN/FUZZ
```

## Brute Force Virtual Hosts

Ffuf can fuzz HTTP headers, which can be used to try to brute force virtual host entries.

```bash
ffuf -w /usr/share/wordlists/metasploit/namelist.txt \
     -H "Host: FUZZ.$DOMAIN" \
     -u https://$IP
```

Use `-fs $SIZE` to remove results of a particular size from the list (which you’ll probably need to do when trying to brute force virtual hosted subdomains).

## References

* [TryHackMe: Jr. Penetration Tester](tryhackme-jr-penetration-tester.md)
* [Using “gobuster”](gobuster.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> February 28, 2022
