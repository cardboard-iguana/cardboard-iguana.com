# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-01

Finally getting back to the “AWS Cloud Practitioner Essentials” course! Today I’ll be covering the “Storage and Databases” module.

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## EBS

* Instance Store Volumes — storage attached to the “physical” EC2 hardware. This storage is as ephemeral as an EC2 instance, as when an EC2 instance is restarted it may be spun up on a different VM.
* Elastic Block Store — EC2-independent block storage. Think of it like an external hard drive.

EBS volumes support snapshotting. Snapshots are *incremental* backups.

EBS volumes can be up to 16 TB in size, and come in SSD and HDD flavors. They are limited to a single availability zone (data center).

## S3

The maximum S3 object size is 5 TB. There are *no* limits to total bucket size.

Notable S3 tiers:

* Standard Tier — 99.999999999% availability; all data is stored within *at least* three availability zones. Can be used to host static websites.
* Infrequent Access (IA) — data that is infrequently accessed but cannot experience delays *when* accessed (think backups). It has a lower storage price and higher retrieval price than the standard tier (but the same availability).
* One Zone Infrequent Access — Like the IA tier, but only stores data in a single availability zones. This makes it cheaper but less durable.
* Intelligent Tiering — Uses analytics to dynamically move objects between the standard and IA tiers.
* Glacier — data that is infrequently accessed and *doesn’t* require quick access. Can be set up as a WORM drive, or have specific retention periods applied. (Note that these policies *cannot* be changed once applied.)
* Glacier Deep Archive — Cheaper than Glacier, but data can take up to 12 hours to become available.

Data can either be uploaded directly to Glacier, or moved automatically using lifecycle policies.

Objects in S3 have three components: data, metadata, and key (name). Just like a normal filesystem. Unlike normal filesystems, however, all S3 objects are resolvable to normal (public, if desired) URLs.

S3 works best for write-once, read-many applications.

## EFS

Elastic Filesystem is a “managed” filesystem — think something like NFS, or a SAN.

Like most Amazon services, EFS can autoscale with load and has a variety of automation options (automatic snapshots, etc.).

EFS mounts as a normal Linux filesystem, and is a region-level resource (so, it works across data centers, but you can’t have a global EFS).

Files stored in EFS can be written to at the block level, just like files in local storage.

Like S3, data stored in EFS is replicated across multiple availability zones.

The AWS Direct Connect client allows for EFS deployments to be accessed by on-prem systems.

## RDS

Amazon’s “Relational Database Service” supports most common DBs:

* MySQL/MariaDB
* PostgrSQL
* MS SQL Server
* Oracle SQL

RDS abstracts the underlying database *server*, so it’s a bit like Google App Engine, but for DBs. Patching, backups, redundancy, etc. can all be configured in RDS without having to deal with the low-level differences in these operations between different DB flavors.

Amazon also provides a “lift and shift” service to aid migration from on-prem DBs to EC2-backed “RDMS” (”Relational Database Management Service”) systems. These support the same databases as RDS, but function in a more traditional, server-centric fashion.

Aurora is an in-house database developed by Amazon for high availability scenarios. It supports up to 15 replicase across up to 3 availability zones, and can be configured in MySQL or PostgreSQL compatibility mode. Aurora is only available on RDS (it *cannot* be deployed on a managed server).

## DynamoDB

DynamoDB is a serverless NoSQL database. Scaling and redundancy is handled automatically.

NoSQL systems work best when searching through a large number of objects in a single data store, while relational databases are better at, well, relating (simpler) objects *across* data stores.

Basically, NoSQL systems work best when dealing with data structured as a lookup table, without much/any relationship between the objects in the table (or between tables).

## Redshift

Redshift is Amazon’s solution for data lakes/warehouses. It’s optimized for dealing with large quantities of *static* data. Structured (pentabytes) and unstructured (exabytes) data is supported.

## Database Migration Service

Amazon DMS is designed to handle realtime migration from on-prem databases to EC2, RDS, or DynamoDB. It supports both homogenous (between databases of the same type) and heterogenous (between databases of different types) migrations. DMS is designed to migrate data without requiring downtime in either the source or destination DBs.

DMS also supports migration *between* EC2 and RDS accounts.

DMS can also be used for replication, DB consolidation, and the creation of development/testing data sets from production data.

## Other AWS Database Services

Additional, more specialized, DB options:

* DocumentDB — NoSQL system optimized for content management systems, based on MongoDB.
* Neptune — a graph database (social networks, recommendation engines, fraud detection, etc.).
* Managed Blockchain
* Quantum Ledger Database — basically a WORM database for highly regulated institutions.

DB extensions:

* ElastiCache — memcached and Redis.
* DAX — cacheing for DynamoDB.

<!--

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
