# Using “nmap”

Note that nmap accepts ranges in any octet of an IP address; for example, 10.10.0-255.1-255 will scan 10.10.0.1 – 10.10.255.255.

## Useful Flags

* `-A` — “Aggressive” scan; alias for `-O -sC -sV --traceroute`.
* `-D` — Send multiple scan requests using decoys; specified using a list of arbitrary IP addresses. The special “addresses” ME and RND represent the attacker (you!) and a random IP address, respectively. Obviously, if you want results than “ME” will need to be included in the list *somewhere*. Trades stealth for “chaff”. Maybe only useful as a diversion?
* `-e` — Specify the network interface to use during scanning.
* `-f` — Fragment packets so that the packet is 8 bytes or less. Specify twice to fragment into 16 byte chunks (which is reverse of how you’d intuitively expect this to work). Can help evade some next-gen firewall / IDS alarms.
* `-F` — “Fast” scan. Alias for `--top-ports 100`.
* `-iL` — Use a file for nmap’s scan targets.
* `-n` — Don’t resolve host names using DNS (or do reverse DNS resolution).
* `-O` — OS detection. Generally requires at least one open and one closed port to be detected, and results will be distorted if the target is virtualized. The OS type is much more reliably detected than the OS version.
* `-p-` — Scan all ports. (The end/beginning of port ranges can be excluded to represent 1/65535, so `-p-` is equivalent to `-p1-65535`.) If omitted, the 1000 most common ports are scanned by default.
* `-Pn` — Scan the host even if it doesn’t respond to an initial ping. Necessary for scanning modern Windows systems, since the Windows Firewall blocks ICMP by default.
* `-r` — Scan ports in sequential order (rather than randomly). Can make for more accurate scans for targets that have only recently been brought online.
* `-R` — Perform reverse DNS resolution even for offline hosts.
* `-sC` — Scan with “default” script set; equivalent to `--script default`. Mostly provides basic intelligence.
* `-sV` — Service detection. The same as `-sT` (because a full TCP connection is required to gather the necessary information), but probes listening services for additional information.
* `-S` — Use a spoofed IP address for the scan. Only useful if you can actually capture incoming packets at that IP address! Generally must be combined with the `-e` and `-Pn` flags.
* `-T` — Specify timing from 0 – 5. `-T0` will wait *5 minutes* between ports. `-T1` is typical on engagements. `-T3` is the default. `-T4` is typical on CTFs. `-T5` is not recommended, as it is so fast that it may lead to packet loss.
* `-v` — Increase nmap’s verbosity. There are four verbosity levels for nmap: `-v` < `-vv` < `-d` < `-dd`. In practice, I’ve found anything above `-v` too noisy for general use.

### Long Flags

* `--badsum` — Produce packets with an invalid checksum. These should be dropped by normal hosts, but many IDS solutions *respond* to these. This can be useful for reconnaissance.
* `--data-length` — Append random data to nmap TCP packets. By default, nmap appends no data after the TCP header; padding this out *can* make scans look more innocuous. Disables protocol-specific payloads, which can decrease scan accuracy, particularly for UDP scans.
* `--dns-servers` — Specify DNS server(s) to use for hostname resolution and reverse lookups.
* `--max-parallelism` — The maximum number of probes to run in parallel. Overrides `-T`.
* `--max-rate` — The maximum number of packets/second to send. Overrides `-T`.
* `--min-parallelism` — The minimum number of probes to run in parallel. Overrides `-T`.
* `--min-rate` — The minimum number of packets/second to send. Overrides `-T`.
* `--mtu` — Choose the fragment length for `-f`; should always be a multiple of 8.
* `--reason` — Show the reason that nmap made a particular identification. Kinda fun.
* `--scan-delay` — Add a delay (in milliseconds) between ports/hosts. Helpful for IDS evasion, but makes things *slow*.
* `--scanflags` — Specify the TCP flags used to probe ports during a scan using URG, PSH, RST, SYN, ACK, FIN (e.g., `--scanflags URGPSHFIN` is the same as `-sX`). Overrides the explicit scanning options in the following sections.
* `--script` — Run specified scripts, or all scripts in a specified category (as applicable). Also accepts wildcard matches (e.g., `ftp*`). See next section for script category breakdown.
* `--source-port` — Specify the source port for a scan. possibly useful to evade some firewall rules?
* `--spoof-mac` — Use a spoofed MAC address for the scan. Obviously only matters when you’re on the same subnet as the target; otherwise has the same caveats as IP spoofing.
* `--top-ports` — Scan only the X most common ports. Nmap’s default is `--top-ports 1000`. Overridden when using `-p`.
* `--traceroute` — Perform a traceroute between the attacker and target systems. Note that nmap’s traceroute works in the opposite fashion (high TTL to low TTL) than traceroute/tracert. Note that most routers will not send ICMP TTL exceeded packets, and will thus show up as `*`.
* `--version-intensity` — Determine how much service information to collect (and thus how noisy the associated probes will be) with `-sV`. Ranges from 0 – 9; `--version-light` is equivalent to 2, `--version-all` is equivalent to 9.

