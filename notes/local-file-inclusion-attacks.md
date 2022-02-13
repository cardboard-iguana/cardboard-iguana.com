# LFI (Local File Inclusion) Attacks

LFI vulnerabilities are *most* common in PHP, but are sometimes found in other languages/frameworks.

Since web servers are typically serving content from `/var/www`, `/var/www/srv`, or an immediate subdirectory for virtual hosts, you generally need to use `../../`, `../../../`, or `../../../../` to reach `/`.

## References

* [TryHackMe: Web Fundamentals](tryhackme-web-fundamentals.md)

- - - -

👤 Nathan Acks  
📅 January 17, 2022
