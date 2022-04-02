# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester #Draft

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

### Introduction to Nmap Basic Port Scans

==xxx==

### TCP and UDP Ports

==xxx==

### TCP Flags

==xxx==

### TCP Connect Scan

==xxx==

### TCP SYN Scan

==xxx==

### UDP Scan

==xxx==

### Fine-Tuning Scope and Performance

==xxx==

### Summary of Nmap Basic Port Scans

==xxx==

### Introduction to Nmap Advanced Port Scans

==xxx==

### TCP Null Scan, FIN Scan, and Xmas Scan

==xxx==

### TCP Maimon Scan

==xxx==

### TCP Ack, Windows, and Custom Scan

==xxx==

### Spoofing and Decoys

==xxx==

### Fragmented Packets

==xxx==

### Idle/Zombie Scan

==xxx==

### Getting More Details

==xxx==

### Summary of Nmap Advanced Port Scans

==xxx==

### Introduction to Nmap Post Port Scans

==xxx==

### Service Detection

==xxx==

### OS Detection and Traceroute

==xxx==

### Nmap Scripting Engine (NSE)

==xxx==

### Saving the Output

==xxx==

### Summary of Nmap Post Port Scans

==xxx==

### Introduction to Protocols and Servers

==xxx==

### Telnet

==xxx==

### Hypertext Transfer protocol (HTTP)

==xxx==

### File Transfer Protocol (FTP)

==xxx==

### Simple Mail Transfer Protocol (SMTP)

==xxx==

### Post Office Protocol 3 (POP3)

==xxx==

### Internet Message Access Protocol (IMAP)

==xxx==

### Sniffing Attack

==xxx==

### Man-in-the-Middle (MITM) Attack

==xxx==

### Transport Layer Security (TLS)

==xxx==

### Secure Shell (SSH)

==xxx==

### Password Attack

==xxx==

### Summary of Protocols and Servers

==xxx==

### Net Sec Challenge

==xxx==

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 2, 2022
