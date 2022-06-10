# AWS Deep Dive

## AWS Essentials

Today I’ll be finishing up the “AWS Essentials” YouTube playlist put together by the Linux Academy.

REFERENCES:

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

### Elastic Block Store (EBS)

IOPS is basically a measure of reads/writes (i.e., I/O) per unit time.

EBS volumes *can* be used as the root volume of EC2 images, but other options are available.

By default, root EBS volumes are set to be deleted on EC2 instance termination. However, other options are available, which can be useful in a variety of ways.

EC2 instances can’t be booted from EBS snapshots directly. However, a snapshot can be used to populate the contents of a *new* EBS volume, which can then be used as the root drive of an EC2 instance, so this isn’t really a limitation in practice.

Data stored as a snapshot is *a lot* less expensive than the same data stored on an EBS volume.

REFERENCES:

* [AWS Essentials: Elastic Block Store (EBS) (YouTube)](//youtu.be/S0gzrxsVQHo)

### Security Groups

Security Groups are instance-level firewalls. In some ways they’re similar to NACLs, but allow/deny rules work a little differently: whereas traffic is processed by the first matching rule in a NACL (just as in a traditional stateless firewall), *all* rules in a Security Group are considered when evaluating traffic.

By default, all inbound traffic is denied and all outbound traffic is allowed in new Security Groups. Somewhat confusingly, AWS also creates a “default” Security Group” for you as part of the provisioning process that allows *all* traffic, both inbound and outbound.

There are no DENY rules for security groups, only ALLOW rules. Any traffic not matched by a rule will be dropped.

REFERENCES:

* [AWS Essentials: Security Groups (YouTube)](//youtu.be/-9j7BvAyb2w)

### IP Addressing

EC2 instances can be launched with public IP addresses so long as the subnet its own is attached to a route that has an associated Internet Gateway.

EC2 instances in the default VPC will launch with public IP addresses out-of-the-box.

REFERENCES:

* [AWS Essentials: IP Addressing (YouTube)](//youtu.be/U32bPhQyQ6I)

### Launching and Using an EC2 Instance

When setting up an EC2 instance, you have the ability to specify a script that will be run on first boot. This is generally used to install and configure software.

REFERENCES:

* [AWS Essentials: Launching and Using an EC2 Instance (YouTube)](//youtu.be/BCM9aaaWvR0)

### RDS and DynamoDB Basics

RDS provides relational database services and supports a variety of database engines under the hood: MySQL/MariaDB, PostgreSQL, Oracle, SQL Server, and Amazon’s own fork of MySQL, Aurora. Note that Aurora is *not* available in the AWS free tier.

DynamoDB is Amazon’s NoSQL option; there’s no choice of backends here, though DynamoDB itself is similar to MongoDB.

Pricing for RDS parallels that for EC2 (which makes sense), while DynamoDB pricing is looks more like S3 (if you squint).

REFERENCES:

* [AWS Essentials: RDS and DynamoDB Basics (YouTube)](//youtu.be/KcJ8-I7kD_w)

### Provisioning and RDS MySQL Database

Not only can’t RDS use Aurora on the free tier, but it’s limited to running MySQL in “developer” mode (though it’s unclear what that means).

RDS instances aren’t provisioned directly into subnets like EC2 instances. Instead, you define a “subnet group” (which might contain only a single subnet). This determines which EC2 instances the RDS instance can communicate with. Note that the RDS instance will be automatically deployed to an availability zone matching one of the subnets in its subnet group, though you can override this (though you are similarly restricted) if you wish.

REFERENCES:

* [AWS Essentials: Provisioning and RDS MySQL Database (YouTube)](//youtu.be/OE25Sni15vo)

### SNS Basics

SNS = Simple Notification Service

SNS allows notifications from AWS to be pushed out to “subscribed” clients. These can be internal to AWS (SQS, Lambda) or external (HTTP push, SMS, email). Queues in SNS are called “topics”; sending a message to a topic will cause it to be pushed out to any “subscribed” endpoints (what this means in practice will vary depending on *how* the endpoints are subscribed).

SNS and CloudWatch are often used together as a server event/alarm notification system.

REFERENCES:

* [AWS Essentials: SNS Basics (YouTube)](//youtu.be/M4gQ8MLlgiY)

<!--

## Deep Dive on Amazon S3 Security and Management

REFERENCES:

* [AWS re:Invent 2018: Deep Dive on Amazon S3 Security and Management (YouTube)](https://youtu.be/x25FSsXrBqU)

## Become an IAM Policy Master in 60 Minutes or Less

REFERENCES:

* [AWS re:Invent 2018: Become an IAM Policy Master in 60 Minutes or Less (YouTube)](https://youtu.be/YQsK4MtsELU)

## Enumerating AWS Roles through “AssumeRole“

REFERENCES:

* [Assume the Worst: Enumerating AWS Roles through “AssumeRole“](https://rhinosecuritylabs.com/aws/assume-worst-aws-assume-role-enumeration/)

## Amazon S3: Bucket Policies and User Policies

(Step through this as an exercise.)

REFERENCES:

* [Amazon Simple Storage Service (S3) — Bucket policies and user policies: Bucket owner granting cross-account bucket permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html)

## AWS IAM: Granting a User Permissions to Switch Roles

REFERENCES:

* [AWS Identity and Access Management — User Guide: Granting a user permissions to switch roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html)

## AWS CloudFormation Tutorial

(Watch + set up a stack.)

REFERENCES:

* [AWS CloudFormation Tutorial (YouTube)](https://youtu.be/LDSMIvUuFOE)

## Amazon EC2: Auto Scaling

REFERENCES:

* [Amazon EC2: Auto Scaling](https://medium.com/tensult/amazon-ec2-auto-scaling-884ea50d2d)

## Capacity Management Made Easy with Amazon EC2 Auto Scaling

REFERENCES:

* [AWS re:Invent 2018: Capacity Management Made Easy with Amazon EC2 Auto Scaling (YouTube)](https://youtu.be/PideBMIcwBQ)

## AWS Cloud Practitioner Essentials

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

### Introduction to Amazon Web Services

### Compute in the Cloud

### Global Infrastructure and Reliability

### Networking

### Storage and Databases

### Security

### Monitoring and Analytics

### Pricing and Support

### Migration and Innovation

### The Cloud Journey

### AWS Certified Cloud Practitioner Basics

### Course Final Assessment

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

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> June 9, 2022
