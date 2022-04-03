# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester

## CompTIA Security+ Exam Cram

Today I’ll be covering Chapter 22 of the Security+ Exam Cram, “Cloud Cybersecurity Solutions”.

### Introduction

Cloud platform security controls: A wall of toggle. So many toggles…

### Cloud Workloads

Key security concerns:

* Authentication
* Proper permissions
* Usage tracking

In AWS, both servers and users are assigned permissions.

### Regions and Availability Zones

Region = Geographic area

Availability Zone = Locations within a region

Regions provide control over pricing, local regulations, and (gross) latency.

Availability zones allow for redundancy.

### Virtual Private Cloud (VPC)

This is basically the private internal networks used to connect cloud resources. “VPC endpoints” allow connections to other cloud resources, but are generally one-way (requests must be initiated by resources within the VPC).

Security best practices for a VPC are basically the same as those for a regular network, except that there’s often finer-grained control via security groups and cloud platform policies. API monitoring also needs to be taken into account.

### Security Groups

Security groups can be thought of as firewalls, as they determine what traffic may be sent/received by resources within the group. General properties (seems AWS-specific):

* Default-deny (allow only)
* Port 22 inbound is generally allowed
* Destination ports only
* Stateful

Network ACLs basically function as *stateless* firewalls.

### Policies

Policies are bundles of permissions. Two general categories:

* Identity-based policies define access based on the user (or service account). Account X has access to resource Y.
* Resource-based policies define access based on resource. Resource Y allows account X access.

The symmetry here can make things a little muddy. General rules:

* Default deny.
* An explicit allow in either an identity- or resource-based policy functions as an allow.
* An explicit deny in either an identity- or resource-based policy overrides an explicit allow.

So, the way to think of composite policies is basically to sum up the explicitly allowed actions in all policies and then remove the explicitly denied actions. The resulting set should be the actual permissions of a given user/account.

Note that on all (most?) cloud systems, policies only apply to actions, *not* network traffic.

### Managing Secrets

Basically, use the built-in secrets management functionality of your platform.

### Central Logging

Basically, log all the things. But if you can’t log all the things, then log:

* Privileged account actions
* Log access
* Authentication attempts
* Resource/Object creation/deletion

### Third-Party Cloud Security Solutions

CASB = Cloud Access Security Broker

The use case I’m familiar with for CASBs is controlling SaaS access from corporate networks/devices. This can be extended to the management interface for cloud services. Similar functionality is apparently enabled by services known as “secure web gateways” (SWGs) and “software defined perimeters” (SDPs). Exam Cram is implying here that at least some of these technologies can be layered in front of the relevant application / management interface on the vendor side or via a proxy (in which case the application / management interface would be restricted to only talk to the relevant application IPs)

AWS apparently has a “marketplace” (sounds a bit like the Google Workspace add-ons “marketplace) that specifically offers integrations with security tools.

“Structural awareness” solutions (protections applied directly to resources/objects):

* Compliance / Best practices
* Visibility / Monitoring
* VPN
* Encryption management
* Vulnerability assessment
* SBOM-like
* Log / Data aggregation
* DevSecOps
* Risk management

“Situational awareness” solutions (monitor and respond to events):

* Firewalls / Proxies (packet inspection)
* EDR
* IDS
* Backups
* Disaster recovery
* SIEM
* Workload-based security controls

## TryHackMe: Jr. Penetration Tester

### TCP and UDP Ports

Six nmap port states:

* `Open` — The port is reachable and there is a service listening on it.
* `Closed` — The port is reachable and there is no service listening on it.
* `Filtered` — Nmap cannot determine the port state because the port is not accessible (probably because of a firewall).
* `Unfiltered` — Nmap cannot determine the port state, but the port *is* accessible (only encountered in ACK scans).
* `Open|Filtered` — Nmap can only determine that the port is not closed (only encountered in UDP scans and more exotic scans like Xmas).
* `Closed|Filtered` — Nmap can only determine that the port is not open (only encountered in IP ID idle scans).

Reference:

