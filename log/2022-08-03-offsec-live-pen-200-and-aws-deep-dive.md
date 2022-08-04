# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-03

The semi-regular Wednesday twofer: OffSec Live in the morning and the “Monitoring and Analytics” portion of the “AWS Cloud Practitioner Essentials” course in the evening.

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)
* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## OffSec Live: SQL Injection

* Remember that when trying to bypass logins with SQL injection, it’s a good idea to use `limit 1` to ensure that the code gets back the expected number of results!
* In MySQL, you can use `concat()` to return values from multiple columns in a single output field. Since `concat()` accepts hexadecimal values for ASCII characters, we can use `0x3a` (`:`) to make field separation obvious.
* Sometimes you can chain queries as part of SQL injection. This isn’t useful for *retrieving* input, but if the database is badly secured you can use this to *modify* the backend database (obviously requires the application to be using the same user/permissions for both reads and writes). Use the `sleep()` function to test if this vulnerability impacts the system you’re attacking.

REFERENCES:

* [SQL Injection](../notes/sql-injection.md)

### MySQL Reverse Shells

* It’s really hard to get a reverse shell in PostgrSQL. But MySQL and MariaDB are more exploitable.
* You can “upload” reverse shells using MySQL using `INTO OUTFILE`: `'<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/html/cmd.php'` (the path may require some brute-forcing or additional reconnaissance; sometimes you can force an error to return a potentially writeable path). This can then be leveraged into a reverse shell.

REFERENCES:

* [Exploiting MySQL](../notes/exploiting-mysql.md)

## Monitoring and Analytics

### CloudWatch

* CloudWatch is primarily about log *monitoring* — *metrics* are extracted from logs, which can be watched by *alarms* that trigger certain actions (like sending messages to SNS) when triggered.
* CloudWatch can ingest data from on-prem systems, in addition to services/system in AWS.

### CloudTrail

* CloudTrail is AWS’s (API) logging engine.
* Logs are stored in S3.
* Events are logged with 15 minutes.
* CloudTrail has its *own* alarm/automation system, called “CloudTrail Insights”.
* You might thing of CloudTrail as being more concerned about account *activity*, and CloudWatch as being more focused on service/resource *performance*.

### Trusted Advisor

* This seems to be a more general version of AWS Inspector — Trusted Advisor is more about your *entire* AWS account, while AWS Inspector is geared more towards individual systems.
* Trusted Advisor can detect S3 buckets with open access permissions. (It’s starting to sound a bit like Scout Suite.)

REFERENCES:

* [nccgroup / ScoutSuite](https://github.com/nccgroup/ScoutSuite)

<!--

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