### Scripting Engine

|  Category | Description                                                                                                            |
| ---------:|:---------------------------------------------------------------------------------------------------------------------- |
|      auth | Probes for information about service authentication and bypasses. Does not conduct brute-force attacks.                |
| broadcast | Host/network probes using broadcast packets.                                                                           |
|     brute | Attempt to brute-force service credentials.                                                                            |
|   default | A curated list of fast, reliable scripts. Can also be called using -sC.                                                |
| discovery | Gather additional information about scanned machines/ports.                                                            |
|       dos | Scripts that may crash machines/services.                                                                              |
|   exploit | Attempt to actually exploit identified services.                                                                       |
|  external | Scripts that send data to third-party services.                                                                        |
|    fuzzer | Fuzz identified services.                                                                                              |
| intrusive | Scripts that may crash a service, generate lots of log messages, or are otherwise noise / may be considered malicious. |
|   malware | Test for the possible presence of malware on the target.                                                               |
|      safe | The opposite of “intrusive” — scripts that are unlikely to be noisy or perceived as malicious (no guarantees though).  |
|   version | Scripts called by -sV. Unlike “default”, this category cannot be called directly.                                      |
|      vuln | Check for potential vulnerabilities. I’ve found that scripts in this category generate a lot of false positives.       |

### Host Discovery Options

By default, nmap uses the following host discovery methods:

|              | Superuser                                                | Regular User               |
| ------------:|:-------------------------------------------------------- |:-------------------------- |
| Local Hosts  | ARP                                                      | TCP SYN to port 80 and 443 |
| Remote Hosts | ICMP Echo, TCP SYN to 443, TCP ACK to 80, ICMP Timestamp | TCP SYN to port 80 and 443 |

* `-PA` — Use TCP ACK packets for host discovery; otherwise the same as `-PS`.
* `-PE` — Use ICMP Echo for host discovery. (Note that Nmap will still not send the echo request if host existence can be verified using the initial ARP request.)
* `-PM` — Use ICMP Address Mask for host discovery. (More-or-less the same as `-PP`, just a different ICMP request type.)
* `-PP` — Use ICMP Timestamp for host discovery. (Less likely to be blocked by firewalls than `-PE`, but also a more unusual request that may stand out. Like `-PE`, Nmap will still not send the timestamp request if host existence can be verified using the initial ARP request.)
* `-PR` — Use ARP packets only for host discovery.
* `-PS` — Use TCP SYN packets for host discovery. Uses port 80 by default, or you can specify a port list (e.g., `-PS80,8080,8888`) or range (e.g. `-PS20-30`). (Note that unprivileged users *must* complete a full TCP handshake.)
* `-PU` — Use UDP packets for host discovery. Unlike other types of host discovery scans, UDP scans only generate a reply (ICMP Port Unreachable) if the target port is *closed*.

### Scan Types

