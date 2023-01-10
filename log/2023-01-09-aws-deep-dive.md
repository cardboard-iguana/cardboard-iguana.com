# AWS Deep Dive

**author**:: Nathan Acks  
**date**:: 2023-01-09

## AWS Well-Architected Framework

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Security](https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html)

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-bp.html)

###### [Security](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-security.html)

**Key question:** How do you securely operate your workload?

(Recall here that the Well-Architected Framework uses “workload” to mean “the collection of resources and processes that provides an atomic business function”.)

This section ends with the recommendation that each *workload* have a dedicated AWS account, which makes sense conceptually and is the first guidance I’ve seen regarding the recommended way to determine account boundaries.

###### [Identity and Access Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-iam.html)

Finally, a definition of “principal”!

**Principal:** Something that performs an *action* within an AWS account (e.g., accounts themselves, users, roles, and — in some cases — services).

**Key questions:**

* How do you manage identities for people and machines?
* How do you manage permissions for people and machines?

Identities are managed by things like logins, AWS access keys, IdPs, etc. Permissions are managed using roles and IAM policies (which might be attached to roles, or directly to users/machines).

###### [Detection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-detection.html)

**Key question:** How do you detect and investigate security events?

###### [Infrastructure Protection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-infrastructure.html)

**Key questions:**

* How do you protect your network resources?
* How do you protect your compute resources?

I knew that AMIs were used as images for EC2 instances, but apparently they’re also used in the Amazon Elastic Container Service and AWS Elastic Beanstalk.

###### [Data Protection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-dataprot.html)

**Key questions:**

* How do you classify your data?
* How do you protect your data at rest?
* How do you protect your data in transit?

###### [Incident Response](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-incresp.html)

Interesting idea: Using CloudFormation to spin up known-clean, isolated forensics environments. (That said, given that almost everything you deal with as an admin in AWS is virtualized and never accessed directly, there are real limits on how much you can do here. Still, this is useful, especially if/when the forensics investigation becomes a *legal* investigation…)

**Key question:** How do you anticipate, respond to, and recover from incidents?

I wonder if there’s a way to take memory snapshots of EC2 instances…?

#### [Reliability](https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html)

> The Reliability pillar encompasses the ability of a workload to perform its intended function correctly and consistently when it’s expected to. This includes the ability to operate and test the workload through its total lifecycle.

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html)

Amazon suggests monitoring KPIs that measure some aspect of *business value provided* by a service, rather than purely technical operational performance. Not 100% sure what I think of this — some aspects of technical performance are going to be important for providing business value, but are also not going to translate to that value in a straight-forward way.

There’s also an emphasis on *simulating workload failures* in this section. This is obviously a lot easier to do with turnkey infrastructure.

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-bp.html)

###### [Foundations](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-found.html)

**Key questions:**

* How do you manage service quotas and constraints?
* How do you plan your network topology?

These questions are of a set with the “Infrastructure Protection” questions above. However, rather than focusing on the security parameters of the architecture, these questions are about *capacity* and *structure*.

###### [Workload Architecture](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-workload-arch.html)

**Key questions:**

* How do you design your workload service architecture?
* How do you design interactions in a distributed system to prevent failures?
* How do you design interactions in a distributed system to mitigate or withstand failures?

These are all actually *hard* questions! Lots of trade-offs here, especially w.r.t. performance.

###### [Change management](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-chg-mgmt.html)

**Key questions:**

* How do you monitor workload resources?
* How do you design your workload to adapt to changes in demand?
* How do you implement change?

###### [Failure Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-failmgmt.html)

**Key questions:**

* How do you back up data?
* How do you use fault isolation to protect your workload?
* How do you design your workload to withstand component failures?
* How do you test reliability?
* How do you plan for disaster recovery?

I’d be curious what the best practices for implementing fault isolation are. I assume the key is a redundant, modular design *within* workloads, and the prevention of cross-module dependencies.

<!--

# AWS Deep Dive

**author**:: Nathan Acks  
**date**:: 2023-01-10

## AWS Well-Architected Framework

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html)

==xxx==

##### Design Principles

##### Definition

##### Best Practices

###### Compute

###### Storage

###### Database

###### Network

##### Resources

#### [Cost Optimization](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html)

==xxx==

##### Design Principles

##### Definition

##### Best Practices

###### Practice Cloud Financial Management

###### Expenditure and Usage Awareness

###### Cost-Effective Resources

###### Manage Demand and Supply Resources

###### Optimize Over Time

##### Resources

#### [Sustainability](https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html)

==xxx==

##### Design Principles

##### Definition

##### Best Practices

###### Region Selection

###### User Behavior Patterns

###### Software and Architecture Patterns

###### Data Patterns

###### Hardware Patterns

###### Development and Deployment Patterns

###### Resources

### [The Review Process](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-review-process.html)

==xxx==

### [Conclusion](https://docs.aws.amazon.com/wellarchitected/latest/framework/conclusion.html)

==xxx==

### [Contributors](https://docs.aws.amazon.com/wellarchitected/latest/framework/contributors.html)

==xxx==

### [Further Reading](https://docs.aws.amazon.com/wellarchitected/latest/framework/further-reading.html)

==xxx==

### [Document Revisions](https://docs.aws.amazon.com/wellarchitected/latest/framework/document-revisions.html)

==xxx==

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

==xxx==

### [Notices](https://docs.aws.amazon.com/wellarchitected/latest/framework/notices.html)

==xxx==

## Signature Version 4 Signing Process

==xxx==

* [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

### Changes in Signature Version 4

==xxx==

* [Changes in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_changes.html)

### Signature Version 4 Request Elements

==xxx==

* [Elements of an AWS Signature Version 4 Request](https://docs.aws.amazon.com/general/latest/gr/sigv4_elements.html)

### Signing AWS Requests

==xxx==

* [Signing AWS Requests with Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html)

### Handling Dates

==xxx==

* [Handling Dates in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-date-handling.html)

### How to Derive a Signing Key

==xxx==

* [Examples of How to Derive a Signing Key for Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html)

### Signing Examples

==xxx==

* [Examples of the Complete Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

### Troubleshooting

==xxx==

* [Troubleshooting AWS Signature Version 4 Errors](https://docs.aws.amazon.com/general/latest/gr/signature-v4-troubleshooting.html)

## AWS Networking Example

==xxx==

* [AWS - Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

## AWS Developer Tools

==xxx==

* [AWS - Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

## AWS Compute Services

==xxx==

* [AWS - Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

## AWS Container Services

==xxx==

* [AWS - Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

## AWS Storage Services

==xxx==

* [AWS - Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

## AWS Database Services

==xxx==

* [AWS - Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

## AWS Migration Services

==xxx==

* [AWS - Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

## AWS Networking Services

==xxx==

* [AWS - Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

## AWS Security, Identity, and Compliance

==xxx==

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
