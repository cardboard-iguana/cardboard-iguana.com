# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-07-05

Today I’ll be starting the ~6 hour “AWS Cloud Practitioner Essentials” course as I continue to dive deeper into AWS.

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## Introduction to Amazon Web Services

Wait… AWS has per-minute satellite rental?!?

## Compute in the Cloud

Instance types:

* General Pupose
* Compute Optimized
* Memory Optimized
* Accelerated Computing
* Storage Optimized

“Accelerated computing” here means “*hardware* accelerated computing”. So, high-end GPUs, cryptographic accelerators, custom AI/ML chips, etc.

”Storage optimized” instances aren’t necessarily designed to support a lot of local storage (though the can, and often do, this), but are rather designed to support for high data throughput for that local storage.

### Pricing Options

* On-Demand (the default model)
* Savings Plan (commit to a certain numbers of *hours* of compute time; can include services like Lambda, and usage above the agreed-upon amount is charged at the regular rate)
* Reserved Instances (commit to a certain number of *instances*)
* Spot Instances (additional capacity purchased on the spot market; can be reclaimed by AWS with a 2 minute warning)
* Dedicate Hosts (single-account hosts, mostly for high security/compliance workloads)

Both the “savings plan” and “reserved instances” offer similar savings, but over different metrics.

### Elastic Load Balancers

Elastic Load Balancing (ELB) handles both load balancing *between* regions (based on regional capacity and the proximity of a request to a particular region) and *within* regions (by distributing load uniformly between all instances in a region).

ELB doesn’t just have to be client facing, however — it can also be used between the front-end and back-end systems in an architecture.

### Messaging and Queueing

* Simple Queue Service (SQS) — Queue/Buffer messages from one service to another *within* AWS
* Simple Notification Service (SNS) — Queue/Buffer messages from a service in AWS to another service that may be *inside of or outside of* AWS (and could be directly user-facing, like SMS or push notifications)

SQS is a pure machine-to-machine buffer, while SNS is based around a one-to-many pub/sub model.

### Additional Compute Services

Amazon’s two container *management* services are ECS (Elastic Container Service) for Docker and EKS (Elastic Kubernetes Service) for Kubernetes. These must be paired with an underlying platform where the containers will actually run — either EC2 (for traditional containerization) or “Fargate” (which functions in a “serverless” fashion like Lambda).

<!--

## Global Infrastructure and Reliability

## Networking

## Storage and Databases

## Security

## Monitoring and Analytics

## Pricing and Support

## Migration and Innovation

## The Cloud Journey

## AWS Certified Cloud Practitioner Basics

## Course Final Assessment

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

<!-- Finish up the TryHackMe: Jr. Penetration Tester “Supplements” -->

<!-- Resume my normally planned learning path. -->
