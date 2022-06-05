# AWS Deep Dive #Draft

It’s been a while, hasn’t it?

I’d originally intended to spend May wrapping up “supplemental” TryHackMe room’s I’d been making note of while studying for the Security+ exam. But then I started a new job and wound up spending much of the time I had been using for my studies bringing myself up to speed instead.

The new job aligns much better with the direction I’ve been hoping to take my career, which is great. But it’s also highlighting some real deficiencies in my knowledge of AWS. It’s also really driven home that the exposure I’ve had to Burp Suite so far is not really adequate for real-world use cases.

So I’m going to put TryHackMe on (temporary!) hold, and spend some time beefing up on AWS and Burp Suite instead.

Fortunately, the new job has a great list of AWS-related videos, readings, course work, and hands-on “labs”. Much (though not *all*) of this is public, which means that I can continue to use this space as my notebook most of the time. I’m still going to take *private* notes for non-public materials, but I’m afraid I can’t share those in good conscience. This means that there are going to be more pauses than in previous sequences I hit non-public parts of my learning path.

Once I’m finished working through the AWS-related materials, I’m going to turn my attention to Burp Suite. There I’ll be working my way through PortSwigger’s Web Security Academy.

Once I’m done with both of these I’ll turn back to the remaining TryHackMe “supplements”, move on to a few odds-and-ends rooms focusing more on *defensive* security (it feels like I should have at least a passing knowledge of some of that), and then begin the process of working towards my Pentest+ certification!

