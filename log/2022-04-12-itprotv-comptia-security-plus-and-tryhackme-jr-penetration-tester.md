# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester #Draft

## CompTIA Security+ Exam Cram

Today’s reading is Chapter 30 from the Security+ Exam Cram, “Digital Forensics”.

### Order of Volatility

The idea here is to gather evidence from the most volatile storage (generally RAM) to the least volatile (generally backups or off-system logs). Prioritize imaging/copying/investigating storage so that you run the minimum risk of loosing information!

First-line information:

* System date, time, etc.
* Currently established network connections
* Currently open ports and associated applications/services
* Other running applications/services

Typical order of volatility:

* CPU registers/caches
* Peripheral & expansion card memory (particularly networking cards)
* Kernel memory
* Non-kernel memory
* tmpfs & friends
* Onboard storage
* Removable rewritable storage
* Removable write-once storage

I’m guessing that external logs probably sit between removable rewritable storage and removable write-once storage.

### Chain of Custody

Basically, log all the things. Time, date, action, people involved. Include thought processes and inferences. Properties:

* Admissible (following legal or organizational standards)
* Authentic (shown to be related to the investigation at hand)
* Complete (covers all angles — for example, *all* users logged into a system, not just accounts of interest)
* Reliable (shown to be unmodified)
* Believable (basically, written in a way that non-technical audiences can follow)

Investigative steps:

* Identify potential evidence
* Determine preservation techniques
* Extract, process, log, interpret, etc.
* Clean up for presentation (corporate or legal)

### Data Acquisition

* System Images (be careful to ensure that these cannot be inadvertently written to during analysis!)
* Network Traffic & Logs (traffic is generally only captured in the event that the incident is ongoing when the investigation begins)
* Video & Photographs (the point here is to try to demonstrate that evidence was not planted)
* System Time & Time Zone (important to record early because computers use all sorts of different time zones)
* Hashes (to verify that forensic images are the same as the original data, and that data has not been changed during analysis)
* Screenshots
* Witnesses

<!--

## ITPro.TV: CompTIA Security+ (SY0-601)

### Digital Forensics Concepts

==xxx==

## TryHackMe: Jr. Penetration Tester

### Vulnerability Capstone

==xxx==

### Introduction to Metasploit

==xxx==

### Main Components of Metasploit

==xxx==

### Msfconsole

==xxx==

### Working with Modules

==xxx==

### Introduction to Metasploit Summary

==xxx==

### Introduction to Exploitation with Metasploit

==xxx==

### Scanning

==xxx==

### The Metasploit Database

==xxx==

### Vulnerability Scanning

==xxx==

### Exploitation

==xxx==

### Msfvenom

==xxx==

### Exploitation with Metasploit Summary

==xxx==

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

-->

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 12, 2022
