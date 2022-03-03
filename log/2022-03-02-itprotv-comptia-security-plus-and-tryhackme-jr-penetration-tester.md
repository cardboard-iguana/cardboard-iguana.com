# ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester #Draft

## CompTIA Security+ Exam Cram

### An Introduction to Threat Actors, Vectors, and Intelligence Sources

Threat actor: Someone or something that executes on a given threat. The “who” of a cybersecurity incident.

### Threat Actor Attributes

Things to consider:

* What is the threat actor’s *relationship* to your organization?
* What it the *motive* of the threat actor?
* What is the *intent* of the threat actor?
* What are the threat actor’s *capabilities*?

(Later on, Exam Cram talks about these factors as part of building a threat profile for an organization, though this seems like an odd take to me. Really, *anyone* could be targeted by *anything*, but the associated *risk* of attack by a given threat actor is going to vary depending upon the particular situation. This make threat *profiles* inherently probabilistic — you wouldn’t really say “my threat profile includes external threat actors”, but rather “the most common threat actors we expect to face are external”.)

The *intent* vs. *motive* is a question of the threat actor’s *proximate* vs. *distal* objectives. For example, a threat actor may *intend* to deploy ransomware because they are *motivated* by financial gain. Intents and motives may not necessarily be malicious: For example, a careless employee *motivated* to close a deal may *intend* to share documents that they think will help realize that end, without thinking through the consequence of those documents exposure to the wider organization.

Exam Cram indicates that the primary *relationship* that the Security+ exam is concerned with is whether a threat actor is *internal* or *external*.

### Threat Actor Types

Common types from the Security+ exam:

* Script kiddies
* Insiders
* hacktivists
* Criminal syndicates
* Competitors
* State actors

Exam Cram uses the term “low and slow” to describe APT operations.

### Vectors

A.k.a., “attack vectors” — the pathway used by the threat actor when attacking an organization. Common attack vectors from the Security+ exam:

* Direct access
* Wireless
* Removable media
* Cloud system
* Email
* Improper usage
* Equipment damage/loss/theft
* Supply chain

(What, no “they just connected to the exposed RDP endpoint over the internet”? I guess that qualifies as “improper usage”?)

### Sharing Centers

ISAC: Information Sharing and Analysis Center

### Open-Source Intelligence

OSINT: Open Source INTelligence

Which is not “open source” like “open source software”, but rather “open” as in freely available. Exam Cram calls OSINT “*overtly* gathered intelligence”, which I kind of like.

Common sources:

* Vulnerability databases
* MITRE’s ATT&CK (Tactics, Techniques, and Procedures — a.k.a. TTPs)
* Dark web
* Indicators of compromise (a.k.a., IOCs — frequently published by threat intel firms)
* Automated indicator sharing (a.k.a., AIS — a DHS program built on the structured threat information expression — STIX — language and the trusted automated exchange of indicator information — TAXII — protocol)
* Threat maps (sometimes published by threat intel firms)
* File/code repos
* General web information — blog posts, papers, photos, RFCs, etc.

Some specific links:

* [MITRE CVEs](https://cve.mitre.org/)
* [CVE Details](https://cvedetails.com/)
* [VulnDB](https://vulndb.cyberriskanalytics.com/)
* [MITRE ATT&CK](https://attack.mitre.org/)
* [Kaspersky Cyberthreat Map](https://cybermap.kaspersky.com/)

Exam Cram calls out TTP, IOC, and AIS as three acronyms to know for the exam.

## ITPro.TV: CompTIA Security+ (SY0-601)

### Threat Intelligence — OSINT

Threat Intelligence: The gathering and analysis of data for the purpose of identifying, preventing, and remediating potential attacks.

One reason to go through the exercise of information classification is to ensure that proper controls are in place to prevent the disclosure of potentially sensitive data (which could then be used by attackers in their OSINT efforts!).

Useful tools:

* Maltego (GUI, part of Kali)
* recon-ng (CLI, also part of Kali)
* Shodan.io / Censys.io (these sites can be integrated into the previous two tools)

Both Maltego and recon-ng require a large number of API keys to function

### Threat Intelligence — Threat Maps And Feeds

Threat Map: A real- (or near-real-) time map of identified threats/attacks, normally visualized geographically.

Threat Feed: A real- (or near-real-) time stream (often in the form of an RSS feed) containing information about threats, attacks, and threat actors.

Things that often go into a threat feed:

* Domain reputation
* Observed malware activity
* Known malicious IPs
* Other IOCs

VirusTotal is a *little bit* like a threat feed.

STIX and TAXII together define a common (low-level) language for talking about IOCs and transmitting them between systems. STIX and TAXII come together in the Automated Indicator Sharing (AIS) system, which is CISA’s IOC clearinghouse mentioned by Exam Cram.

I’m a little skeptical about the overall utility of threat maps, though they do *look* cool.

### Threat Intelligence Vulnerability Databases & Feeds

Vulnerability Database: A collection of information about security flaws (and sometimes information about how to exploit them).

Examples:

* MITRE CVEs (Common Vulnerability Exposures) and ATT&CK
* NVD (National Vulnerability Database, maintained by NIST)
* USCERT (US Computer Emergency Response Team; maintains a useful knowledgebase)

NVD includes a number of components:

* SCAP (the Security Content Automation Protocol, which is a common protocol for talking about software flaws, configuration issues, and automation)
* CCE (the Common Configuration Enumeration, which provides unique identifiers for system configurations)
* CPE (the Common Platform Enumeration, which provides a way to describe common clusters of applications, operating systems, etc.)
* CVSS (the Common Vulnerability Scoring System, which provides severity scoring for CVEs that tries to weigh both impact and ease of exploitation, from “nothing to worry about here” 0 to “hair on fire” 10)

A vulnerability feed is like a threat feed, but for vulnerabilities. MITRE and NVD both maintain vulnerability feeds.

### Threat Actors And Vectors

Common threat actors that are important to know for the Security+ exam:

* Script kiddies
* Insider threats (including shadow IT)
* Hacktivists
* APTs
* State actors (strong overlap with APTs)
* Criminal syndicates (*sometimes* overlaps with APTs)
* Competitors

Threat Vector: An avenue of attack.

* Direct access (tends to be insider threats)
* Wireless
* Email
* Supply chain
* Social media
* Removable media
* Cloud-based avenues (S3 buckets, etc.)

## TryHackMe: Jr. Penetration Tester

### Authentication Bypass in Brief

==xxx==

### Username Enumeration

==xxx==

### Brute Forcing

==xxx==

### Logic Flaws

==xxx==

### Cookie Tampering

==xxx==

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 2, 2022
