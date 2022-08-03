# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-02

Today I’ll be covering the “Security” module of the “AWS Cloud Practitioner Essentials” course.

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## Shared Responsibility

A good way of describing the shared security model:

> AWS is responsible for security *of* the cloud, while customers are responsible for security *in* the cloud.
> 
> — Rudy Chetty, “AWS Cloud Practitioner Essentials”

Apparently, “AWS phone support scams” are a thing.

## User Permissions

Only the permissions for a single role are in effect at any one time.

## AWS Organizations

AWS accounts are commonly used to provide hard(er) permission boundaries between teams and application functions.

”Organizations“ provides a “meta account” feature (called the “root” account) that can centralize billing and enforce features *within* the member accounts.

Within organizations, accounts can be grouped using an OU model.

Permissions are enforced using “service control policies (SCPs), which enable/disable services/APIs and can set permission ceilings. SCPs can be applied to individual accounts or to entire OUs.

Note that SCPs do *not* apply directly to IAM objects. Instead, think of them as providing limits that those IAM objects (and the account’s root user!) must operate within.

## Compliance

AWS compliance reports and agreements are consolidated into a single portal, called “Artifact”.

## DDoS Attacks

DDoS mitigations in AWS:

| Attack                        | Mitigation            |
|:----------------------------- |:--------------------- |
| UDP Flood, Reflection Attacks | Security Groups       |
| Slowloris                     | Elastic Load Balancer |
| Targeted Attacks              | AWS Shield / WAF      |

## Additional Security Services

AWS Inspector is a service that can audit an AWS account configuration and report on deviations from baseline best practices.

GuardDuty is an AWS-centric threat hunting solution (sounds a bit like a SIEM). GuardDuty can be hooked into AWS Lambda to automate response based on the signals it detects.

<!--

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
