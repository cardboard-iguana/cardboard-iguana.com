# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester #Draft

## CompTIA Security+ Exam Cram

Today’s reading is Chapter 28 from the Security+ Exam Cram, “Incident Investigation”.

### SIEM Dashboards

The key to SIEM alerting is the correlation engine — looking for user connections *after* that user has left the office, etc.

### Logging

Log files = documentation (of system/application/user activity)

> Web server logs are usually access logs, common error logs, custom logs, and W3C logs. W3C logs are used mainly by web servers to log web-related events, including web logs.

Huh?

(It looks like W3C logs are just a particular standardized log format. Despite coming out of the W3C, only IIS and Amazon Cloudfront seem to use this.)

Windows Event Log fields:

| Field         | Data                                                                    |
|:------------- |:----------------------------------------------------------------------- |
| Type          | Warning, error, information, etc.                                       |
| Time          | Date/time for the computer *sending* the log                            |
| Computer      | Computer name                                                           |
| Provider Type | The facility that generated the event (generally the Windows Event Log) |
| Provider Name | The name of the log (Application, Security, etc.)                       |
| Source        | Application                                                             |
| Event ID      | Standardized (*not* unique!) identifier                                 |
| Description   | Self-explanatory                                                        |

Event IDs from the Windows Event Log can generally be looked up in the Microsoft Knowledge base.

One way to think about SNMP is as a data source for multi-system logs.

A Windows-centric list of log types:

* System
* Audit (events important for auditing and forensics needs; user logins go here)
* Security
* Access (system-to-system — not user! — access events)

Anomaly detection generally works better on network logs than device logs.

Heh… `journald` *still* doesn’t have remote logging, instead relying on forwarding to a syslog-compatible daemon.

* [An SEOs Guide To W3C Log Files](https://www.screamingfrog.co.uk/an-seos-guide-to-w3c-log-files/)

### Network Activity

Most network activity monitoring tools don’t store actual packets, but rather just log metadata about those packets (minimally: source, destination, protocol).

### Protocol Analyzers

Protocol Analyzer = Packet Sniffer

Now we’re talking about actual packet capture!

### Network Flow

A.k.a. “NetFlow” (originally a Cisco thing, but since genericized). Basically, this is packet capture and analysis on router interfaces. NetFlow (and related tools like sFlow) are oriented towards understanding network usage rather than the behavior of individual machines/connections.

NetFlow data is exported using the IPFIX (Internet Protocol Flow Information Export) format.

## ITPro.TV: CompTIA Security+ (SY0-601)

### Investigational Data Sources

SIEM = You 10,000 ft view

The SIEM correlation engine is just a (user defined?) list of event sequences of interest.

IPFIX is an IETF standard.

Wireshark has some statistical packet-analysis capabilities.

General log analysis flow: Filtered down to warnings/errors, locate an event of interest, and then expand your search around that timeframe to include lower-level/priority events.

Call out to WinDbg Preview, which is a free Windows dump file analyzer in the Microsoft Store. Windows typically stores dump files in `C:\Windows`, so you’ll need to copy it out to view it.

## TryHackMe: Jr. Penetration Tester

### Introduction to Meterpreter

==xxx==

### Meterpreter Flavors

==xxx==

### Meterpreter Commands

==xxx==

### Post-Exploitation with Meterpreter

==xxx==

### Post-Exploitation Challenge

==xxx==

### Introduction to Linux PrivEsc

==xxx==

### What is Privilege Escalation?

==xxx==

### Enumeration

==xxx==

### Automated Enumeration Tools

==xxx==

### Kernel Exploits

==xxx==

### Sudo

==xxx==

### SUID

==xxx==

### Capabilities

==xxx==

### Cron Jobs

==xxx==

### PATH

==xxx==

### NFS

==xxx==

### Capstone Challenge

==xxx==

### Introduction to Windows PrivEsc

==xxx==

### Information Gathering

==xxx==

### Tools of the Trade

==xxx==

### Vulnerable Software

==xxx==

### DLL Hijacking

==xxx==

### Unquoted Service Path

==xxx==

### Token Impersonation

==xxx==

### Quick Wins

==xxx==

<!--

## Meterpreter

### Introduction

==xxx==

### Meterpreter Flavors

==xxx==

### Meterpreter Commands

==xxx==

### Post-Exploitation with Meterpreter

==xxx==

### Post-Exploitation Challenge

==xxx==

## Linux PrivEsc

### Introduction

==xxx==

### What is Privilege Escalation?

==xxx==

### Enumeration

==xxx==

### Automated Enumeration Tools

==xxx==

### Kernel Exploits

==xxx==

### Sudo

==xxx==

### SUID

==xxx==

### Capabilities

==xxx==

### Cron Jobs

==xxx==

### PATH

==xxx==

### NFS

==xxx==

### Capstone Challenge

==xxx==

## Windows PrivEsc

### Introduction

==xxx==

### Information Gathering

==xxx==

### Tools of the Trade

==xxx==

### Vulnerable Software

==xxx==

### DLL Hijacking

==xxx==

### Unquoted Service Path

==xxx==

### Token Impersonation

==xxx==

### Quick Wins

==xxx==

-->

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 18, 2022
