# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-25

# A Serverless Journey: AWS Lambda Under the Hood

Lambda is a containerized service on the backend - function code is run by workers, each of which manages multiple "sandboxes". Workers are managed by a "worker manager", and are recycled every 8 - 10 hours. Sandboxes are destroyed if they become idle for some period of time in order to free up resources.

A worker is an entire physical server.

In the original Lambda model, each worker ran multiple VMs, each of which contained multiple sandboxes.

New Lambda systems use "bare metal" EC2 virtualization, and spin up many more, smaller, VMs each of which contain a *single* sandbox (this newer architecture is reminiscent of how the Linux environment is implemented on Chromebooks).

Every sandbox runs only a single function over its lifetime, though multiple calls to that function may happen consecutively. On both old and new Lambda systems, VMs correspond to individual customers.

Control groups (cgroups) are used to enforce function memory and CPU limits (presumably some level of enforcement also happens at the VM level for newer "bare metal" Lambda systems).

VM devices in the newer "bare metal" VMs are all virtio based. The host-side device emulation models are themselves sandboxed, and the code itself is written in Rust.

Lambda concentrates load on the smallest possible number of sandboxes, rather than trying to distribute the load over many sandboxes. This makes scaling easier, and hence faster.

One the other hand, load (for a given type of function call) is distributed *evenly* amongst workers to prevent correlated load spikes. This is *not* to say that workers are run with partial load - rather, they have a variety of *kinds* of lambda functions (both in terms of language, complexity, and origin account) sandboxed on them. (In fact, Amazon applies some additional statistical tracking of Lambda function performance and tries to pack together functions that are *anti-correlated*.)

All Lambda functions exist within the current VPC. The associated network cards are actually provisioned *separately* from the Lambda functions, however, with multiple sandboxes attached to a single card using secure tunnels. This somewhat unusual setup is done to reduce startup latency, as it turns out that provisioning a new network card within a VPC is relatively expensive.

The AWS API gateway can call into Lambda functions for actual execution.

In order to optimize Lambda worker placement, one subnet should be dedicated to Lambda *per availability zone*.

* [AWS re:Invent 2018: A Serverless Journey - AWS Lambda Under the Hood (YouTube)](https://youtu.be/3qln2u1Vr2E)

# Introduction to the AWS CLI

Order of preference for account configuration in the AWS CLI: Command line options > Environment variables > `~/.aws/credentials` and `~/.aws/config` files > AWS container-level credentials > AWS EC2-level credentials.

For the `~/.aws/*` files, the `default` profile will be run if no explicit profile is specified.

The `--endpoint-url` is used with Snowball hardware.

There's an AWS "shell" available that wraps the CLI and provides tab-completion and live menus for EC2 instances, etc. Pretty cool.

The AWS CLI supports asking for MFA codes, and will cache the resulting authentication for the appropriate timespan. If MFA presence is required to assume a role, then the CLI will automatically prompt on `AssumeRole`.

The AWS CLI `--filter` option is server-side but only supported for a few commands, while the `--query` option is client-side but is supported for all commands. Both commands define searches using JMESPath.

* [AWS re:Invent 2017: Introduction to the AWS CLI (YouTube)](https://youtu.be/QdzV04T_kec)
* [awslabs / aws-shell](https://github.com/awslabs/aws-shell)
* [JMESPath](https://jmespath.org/)

<!--

# HTTP Desync Attacks

xxx

* [HTTP Desync Attacks: Smashing into the Cell Next Door (DEF CON 27)](https://www.youtube.com/watch?v=w-eJM2Pc0KI)

# AWS IAM Policies in a Nutshell

xxx

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)

# AWS IAM Privilege Escalation: Methods and Mitigation

xxx

* [AWS IAM Privilege Escalation - Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

# Amazon API Gateway

xxx

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

# AWS KMS Cryptographic Details

xxx

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

# AWS Well-Architected Framework

xxx

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

# Signature Version 4 Signing Process

xxx

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

# AWS Networking Example

xxx

* [AWS - Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

# AWS Developer Tools

xxx

* [AWS - Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

# AWS Compute Services

xxx

* [AWS - Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

# AWS Container Services

xxx

* [AWS - Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

# AWS Storage Services

xxx

* [AWS - Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

# AWS Database Services

xxx

* [AWS - Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

# AWS Migration Services

xxx

* [AWS - Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

# AWS Networking Services

xxx

* [AWS - Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

# AWS Security, Identity, and Compliance

xxx

* [AWS - Security, Identity, and Compliance](https://ardsec.blogspot.com/2019/06/aws-security-identity-and-compliance.html)

-->

<!-- (Walk through Learning Path 2 on the internal wiki.) -->

<!-- Finish up the TryHackMe: Jr. Penetration Tester "Supplements" -->

<!--

# PortSwigger Web Security Academy

(There are 210 total labs. I should try to do them all.)

(Maybe I should just get the Burp Suite Certified Practitioner at this point? See: <https://portswigger.net/web-security/certification>.)

* [PortSwigger: Web Security Academy](https://portswigger.net/web-security/learning-path)

## SQL Injection

## Authentication

## Directory Traversal

## Command Injection

## Business Logic Vulnerabilities

## Information Disclosure

## Access Control

## File Upload Vulnerabilities

## Server-Side Request Forgery (SSRF)

## XXE Injection

## Cross-Site Scripting (XSS)

## Cross-Site Request Forgery (CSRF)

## Cross-Origin Resource Sharing (CORS)

## Clickjacking

## DOM-Based Vulnerabilites

## WebSockets

## Insecure Deserialization

## Server-Side Template Injection

## Web Cache Poisoning

## HTTP Host Header Attacks

## HTTP Request Smuggling

## OAuth Authentication

-->

<!-- Resume my normally planned learning path. -->
