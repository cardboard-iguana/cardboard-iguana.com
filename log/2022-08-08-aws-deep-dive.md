# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-08

Today I’ll be covering the “Migration and Innovation” module from the “AWS Cloud Practitioner Essentials” course.

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## Cloud Adoption Framework

* This is actually a compilation of frameworks around AWS migration, each one geared towards a different class of stakeholders (called “perspectives”): Business, People, Governance, Platform, Security, and Operations.
* The BUSINESS perspective relates to company-wide strategies and goals, and is geared towards managers, financial, etc.
* The PEOPLE perspective focuses on organizational structure, and is geared towards managers, HR, etc.
* The GOVERNANCE perspective is about business processes. It’s geared towards managers, the C-suite, etc.
* The PLATFORM perspective relates to IT architecture and infrastructure writ large, and is intended for IT staff, the C-suite, etc.
* The SECURITY perspective focuses on IT security issues and systems (including user permissions), and is thus geared towards cybersecurity teams, the C-suite, etc.
* The OPERATIONS perspective is about day-to-day IT operations. It’s focused on IT staff (specifically support and operations).

## Migration Strategies

* Amazon categorizes cloud migration strategies into six broad buckets (called the “6 Rs”): Rehosting, Replatforming, Refactoring, Repurchasing, Retaining, and Retiring.
* The “6 Rs” aren’t about company-wide strategies — rather, they’re strategies that would be applied to specific applications or services. Thus, most businesses will use a mix of strategies for their *overall* migration.
* REHOSTING is just the “lift and shift” migration strategy.
* REPLATFORMING is an extension to “lift and shift” — think of it as “lift, tinker, and shift”. This is about using different platforms so long as *no* code changes are made.
* RETIRING is just what it sounds like — do you *really* still need this application?
* RETAINING just means that you decide *not* to migrate a particular application to AWS (or the cloud in general) after all. Sometimes this is permanent, but sometimes this is because an application is already being spun down, so why spend the effort migrating it when it’s already (almost) end-of-life?
* REPURCHASING means purchasing an entirely new, cloud-native solution for an application or capability. This can be expensive up-front.
* REFACTORING (also called “re-architecting”) is about actually writing new software, or new software components to migrate an application. This is the highest risk/reward option.

## The AWS Snow Family

* The “snow family” is a set of special-purpose devices used to aid in the migration of large amounts of data to AWS.
* SNOWCONE holds up to 8 TB of data. Information loaded onto a snowcone device is normally transferred to S3 once the device has been returned to AWS.
* SNOWBALL EDGE are rack-mounted devices that can perform data pre-processing before storage. There are two varieties: A storage-optimized version with an 80 TB capacity and a compute-optimized version with a 42 TB capacity but the ability to perform much more intense pre-processing. They support local Lambda functions for data processing, and are intended to be used in remote locations that don’t have the necessary hardware to handle a data migration already on-prem.
* SNOWMOBILE is a mini data center (up to 100 PB of storage) that’s housed in a shipping container. A dedicated security detail protects snowmobile in transit.
* All snow family devices use encryption at rest, with keys that can be managed by AWS KMS.

## Innovate with AWS

* AWS supports VMWare (though it’s a special service).
* SageMaker is an in-house machine learning solution (though it supports open source frameworks as well). “Amazon Augmented AI” is a similar solution.
* The core Alexa AI is offered as a service under “Amazon Lex”.
* Textract handles text extraction/OCR.
* Amazon actually maintains its own *satellites*, which are sold in a service model via AWS Ground Station.

<!--

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
