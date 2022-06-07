# AWS Deep Dive

## AWS Essentials

More notes today from Linux Academy’s “AWS Essentials” YouTube playlist.

REFERENCES:

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

### Object Lifecycles

An “object lifecycle” is a set of rules in S3 that migrate objects between storage classes (or even delete them!) based on the age of an object.

REFERENCES:

* [AWS Essentials: Object Lifecycles (YouTube)](//youtu.be/B-z9hNj3Fw4)

### Permissions

Permissions granted to (non-admin) users (at the individual/group level) or resources (at the individual/role level) only apply to *using* a service in AWS. Permissioning for object create in a given service is still handled at the object level.

For example, giving a group full access to S3 *doesn’t* give the members of that group access to any of the buckets created in S3 by other users in the account — *that* access must be applied at the bucket level.

Note that making a bucket public is *not* enough to make its contents viewable outside of the AWS account — there still needs to be a permission grant to “everyone” that makes the object/folder/etc. downloadable. (My take-away from this is that making an S3 bucket public is essentially changing the definition of “everyone” from “everyone in the current AWS account” to “*everyone* everyone”.)

REFERENCES:

* [AWS Essentials: Permissions (YouTube)](//youtu.be/X7vfDa1ygeo)

### Object Versioning

Note that suspending versioning *doesn’t* delete old versions — it simply stops the creation of new object versions in that bucket. (And yes — once you’ve *enabled* versioning for a bucket, you cannot disable it. Versioning can only be ”suspended”.)

Be aware that new object versions do *not* inherit the original version’s storage class — that’s set per object (even per versioned object).

REFERENCES:

* [AWS Essentials: Object Versioning (YouTube)](//youtu.be/I-OW9Kr2NGs)

### EC2 Basics

EC2 = Elastic Compute Cloud

In addition to “on-demand” and ”reserved” instances, Amazon also has “spot” instances that are sold using an auction-like mechanism. The “spot” price fluctuates based on how much capacity is currently unused in EC2. When the spot price is at or below your “bid”, you *automatically* get a spot instance configured and provisioned (at the cost is your bid). When the spot price *exceeds* your bid, your instance is *automatically* terminated and re-allocated to users with a higher bid. So spot instances *can* be cheap, but access is unreliable (and becomes more so during peak usage periods).

REFERENCES:

* [AWS Essentials: EC2 Basics (YouTube)](//youtu.be/dO1X7QG_4xw)

### Amazon Machine Images (AMIs)

An AMI is basically just a templated VM with some configuration knobs. (Mostly these knobs are about ”pre-installing” applications and setting up desired configurations. In practice, this translates to kicking off scripts during the AMI’s first run that *actually* install and configure things for you.)

REFERENCES:

* [AWS Essentials: Amazon Machine Images (AMIs) (YouTube)](//youtu.be/B7M31vywgs4)

<!--

## AWS Essentials

Today I’ll be finishing up the “AWS Essentials” YouTube playlist put together by the Linux Academy.

REFERENCES:

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

### Elastic Block Store (EBS)

REFERENCES:

* [AWS Essentials: Elastic Block Store (EBS) (YouTube)](//youtu.be/S0gzrxsVQHo)

### Security Groups

REFERENCES:

* [AWS Essentials: Security Groups (YouTube)](//youtu.be/-9j7BvAyb2w)

### IP Addressing

REFERENCES:

* [AWS Essentials: IP Addressing (YouTube)](//youtu.be/U32bPhQyQ6I)

### Launching and Using an EC2 Instance

REFERENCES:

* [AWS Essentials: Launching and Using an EC2 Instance (YouTube)](//youtu.be/BCM9aaaWvR0)

### RDS and DynamoDB Basics

REFERENCES:

* [AWS Essentials: RDS and DynamoDB Basics (YouTube)](//youtu.be/KcJ8-I7kD_w)

### Provisioning and RDS MySQL Database

REFERENCES:

* [AWS Essentials: Provisioning and RDS MySQL Database (YouTube)](//youtu.be/OE25Sni15vo)

### SNS Basics

REFERENCES:

* [AWS Essentials: SNS Basics (YouTube)](//youtu.be/M4gQ8MLlgiY)

### Using SNS

REFERENCES:

* [AWS Essentials: Using SNS (YouTube)](//youtu.be/LeYUnkPOQOc)

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
<span aria-hidden="true">📅</span> June 6, 2022