* [Port Scanning Basics (Official Nmap Project Guide)](https://nmap.org/book/man-port-scanning-basics.html)

### TCP Flags

Available TCP flags:

* URG — Process the current TCP packet immediately. Directs the receiving system to examine the “urgent pointer” field.
* ACK — Acknowledgement. Directs the receiving system to examine the “acknowledgement number” field.
* PSH — Push. Elevate the priority of the packet’s data, but does not otherwise change rules around packet processing.
* RST — Reset. Terminates the connection forcefully.
* SYN — Synchronize. Used during the initial three-way handshake to set a shared (starting) sequence number.
* FIN — Finish. Indicates that the connection may be dropped gracefully.

Reference:

* [Transmission Control Protocol (RFC 793)](https://datatracker.ietf.org/doc/html/rfc793.html)

### TCP Connect Scan

TCP connect scans attempt to perform the full three-way handshake for each port, but then immediately tears down the connection using RST/ACK.

Specified using `-sT`. Slow.

The only scan available for unprivileged users.

Unless `-p` is specified, only the 1000 most common ports are scanned. If `-F` is specified, then only the 100 more common ports are scanned.

Nmap normally scans ports in a random order. However, ports are often brought up consecutively, so for freshly booted targets the `-r` flag (which *removes* this randomization) can be advisable.

### TCP SYN Scan

TCP SYNC scans (`-sS`) are nmap’s default; sends a RST instead of a ACK at the end of the three-way handshake.

Fast. Limited to privileged users.

### UDP Scan

UDP scans are specified using `-sU`.

There is no UDP handshake, but a UDP packet sent to a closed port will generate an ICMP port unreachable packet unless either the UDP packet or ICMP response is blocked by a firewall.

Unfortunately, a UDP packet sent to an open port isn’t guaranteed to generate a reply. Nmap tries to work around this by sending packet that are likely to elicit a response for common protocols, but this is an inexact thing.

Note that `-sS` and `-sU` can be specified simultaneously, in which case nmap will perform *both* scans in parallel.

* [UDP Scan (-sU) (Official Nmap Project Guide)](https://nmap.org/book/scan-methods-udp-scan.html)

### Fine-Tuning Scope and Performance

Use `--top-ports 10` to scan only the ten most common ports.

Timing can be specified with the `-T` flag, which takes a template number 0 – 5.

`-T0` waits 5 minutes between port scans, and is thus *not* something you’d want to use when scanning a full port range (doing so would take over 7 months!). It is *very* unlikely to trigger IDS alerts.

`-T1` is also slow (but not nearly as slow as `T0`!), and is typically used in real engagements.

`-T3` is nmap’s default.

`-T4` is generally used during CTFs and learning exercises.

`-T5` is not recommended, as it scans so fast that packet loss is a distinct possibility.

Packet rate can also be bounded using `--min-rate` and `--max-rate` (single numbers representing packets-per-second). The number of *parallel* probes that nmap will have running at any one time can be bounded using `--min-parallelism` and `--max-parallelism`.

### TCP Null Scan, FIN Scan, and Xmas Scan

* `-sN` — Null scan; no TCP flags are set. Used to circumvent *stateless* firewalls. Can distinguish between `closed` and `open|filtered`.
* `-sF` — FIN scan. Use and output is similar to a null scan, but is slightly more likely to be blocked.
* `-sX` — Xmas scan; the FIN, URG, and PSH TCP flags are set. Use and output is similar to a null scan.

### TCP Maimon Scan

 `-sM` — Maimon scan (named after Uriel Maimon); the FIN and ACK TCP flags are set. Should always receive a RST, but some older BSD systems drop the packet on open ports. Of limited modern utility.

### TCP Ack, Windows, and Custom Scan

* `-sA` — ACK scan. All ports *should* respond with a RST, but firewalls will generally block these requests except for open/forwarded ports. Thus, an ACK scan is useful for probing the configuration of intermediate firewalls (but says nothing about whether services are actually *listening* on the identified ports).
* `-sW` — TCP windows scan; the same as an ACK scan except that it examines the TCP window field of returned RST packets and uses it to discern if a port responded *differently*. Note that ports may be reported as closed (and open!) erroneously (as not all systems respond in the same way), but unfiltered ports will be identified. Look for patterns of open/closed ports to try to discern how the target system is responding.
* `--scanflags` — Specify the TCP flags used to probe ports during a scan using URG, PSH, RST, SYN, ACK, FIN (e.g., `--scanflags URGPSHFIN` is the same as `-sX`)

Reference:

* [TCP Window Scan (-sW) (Official Nmap Project Guide)](https://nmap.org/book/scan-methods-window-scan.html)
### Spoofing and Decoys

* `-S` — Use a spoofed IP address for the scan. Only useful if you can actually capture incoming packets at that IP address! Generally must be combined with the `-e` and `-Pn` flags.
* `-e` — Specify the network interface to use during scanning.
* `-D` — Send multiple scan requests using decoys; specified using a list of arbitrary IP addresses. The special “addresses” ME and RND represent the attacker (you!) and a random IP address, respectively. Obviously, if you want results than “ME” will need to be included in the list *somewhere*. Trades stealth for “chaff”. Maybe only useful as a diversion?
* `--spoof-mac` — Use a spoofed MAC address for the scan. Obviously only matters when you’re on the same subnet as the target; otherwise has the same caveats as IP spoofing.

### Fragmented Packets

* `-f` — Fragment packets so that the packet is 8 bytes or less. Specify twice to fragment into 16 byte chunks (which is reverse of how you’d intuitively expect this to work). Can help evade some next-gen firewall / IDS alarms.
* `--mtu` — Choose the fragment length for `-f`; should always be a multiple of 8.
* `--data-length` — Append random data to nmap TCP packets. By default, nmap appends no data after the TCP header; padding this out *can* make scans look more innocuous. Disables protocol-specific payloads, which can decrease scan accuracy, particularly for UDP scans.

Reference:

* [Firewall/IDS Evasion and Spoofing (Official Nmap Project Guide)](https://nmap.org/book/man-bypass-firewalls-ids.html)

### Idle/Zombie Scan

* `-sI` — Idle/Zombie scan. The idea here is to choose a machine with *no* traffic on it and then spoof it’s IP address. Scans then consist of a SYN/ACK to the zombie to get the current IP ID value for the current port, then a SYN to the target (which should either reply with a RST to the zombie, which doesn’t trigger a response and thus doesn’t increment the IP ID, or a SYN/ACK to the zombie, which will respond with a RST which *will* increment the IP ID), then a second SYN/ACK to the zombie to see if the IP ID has been incremented by 1 (port closed or filtered on the target) or 2 (port open on the target). Note that zombies need to be systems that increment the IP ID sequentially *and* globally, and open/closed ports will be from the *zombie’s* perspective, not the attacker’s. These scans are also slooooow (though not as slow as `-T0`).

Reference:

* [TCP Idle Scan (-sI) (Official Nmap Project Guide)](https://nmap.org/book/idlescan.html)

### Getting More Details

* `-d` — Generate debugging output; use `-dd` for even more. This is essentially an additional verbosity leve, such that `-v` < `-vv` < `-d` < `-dd`.
* `--reason` — Show the reason that nmap made a particular identification. Kinda fun.

### Summary of Nmap Advanced Port Scans

* `--source-port` — Specify the source port for a scan. possibly useful to evade some firewall rules?

### Service Detection

* `-sV` — Service detection scan. The same as `-sT` (because a full TCP connection is required to gather the necessary information), but probes listening services for additional information.
* `--version-intensity` — Determine how much service information to collect (and thus how noisy the associated probes will be) with `-sV`. Ranges from 0 – 9; `--version-light` is equivalent to 2, `--version-all` is equivalent to 9.

### OS Detection and Traceroute

* `-O` — OS detection. Generally requires at least one open and one closed port to be detected, and results will be distorted if the target is virtualized. The OS type is much more reliably detected than the OS version.
* `--traceroute` — Perform a traceroute between the attacker and target systems. Note that nmap’s traceroute works in the opposite fashion (high TTL to low TTL) than traceroute/tracert. Note that most routers will not send ICMP TTL exceeded packets, and will thus show up as `*`.

### Nmap Scripting Engine (NSE)

* `-sC` — Run all default scripts (as applicable).
* `--script` — Run specified scripts, or all scripts in a specified category (as applicable). Also accepts wildcard matches (e.g., `ftp*`).

Nmap script categories:

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

* [Nmap Scripting Engine Usage and Examples (Official Nmap Project Guide)](https://nmap.org/book/nse-usage.html)

### Saving the Output

* `-oN` — Save results as “normal” output. This is more-or-less what nmap will print to STDOUT.
* `-oG` — Save the results as “grepable” output. This is a compact format meant to automatically provide context when searched with grep.
* `-oX` — Save the results as XML, designed to be importable by other applications.
* `-oA` — Save the results in “normal”, “grepable”, and XML formats simultaneously. This option will automatically append meaningful extensions (the other options do not do this).

### Summary of Nmap Post Port Scans

* `-A` — Alias for `-sV -O -sC --traceroute`.

### Telnet

The default port for `telnetd` is TCP 23.

### Hypertext Transfer protocol (HTTP)

Minimal valid HTTP request:

```http
GET / HTTP/1.1
host: something

```

(Note the blank line at the end.)

### File Transfer Protocol (FTP)

FTP commands:

| Command | Meaning                                                 |
| -------:|:------------------------------------------------------- |
|    USER | Specify the username for the account logging on.        | 
|    PASS | Specify the password for the account logging on.        |
|    STAT | Provide connection/server information.                  |
|    SYST | Provide system “type” information.                      |
|    PASV | Switch to passive mode.                                 |
|    TYPE | Switch between ASCII (A) and binary (I) transfer modes. |

Note that you cannot receive files using FTP with telnet/netcat, as file transfers are conducted over a separate channel (either a channel originating from port 20 on the server for “active” mode or a random port above 1023 on the client for “passive” mode).

### Simple Mail Transfer Protocol (SMTP)

A set of commands to send an email:

```smtp
HELO somehostname
MAIL FROM:fromaddress@host1.tld
RCPT TO:toaddress@host2.tld
DATA
To: "To Address" <toaddress@host2.tld>
From: "From Address" <fromaddress@host1.tld>
Subject: An Email
This is content.

Here is another line.
.
QUIT
```

Note that `MAIL FROM` / `From` and `RCPT TO` / `To` are not actually required to match, though failure to fill in the `MAIL FROM` / `RCPT TO` commands *may* result in the message being rejected. The commands above are *not* case-sensitive, and the message ends with a `.` on a single line.

* [In SMTP, must the RCPT TO: and TO: match?](https://stackoverflow.com/questions/10822190/in-smtp-must-the-rcpt-to-and-to-match)

### Post Office Protocol 3 (POP3)

POP3 commands:

| Command | Meaning                                                 |
| -------:|:------------------------------------------------------- |
|    USER | Username to use for authentication                      |
|    PASS | Password to use for authentication                      |
|    STAT | Mailbox statistics (`+OK $TOTAL_MSGS $MBOX_SIZE_BYTES`) |
|    LIST | List messages (`$MSG_NUMBER $MSG_SIZE_BYTES`)           |
|    RETR | Retrieve message `$MESSAGE_NUMBER`                      |
|    QUIT | Close connection                                        |

### Internet Message Access Protocol (IMAP)

IMAP commands are much more complicated than POP3. Some examples:

|                  Command | Meaning              |
| ------------------------:|:-------------------- |
| `prefix LOGIN user pass` | Login user           | 
|     `prefix LIST "" "*"` | List folders         |
|   `prefix EXAMINE INBOX` | List emails in INBOX |
|          `prefix LOGOUT` | Close connection     |

Here `prefix` is a random prefix we provide to track server replies to various commands. IMAP accepts a lot of different user authentication methods; LOGIN is just the simplest (and least secure).

### Introduction to Attacking Protocols and Servers

The CIA triad has an attacker’s counterpart:

| Defender’s Triad | Attacker’s Triad |
| ----------------:|:---------------- |
|  Confidentiality | Disclosure       |
|        Integrity | Alteration       |
|     Availability | Destruction      |

### Sniffing Attack

```bash
# Quick-n-dirty packet capture
#
sudo tcpdump port $PORT_TO_FILTER_ON -A
```

The `-A` flag prints packet contents in ASCII. Wireshark is obviously nicer.

### Transport Layer Security (TLS)

SSL/TLS operate on the OSI presentation layer (layer 6).

DoT = DNS-over-TLS

* [OSI Model](../notes/osi-model.md)

### Password Attack

```bash
# Generic Hydra invocation
#
hydra -l $USERNAME -P $WORDLIST $SERVER $SERVICE

# For example...
#
hydra -l john \
      -P ~/.local/share/red-team/wordlists/rockyou.txt \
        10.10.10.100 ssh
```

Additional Hydra options:

* `-s` — Specify a non-default port.
* `-V` — Verbose. Also use `-vV` for something more verbose, or `-d` for debugging output.
* `-t` — Specify the number of parallel attempts.

Note that Hydra doesn’t stop automatically after a password is found.

* [Using Hydra](../notes/hydra.md)

### Summary of Attacking Protocols and Servers

FTPS uses TCP 990 by default.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 2, 2022
