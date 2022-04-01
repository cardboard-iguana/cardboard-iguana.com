# Using “nmap”

Note that nmap accepts ranges in any octet of an IP address; for example, 10.10.0-255.1-255 will scan 10.10.0.1 – 10.10.255.255.

## Useful Flags

* `-vv` — Increase nmap’s verbosity. Generally you’ll want to use -vv (rather than just -v) when pen testing.
* `-oA <basename>` — Save output in three formats (“normal”, XML, and “grepable”) *in addition to* displaying terminal output. Handy!
* `-p-` — Scan all ports. (The end/beginning of port ranges can be excluded to represent 1/65535, so “-“ is equivalent to 1-65535.)
* `-Pn` — Scan the host even if it doesn’t respond to an initial ping. Necessary for scanning modern Windows systems, since the Windows Firewall blocks ICMP by default.
* `-O` — Try to determine the host operating system.
* `-sV` — Attempt to identify services on open ports.
* `-A` — “Aggressive” scan; implies -O and -sV, among others.
* `-iL` — Use a file for nmap’s scan targets.
* `-n` — Don’t resolve host names using DNS (or do reverse DNS resolution).
* `-R` —- Perform reverse DNS resolution even for offline hosts.
* `-sn` — Only perform host discovery only (no port scan).
* `-sC` — Scan with “default” script set. Mostly provides basic intelligence.
* `--scan-delay` — Add a delay (in milliseconds) between ports/hosts. Helpful for IDS evasion, but makes things *slow*.
* `--badsum` — Produce packets with an invalid checksum. These should be dropped by normal hosts, but many IDS solutions *respond* to these. This can be useful for reconnaissance.
* `--dns-servers` — Specify DNS server(s) to use for hostname resolution and reverse lookups.
* `--script vuln` — Checks for common vulnerabilities during the scan. Can be noisy! (In practice I haven’t found this option very useful…)

### Host Discovery Options

By default, nmap uses the following host discovery methods:

|              | Superuser                                                | Regular User               |
| ------------:|:-------------------------------------------------------- |:-------------------------- |
| Local Hosts  | ARP                                                      | TCP SYN to port 80 and 443 |
| Remote Hosts | ICMP Echo, TCP SYN to 443, TCP ACK to 80, ICMP Timestamp | TCP SYN to port 80 and 443 |

* `-PR` — Use ARP packets only for host discovery.
* `-PE` — Use ICMP Echo for host discovery. (Note that Nmap will still not send the echo request if host existence can be verified using the initial ARP request.)
* `-PP` — Use ICMP Timestamp for host discovery. (Less likely to be blocked by firewalls than `-PE`, but also a more unusual request that may stand out. Like `-PE`, Nmap will still not send the timestamp request if host existence can be verified using the initial ARP request.)
* `-PM` — Use ICMP Address Mask for host discovery. (More-or-less the same as `-PP`, just a different ICMP request type.)
* `-PS` — Use TCP SYN packets for host discovery. Uses port 80 by default, or you can specify a port list (e.g., `-PS80,8080,8888`) or range (e.g. `-PS20-30`). (Note that unprivileged users *must* complete a full TCP handshake.)
* `-PA` — Use TCP ACK packets for host discovery; otherwise the same as `-PS`.
* `-PU` — Use UDP packets for host discovery. Unlike other types of host discovery scans, UDP scans only generate a reply (ICMP Port Unreachable) if the target port is *closed*.

### Scan Types

* `-sT`  — TCP connect scan. This makes a full TCP handshake when connecting to each port, then sends a RST after the handshake is finished. Slower, more accurate, more detectable.
* `-sS` — SYN scan. Most common scan. Starts a TCP handshake but then sends a RST after receiving the SYN/ACK packet. Requires root, should not be used on OT. Also called a “stealth scan”, but most IDS solutions detect it these days.
* `-sU` — UDP scan. Sends empty UDP packets (or more realistic packets for known ports) and listens for a response back (“open”) or a ICMP “port unreachable” packet (“closed”). Since UDP doesn’t require a response, most ports will get marked “open\|filtered”. *Very* slow, so you probably want to use with ”-sU --top-ports 20”.
* `-sn` — Host discovery only (see the previous section for details). Note that the Windows Firewall blacks ICMP by default.
* `-sL` — Dummy scan. Show the hosts that would be scanned, but don’t actually do anything (except perhaps DNS resolution).

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [3 ways to scan Eternal Blue Vulnerability in Remote PC](https://www.tryhackme.vip/2018/03/3-ways-to-scan-eternal-blue.html)
* [2022-03-31 TryHackMe: Jr. Penetration Tester](../log/2022-03-31-tryhackme-jr-penetration-tester.md)
* [Host Discovery (Official Nmap Project Guide)](https://nmap.org/book/man-host-discovery.html)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 31, 2022
