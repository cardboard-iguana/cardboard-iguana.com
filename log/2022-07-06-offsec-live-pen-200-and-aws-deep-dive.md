# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-07-06

Another entry written in two parts. As before, the OffSec Live class notes were in the morning and the “AWS Cloud Practitioner Essentials” notes are from the evening.

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [OffSecOfficial Twitch Channel](https://www.twitch.tv/offsecofficial)
* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## OffSec Live: Basic Tools, Part 2

(As is becoming normal, I missed some of the beginning of this. Though this time I was late because of technical difficulties, rather than poor planning.)

### NMAP & Wireshark

* Nmap host discovery scans use the following tests (in order) for host discovery: ICMP ping, port 443, port 80, ICMP timestamp. Note that ICMP packets can only be sent when nmap is run with root privileges.
* Even nmap’s host discovery scan (when run as root) can miss windows hosts. OffSec recommends supplementing this with a full scan of the top 10 most common ports with host discovery disabled (`--top-ports 10 -Pn`), as well as perhaps using a tool like `arping` (if you’re on the same network, of course).
* Windows will respond to connections to closed ports with a RST packet *if* the firewall is down. (If the firewall is up, it will simply *not* respond.)

REFERENCES:

* [Using “nmap”](../notes/nmap.md)

## Global Infrastructure and Reliability

AWS controls (owns?) the fiber connections between data centers and regions.

Features are sometimes deployed on a region-by-region basis (generally if they’re hardware-dependent).

“Availability zones” are comprised on one or more data centers that act together as a unit. Regions contain multiple availability zones (*at least* two), which are distributed geographically to make local disasters unlikely (but still close enough so that latency is negligable).

AWS recommends running across at least two availability zones in a region.

### Edge Locations

“Edge locations” are data centers that run services *apart* from regions — CloudFront, Route 53, and Outposts (on-prem AWS data centers). These are more distributed than actual availability zones, as the point is to get these services as close to the actual customers/users as possible.

### Provisioning AWS Resources

“Elastic Beanstalk” and “CloudFormation” are similar in purpose. The difference is that Beanstalk functions as an EC2-centric abstraction layer (think: Heroku), while CloudFormation supports more services and is a full “infrastructure as code” offering. (In fact, formally Beanstalk is an application that runs *on top of* CloudFormation!)

REFERENCES:

* [What is the difference between Elastic Beanstalk and CloudFormation for a .NET project?](https://stackoverflow.com/a/14429767)
* [AWS CloudFormation FAQs](https://aws.amazon.com/cloudformation/faqs/)

## Networking

While “Internet Gateways” route public traffic into a VPC, “Virtual Private Gateways” take care of routing traffic from *private* networks (via a VPN).

A third option for connecting a VPC is “Direct Connect”, which is a dedicated fiber line from an on-prem data center to AWS (and from there the appropriate VPC).

VPCs can contain multiple Internet Gateways, Virtual Private Gateways, and Direct Connect lines, though each must be attached to its own distinct subnet (note, however, that a subnet does *not* need to have *any* of these features).

### Subnets and NACLs

All packets in AWS transiting between VPC subnets are checked using NACLs. Security groups provide EC2 instance level packet filtering. NACLs are stateless, while security groups are stateful (and always allow packets for established connections).

### Global Networking

Route 53 can provide geographically-dependent and load balanced DNS responses.

<!--

## Storage and Databases

==xxx==

### EBS

==xxx==

### S3

==xxx==

### EFS

==xxx==

### RDS

==xxx==

### DynamoDB

==xxx==

### Redshift

==xxx==

### Database Migration Service

==xxx==

### Other AWS Database Services

==xxx==

## Security

==xxx==

### Shared Responsibility

==xxx==

### User Permissions

==xxx==

### AWS Organizations

==xxx==

### Compliance

==xxx==

### DoS Attacks

==xxx==

### Additional Security Services

==xxx==

## Monitoring and Analytics

==xxx==

### CloudWatch

==xxx==

### CloudTrail

==xxx==

### Trusted Advisor

==xxx==

## Pricing and Support

==xxx==

### Free Tier

==xxx==

### Pricing Concepts

==xxx==

### Billing Dashboard

==xxx==

### Consolidated Billing

==xxx==

### Budgets

==xxx==

### Cost Explorer

==xxx==

### Support Plans

==xxx==

### Marketplace

==xxx==

## Migration and Innovation

==xxx==

### Cloud Adoption Framework

==xxx==

### Migration Strategies

==xxx==

### The AWS Snow Family

==xxx==

### Innovate with AWS

==xxx==

## The Cloud Journey

==xxx==

### The AWS Well-Architected Framework

==xxx==

### Benefits of the AWS Cloud

==xxx==

## AWS Certified Cloud Practitioner Basics

==xxx==

## Course Final Assessment

==xxx==

## Feedback

==xxx==

-->

<!--

## Amazon VPC: Security at the Speed of Light

REFERENCES:

* [AWS re:Invent 2018: Amazon VPC — Security at the Speed of Light (YouTube)](https://youtu.be/uhXalpNzPU4)

## Amazon API Gateway

REFERENCES:

* [Amazon API Gateway: Developer Guide](https://aws.amazon.com/api-gateway/getting-started/)

## AWS IAM Policies in a Nutshell

REFERENCES:

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)

## DNS Demystified: Amazon Route 53

REFERENCES:

* [AWS re:Invent 2016: DNS Demystified — Amazon Route 53 (YouTube)](https://youtu.be/UP7wDBjZ37o)

## Deep Dive on New Amazon EC2 Instances and Virtualization Technologies

REFERENCES:

* [Deep Dive on New Amazon EC2 Instances and Virtualization Technologies (YouTube)](https://youtu.be/AAq-DDbFiIE)

## Another Day, Another Billion Packets

REFERENCES:

* [AWS re:Invent 2015: Another Day, Another Billion Packets (YouTube)](https://youtu.be/R-n4dDGfQd4)

## A Serverless Journey: AWS Lambda Under the Hood

REFERENCES:

* [AWS re:Invent 2018: A Serverless Journey — AWS Lambda Under the Hood (YouTube)](https://youtu.be/3qln2u1Vr2E)

## AWS IAM Privilege Escalation: Methods and Mitigation

REFERENCES:

* [AWS IAM Privilege Escalation — Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

## AWS KMS Cryptographic Details

REFERENCES:

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Well-Architected Framework

REFERENCES:

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## AWS Networking Example

REFERENCES:

* [AWS — Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

## AWS Developer Tools

REFERENCES:

* [AWS — Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

## Signature Version 4 Signing Process

REFERENCES:

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## Introduction to the AWS CLI

REFERENCES:

* [AWS re:Invent 2017: Introduction to the AWS CLI (YouTube)](https://youtu.be/QdzV04T_kec)

-->

<!-- (Walk through Learning Path 2 on the internal wiki.) -->

<!--

## AWS Compute Services

REFERENCES:

* [AWS — Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

## AWS Container Services

REFERENCES:

* [AWS — Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

## AWS Storage Services

REFERENCES:

* [AWS — Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

## AWS Database Services

REFERENCES:

* [AWS — Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

## AWS Migration Services

REFERENCES:

* [AWS — Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

## AWS Networking Services

REFERENCES:

* [AWS — Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

## AWS Security, Identity, and Compliance

REFERENCES:

* [AWS — Security, Identity, and Compliance](https://ardsec.blogspot.com/2019/06/aws-security-identity-and-compliance.html)

-->

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
