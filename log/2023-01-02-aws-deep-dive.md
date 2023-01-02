# AWS Deep Dive

author:: Nathan Acks  
date:: 2023-01-02

## AWS Well-Architected Framework

### [Introduction](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

#### [Definitions](https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html)

The Well-Architected Framework uses somewhat eccentric definitions of "component" (mostly normal) and "workload" (not really normal). In the Well-Architected Framework, a **component** is a unit of *something* (code, application configuration, S3 bucket, etc.) that meets some atomic requirement. A **workload** is then a collection of components that performs a distinct business function (this is in contrast to the more usual understanding of the term "workload", which would be something like "system resources consumed when performing an operation of some sort").

**Architectures** and **technology portfolios** are then understood as collections of "workloads" within the Well-Architected Framework.

> Security and operational excellence are generally not traded-off against the other pillars.

I suppose that quote pretty clearly contextualizes the Well-Architected Framework as more *aspirational* than anything else.

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html)

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html)

Basically:

* Infrastructure as code
* Modular infrastructure
* Regular performance analysis
* Tabletop exercises
* Post-motems

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-bp.html)

###### [Organization](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-organization.html)

It's not called this, but the directive that each components, processes, etc. must have a "single wringable neck" associated with it makes an oblique appearance in the AWS "organizational" best practices for "operational excellence".

Key questions:

* How do you determine what your priorities are?
* How do you structure your organization to support your business outcomes?
* How does your organizational culture support your business outcomes?

This document really is full of zingers:

> Recognize that an undesired result is a successful experiment that has identified a path that will not lead to success.

###### [Prepare](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-prepare.html)

Key questions:

* How do you design your workload so that you can understand its state?
* How do you reduce defects, ease remediation, and improve flow into production?
* How do you mitigate deployment risks?
* How do you know that you are ready to support a workload?

So, explainability, modularity, reversibility.

###### [Operate](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-operate.html)

Key questions:

* How do you understand the health of your workload?
* How do you understand the health of your operations?
* How do you manage workload and operations events?

So, logging and playbooks.

###### [Evolve](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-evolve.html)

Key question:

* How do you evolve operations?

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2023-01-07

## AWS Well-Architected Framework

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Security](https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html)

==xxx==

##### Design Principles

##### Definition

##### Best Practices

###### Security

###### Identity and Access Management

###### Detection

###### Infrastructure Protection

###### Data Protection

###### Incident Response

##### Resources

#### [Reliability](https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html)

==xxx==

##### Design Principles

##### Definition

##### Best Practices

###### Foundations

###### Workload Architecture

###### Change management

###### Failure Management

##### Resources

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