* [2022-05-10 TryHackMe: Jr. Penetration Tester (Supplements)](2022-05-10-tryhackme-jr-penetration-tester-supplements.md)
* [CompTIA Security+ ce Certification for Nathan Acks](https://www.credly.com/badges/0d86c824-a853-4d77-9c5a-7f510f63fe78/)
* [2021-09-11 Context Setting](2021-09-11-context-setting.md)
* [Amazon Web Services](https://aws.amazon.com/)
* [PortSwigger: Burp Suite](https://portswigger.net/burp)
* [PortSwigger: Web Security Academy](https://portswigger.net/web-security/learning-path)

<!--

## AWS Essentials

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

### Project Omega!

* [AWS Essentials: Project Omega! (YouTube)](//youtu.be/CGFrYNDpzUM)

### How to Use the Interactive Guide

* [AWS Essentials: How to Use the Interactive Guide (YouTube)](//youtu.be/eiTYqcsU6VI)

### AWS Free Tier

* [AWS Essentials: AWS Free Tier (YouTube)](//youtu.be/8p1bTTV6ATE)

### Create an AWS Account

* [AWS Essentials: Create an AWS Account (YouTube)](//youtu.be/_siSwgpVQNc)

### How to Navigate the AWS Console

* [AWS Essentials: How to Navigate the AWS Console (YouTube)](//youtu.be/A43m4TDFCUM)

### AWS Documentation

* [AWS Essentials: AWS Documentation (YouTube)](//youtu.be/jV0FqG9DCog)

### What is IAM?

* [AWS Essentials: What is IAM? (YouTube)](//youtu.be/4ngYrnJb7F8)

### IAM Initial Setup and Configuration

* [AWS Essentials: IAM Initial Setup and Configuration (YouTube)](//youtu.be/W_eu0rJN0yU)

### IAM Users and Policies

* [AWS Essentials: IAM Users and Policies (YouTube)](//youtu.be/jP-1qPe6P4s)

### IAM Groups and Policies

* [AWS Essentials: IAM Groups and Policies (YouTube)](//youtu.be/R5RCCrS3pcI)

### IAM Roles

* [AWS Essentials: IAM Roles (YouTube)](//youtu.be/7sYE6J1_CsQ)

### AWS Global Infrastructure

* [AWS Essentials: AWS Global Infrastructure (YouTube)](//youtu.be/J_Kh1gZaMd4)

### What is a VPC?

* [AWS Essentials: What is a VPC? (YouTube)](//youtu.be/7XnpdZF_COA)

### Internet Gateways (IGWs)

* [AWS Essentials: Internet Gateways (IGWs) (YouTube)](//youtu.be/pAOrBxZ7584)

### Route Tables (RTs)

* [AWS Essentials: Route Tables (RTs) (YouTube)](//youtu.be/GrfOsWUVCfg)

### Network Access Control Lists (NACLs)

* [AWS Essentials: Network Access Control Lists (NACLs) (YouTube)](//youtu.be/vJzHn24TNQE)

### Subnets

* [AWS Essentials: Subnets (YouTube)](//youtu.be/KNT463WSjjY)

### Availability Zones (VPC Specific)

* [AWS Essentials: Availability Zones (VPC Specific) (YouTube)](//youtu.be/ET_CSqdGsYg)

### S3 Basics

* [AWS Essentials: S3 Basics (YouTube)](//youtu.be/f9hXcxHnQuE)

### Buckets & Objects

* [AWS Essentials: Buckets & Objects (YouTube)](//youtu.be/skJosIhDNF0)

### Storage Classes

* [AWS Essentials: Storage Classes (YouTube)](//youtu.be/DFfgYapmu9s)

### Object Lifecycles

* [AWS Essentials: Object Lifecycles (YouTube)](//youtu.be/B-z9hNj3Fw4)

### Permissions

* [AWS Essentials: Permissions (YouTube)](//youtu.be/X7vfDa1ygeo)

### Object Versioning

* [AWS Essentials: Object Versioning (YouTube)](//youtu.be/I-OW9Kr2NGs)

### EC2 Basics

* [AWS Essentials: EC2 Basics (YouTube)](//youtu.be/dO1X7QG_4xw)

### Amazon Machine Images (AMIs)

* [AWS Essentials: Amazon Machine Images (AMIs) (YouTube)](//youtu.be/B7M31vywgs4)

### Instance Types

* [AWS Essentials: Instance Types (YouTube)](//youtu.be/noOAJRBa9yw)

### Elastic Block Store (EBS)

* [AWS Essentials: Elastic Block Store (EBS) (YouTube)](//youtu.be/S0gzrxsVQHo)

### Security Groups

* [AWS Essentials: Security Groups (YouTube)](//youtu.be/-9j7BvAyb2w)

### IP Addressing

* [AWS Essentials: IP Addressing (YouTube)](//youtu.be/U32bPhQyQ6I)

### Launching and Using an EC2 Instance

* [AWS Essentials: Launching and Using an EC2 Instance (YouTube)](//youtu.be/BCM9aaaWvR0)

### RDS and DynamoDB Basics

* [AWS Essentials: RDS and DynamoDB Basics (YouTube)](//youtu.be/KcJ8-I7kD_w)

### Provisioning and RDS MySQL Database

* [AWS Essentials: Provisioning and RDS MySQL Database (YouTube)](//youtu.be/OE25Sni15vo)

### SNS Basics

* [AWS Essentials: SNS Basics (YouTube)](//youtu.be/M4gQ8MLlgiY)

### Using SNS

* [AWS Essentials: Using SNS (YouTube)](//youtu.be/LeYUnkPOQOc)

## Deep Dive on Amazon S3 Security and Management

* [AWS re:Invent 2018: Deep Dive on Amazon S3 Security and Management (YouTube)](https://youtu.be/x25FSsXrBqU)

## Become an IAM Policy Master in 60 Minutes or Less

* [AWS re:Invent 2018: Become an IAM Policy Master in 60 Minutes or Less (YouTube)](https://youtu.be/YQsK4MtsELU)

## Enumerating AWS Roles through “AssumeRole“

* [Assume the Worst: Enumerating AWS Roles through “AssumeRole“](https://rhinosecuritylabs.com/aws/assume-worst-aws-assume-role-enumeration/)

## Amazon S3: Bucket Policies and User Policies

(Step through this as an exercise.)

* [Amazon Simple Storage Service (S3) — Bucket policies and user policies: Bucket owner granting cross-account bucket permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html)

## AWS IAM: Granting a User Permissions to Switch Roles

* [AWS Identity and Access Management — User Guide: Granting a user permissions to switch roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html)

## AWS CloudFormation Tutorial

(Watch + set up a stack.)

* [AWS CloudFormation Tutorial (YouTube)](https://youtu.be/LDSMIvUuFOE)

## Amazon EC2: Auto Scaling

* [Amazon EC2: Auto Scaling](https://medium.com/tensult/amazon-ec2-auto-scaling-884ea50d2d)

## Capacity Management Made Easy with Amazon EC2 Auto Scaling

* [AWS re:Invent 2018: Capacity Management Made Easy with Amazon EC2 Auto Scaling (YouTube)](https://youtu.be/PideBMIcwBQ)

## AWS Cloud Practitioner Essentials

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

* [AWS re:Invent 2018: Amazon VPC — Security at the Speed of Light (YouTube)](https://youtu.be/uhXalpNzPU4)

## Amazon API Gateway

* [Amazon API Gateway: Developer Guide](https://aws.amazon.com/api-gateway/getting-started/)

## AWS IAM Policies in a Nutshell

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)

## DNS Demystified: Amazon Route 53

* [AWS re:Invent 2016: DNS Demystified — Amazon Route 53 (YouTube)](https://youtu.be/UP7wDBjZ37o)

## Deep Dive on New Amazon EC2 Instances and Virtualization Technologies

* [Deep Dive on New Amazon EC2 Instances and Virtualization Technologies (YouTube)](https://youtu.be/AAq-DDbFiIE)

## Another Day, Another Billion Packets

* [AWS re:Invent 2015: Another Day, Another Billion Packets (YouTube)](https://youtu.be/R-n4dDGfQd4)

## A Serverless Journey: AWS Lambda Under the Hood

* [AWS re:Invent 2018: A Serverless Journey — AWS Lambda Under the Hood (YouTube)](https://youtu.be/3qln2u1Vr2E)

## AWS IAM Privilege Escalation: Methods and Mitigation

* [AWS IAM Privilege Escalation — Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

## AWS KMS Cryptographic Details

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Well-Architected Framework

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## AWS Networking Example

* [AWS — Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

## AWS Developer Tools

* [AWS — Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

## Signature Version 4 Signing Process

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## Introduction to the AWS CLI

* [AWS re:Invent 2017: Introduction to the AWS CLI (YouTube)](https://youtu.be/QdzV04T_kec)

-->

<!-- (Walk through Learning Path 2 on the internal wiki.) -->

<!--

## AWS Compute Services

* [AWS — Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

## AWS Container Services

* [AWS — Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

## AWS Storage Services

* [AWS — Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

## AWS Database Services

* [AWS — Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

## AWS Migration Services

* [AWS — Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

## AWS Networking Services

* [AWS — Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

## AWS Security, Identity, and Compliance

* [AWS — Security, Identity, and Compliance](https://ardsec.blogspot.com/2019/06/aws-security-identity-and-compliance.html)

## PortSwigger Web Security Academy

(There are 210 total labs. I should try to do them all.)

(Maybe I should just get the Burp Suite Certified Practitioner at this point? See: <https://portswigger.net/web-security/certification>.)

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
<span aria-hidden="true">📅</span> June 5, 2022
