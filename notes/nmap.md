# Using “nmap”

## Useful Flags

* `-vv` — Increase nmap’s verbosity. Generally you’ll want to use -vv (rather than just -v) when pen testing.
* `-oA <basename>` — Save output in three formats (“normal”, XML, and “grepable”) *in addition to* displaying terminal output. Handy!
* `-p-` — Scan all ports. (The end/beginning of port ranges can be excluded to represent 1/65535, so “-“ is equivalent to 1-65535.)
* `-Pn` — Scan the host even if it doesn’t respond to an initial ping. Necessary for scanning modern Windows systems, since the Windows Firewall blocks ICMP by default.
* `-O` — Try to determine the host operating system.
* `-sV` — Attempt to identify services on open ports.
* `-A` — “Aggressive” scan; implies -O and -sV, among others.
* `--scan-delay` — Add a delay (in milliseconds) between ports/hosts. Helpful for IDS evasion, but makes things *slow*.
* `--badsum` — Produce packets with an invalid checksum. These should be dropped by normal hosts, but many IDS solutions *respond* to these. This can be useful for reconnaissance.
* `-sC` — Scan with “default” script set. Mostly provides basic intelligence.
* `--script vuln` — Checks for common vulnerabilities during the scan. Can be noisy!

### Scan Types

* `-sT`  — TCP connect scan. This makes a full TCP handshake when connecting to each port, then sends a RST after the handshake is finished. Slower, more accurate, more detectable.
* `-sS` — SYN scan. Most common scan. Starts a TCP handshake but then sends a RST after receiving the SYN/ACK packet. Requires root, should not be used on OT. Also called a “stealth scan”, but most IDS solutions detect it these days.
* `-sU` — UDP scan. Sends empty UDP packets (or more realistic packets for known ports) and listens for a response back (“open”) or a ICMP “port unreachable” packet (“closed”). Since UDP doesn’t require a response, most ports will get marked “open|filtered”. *Very* slow, so you probably want to use with ”-sU --top-ports 20”.
* `-sn` — Ping sweep. Pings all hosts on the network, and sends TCP SYN packets to port 443 and TCP ACK packets to port 80 (SYN if non-root) for whatever reason. Note that the Windows Firewall blacks ICMP by default.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [3 ways to scan Eternal Blue Vulnerability in Remote PC](https://www.tryhackme.vip/2018/03/3-ways-to-scan-eternal-blue.html)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 2, 2021