* `-sA` — ACK scan. All ports *should* respond with a RST, but firewalls will generally block these requests except for open/forwarded ports. Thus, an ACK scan is useful for probing the configuration of intermediate firewalls (but says nothing about whether services are actually *listening* on the identified ports).
* `-sF` — FIN scan. Use and output is similar to a null scan, but is slightly more likely to be blocked.
* `-sI` — Idle/Zombie scan. The idea here is to choose a machine with *no* traffic on it and then spoof it’s IP address. Scans then consist of a SYN/ACK to the zombie to get the current IP ID value for the current port, then a SYN to the target (which should either reply with a RST to the zombie, which doesn’t trigger a response and thus doesn’t increment the IP ID, or a SYN/ACK to the zombie, which will respond with a RST which *will* increment the IP ID), then a second SYN/ACK to the zombie to see if the IP ID has been incremented by 1 (port closed or filtered on the target) or 2 (port open on the target). Note that zombies need to be systems that increment the IP ID sequentially *and* globally, and open/closed ports will be from the *zombie’s* perspective, not the attacker’s. These scans are also slooooow (though not as slow as `-T0`).
* `-sL` — Dummy scan. Show the hosts that would be scanned, but don’t actually do anything (except perhaps DNS resolution).
* `-sM` — Maimon scan (named after Uriel Maimon); the FIN and ACK TCP flags are set. Should always receive a RST, but some older BSD systems drop the packet on open ports. Of limited modern utility.
* `-sn` — Host discovery only (see the previous section for details). Note that the Windows Firewall blocks ICMP by default.
* `-sN` — Null scan; no TCP flags are set. Used to circumvent *stateless* firewalls. Can distinguish between `closed` and `open|filtered`.
* `-sS` — SYN scan. Most common scan, and nmap’s default. Starts a TCP handshake but then sends a RST after receiving the SYN/ACK packet. Requires root, should not be used on OT. Also called a “stealth scan”, but most IDS solutions detect it these days.
* `-sT`  — TCP connect scan. This makes a full TCP handshake when connecting to each port, then sends a RST/ACK after the handshake is finished. Slow but accurate. This is the only scan available for unprivileged users.
* `-sU` — UDP scan. Sends empty UDP packets (or more realistic packets for known ports) and listens for a response back (“open”) or a ICMP “port unreachable” packet (“closed”). Since UDP doesn’t require a response, most ports will get marked `open|filtered`. Can be specified with one of the TCP scans to scan TCP and UDP ports simultaneously. *Very* slow, so you probably want to use with `-sU --top-ports 20`.
* `-sW` — TCP windows scan; the same as an ACK scan except that it examines the TCP window field of returned RST packets and uses it to discern if a port responded *differently*. Note that ports may be reported as closed (and open!) erroneously (as not all systems respond in the same way), but unfiltered ports will be identified. Look for patterns of open/closed ports to try to discern how the target system is responding.
* `-sX` — Xmas scan; the FIN, URG, and PSH TCP flags are set. Use and output is similar to a null scan.

### Port States

* `Open` — The port is reachable and there is a service listening on it.
* `Closed` — The port is reachable and there is no service listening on it.
* `Filtered` — Nmap cannot determine the port state because the port is not accessible (probably because of a firewall).
* `Unfiltered` — Nmap cannot determine the port state, but the port *is* accessible (only encountered in ACK scans).
* `Open|Filtered` — Nmap can only determine that the port is not closed (only encountered in UDP scans and more exotic scans like Xmas).
* `Closed|Filtered` — Nmap can only determine that the port is not open (only encountered in IP ID idle scans).

## Output

* `-oA` — Save the results in “normal”, “grepable”, and XML formats simultaneously. This option will automatically append meaningful extensions (the other options do not do this).
* `-oG` — Save the results as “grepable” output. This is a compact format meant to automatically provide context when searched with grep.
* `-oN` — Save results as “normal” output. This is more-or-less what nmap will print to STDOUT.
* `-oX` — Save the results as XML, designed to be importable by other applications.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [3 ways to scan Eternal Blue Vulnerability in Remote PC](https://www.tryhackme.vip/2018/03/3-ways-to-scan-eternal-blue.html)
* [2022-03-31 TryHackMe: Jr. Penetration Tester](../log/2022-03-31-tryhackme-jr-penetration-tester.md)
* [Host Discovery (Official Nmap Project Guide)](https://nmap.org/book/man-host-discovery.html)
* [2022-04-02 ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
* [Port Scanning Basics (Official Nmap Project Guide)](https://nmap.org/book/man-port-scanning-basics.html)
* [UDP Scan (-sU) (Official Nmap Project Guide)](https://nmap.org/book/scan-methods-udp-scan.html)
* [TCP Window Scan (-sW) (Official Nmap Project Guide)](https://nmap.org/book/scan-methods-window-scan.html)
* [Firewall/IDS Evasion and Spoofing (Official Nmap Project Guide)](https://nmap.org/book/man-bypass-firewalls-ids.html)
* [TCP Idle Scan (-sI) (Official Nmap Project Guide)](https://nmap.org/book/idlescan.html)
* [Nmap Scripting Engine Usage and Examples (Official Nmap Project Guide)](https://nmap.org/book/nse-usage.html)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 3, 2022
