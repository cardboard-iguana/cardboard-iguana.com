# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester #Draft

## ITPro.TV: CompTIA Security+ (SY0-601)

### Incident Response Process

Event = Something that raises a potential security flag.

Incident = A violation of some security process or policy.

Phases:

* Preparation (logging and monitoring)
* Identification (detection, analysis, and alerting of *events*)
* Containment (network isolation, system shutdowns, etc.)
* Eradication (malware removal, wipe-and-reload, etc. *and* verify that no additional systems are impacted)
* Recovery (return to normal… *after* verification of eradication)
* Lessons Learned

Part of recovery is ascertaining *how* the incident occurred and remediating the associated vulnerability/vulnerabilities.

A good distinction: A “runbook” is an *automated* playbook.

Things to have in your after action report:

* What went right?
* What went… well?
* What went wrong?
* What was impacted?
* How was the attack accomplished?
* How can existing systems be improved?

### Incident Response Plans

* Who are you reporting to? Who approves your actions? Who initiates the incidence response process?
* Who’s on your team? (IT, experts, consultants, LEOs, etc.)
* Who are your stakeholders? What are your responsibilities to them? How will they be communicated with?
* How are internal comms handled? External comms? (And when?)
* How is evidence handled, documented, and retained?

BCDRP = Business Continuity and Disaster Recovery Plan

Exercises, in order of how closely they mimic/interrogate the IRP:

* Tabletop exercises
* Walkthroughs
* Simulations

There’s actually a tabletop game created by Black Hills Information Security that’s designed to help with tabletop exercises.

* [Backdoors & Breaches](https://www.blackhillsinfosec.com/projects/backdoorsandbreaches/)

### Attack Frameworks

An “attack framework” is just a way to describe an attack in a standardized fashion.

* MITRE ATT&CK (Adversarial Tactics, Techniques & Common Knowledge)
* Diamond Model (from top clockwise: adversary, capabilities, victim, infrastructure)
* Cyber Kill Chain (recon, weaponization, delivery, exploitation, installation, command and control, actions on objective)

The diamond model can be summarized as, “for every intrusion, there exists an *adversary* who is using their *capabilities* over/with some kind of infrastructure *infrastructure* to attack a *victim*.”

MITRE ATT&CK is really the gold standard though.

* [MITRE ATT&CK](https://attack.mitre.org/)

## TryHackMe: Jr. Penetration Tester

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

<!--

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
<span aria-hidden="true">📅</span> April 20, 2022
