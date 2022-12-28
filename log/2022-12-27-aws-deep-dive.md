# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-27

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Security

Interesting - AWS maintains FIPS-specific endpoints for use by organizations that require FIPS compliance. (In other words, FIPS is less of an "option" in AWS and more of a "parallel infrastructure".)

Tag and *all* free-form fields are basically considered non-confidential in AWS. This is a big contrast to something like GitHub (and many other services), which supplies a functionality specifically for storing sensitive/secret information.

* [Security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

### How Amazon API Gateway Works With IAM

Interesting: Federated identities in Amazon work by assuming roles rather than being a special kind of IAM user. The API Gateway guide, at least, explicitly *discourages* the use of IAM users in favor of roles (since role credentials are short-lived). This would seem to be an indirect endorsement of using federated identities with AWS rather than IAM users (whenever possible).

(Another side-note: Resource policies are always *inline*. Which kinda makes sense, as the places where resource policies are used - S3 bucket policies, role trust policies, etc. - are generally with objects that are almost always their own special snowflakes.)

API Gateway actions in IAM policies are all `apigateway:` + some HTTP verb.

* `apigateway:GET`
* `apigateway:POST`
* `apigateway:PUT`
* `apigateway:DELETE`
* `apigateway:PATCH`
* `apigateway:*`

These define permitted interactions with API Gateway's API, *not* the APIs built using API Gateway. The resources these actions are scoped to are individual APIs or sets of APIs, as defined by the API path expressed as the appropriate ARN. Further restrictions as to *what* classes of action are allowed are defined using conditions. (Though the documentation is kind of ambiguous here - the text states more-or-less what I just said, but the provided example implies a more flexible model.)

In IAM policies, multiple Condition blocks, or keys within a Condition block, are implicitly ANDed together; however, multiple conditions within a Condition block key are ORed.

REST APIs (but not HTTP or WebSocket APIs) can have resource policies attached to them.

* [How Amazon API Gateway works with IAM](https://docs.aws.amazon.com/apigateway/latest/developerguide/security_iam_service-with-iam.html)

### Using Service-Linked Roles for API Gateway

Service-linked roles cannot be deleted in the IAM console until all related resource have been deleted.

* [Using service-linked roles for API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/using-service-linked-roles.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-28

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Security

* [Security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

### Monitoring API Gateway API configuration with AWS Config

==xxx==

* [Monitoring API Gateway API configuration with AWS Config](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-config.html)

## Tagging

==xxx==

* [Tagging your API Gateway Resources](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-tagging.html)

## API References

==xxx==

* [Amazon API Gateway: API References](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-ref.html)

## Quotas and Important Notes

==xxx==

* [Amazon API Gateway Quotas and Important Notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)

# AWS KMS Cryptographic Details

==xxx==

## Introduction

==xxx==

* [Introduction to the Cryptographic Details of AWS KMS](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Key Management Service Foundations

==xxx==

* [AWS Key Management Service Foundations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/foundation.html)

## Use Cases

==xxx==

* [AWS KMS Use Cases](https://docs.aws.amazon.com/kms/latest/cryptographic-details/use-cases.html)

## AWS KMS Keys

==xxx==

* [Working with AWS KMS Keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-keys.html)

## Customer Data Operations

==xxx==

* [AWS Key Management Service: Customer Data Operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/customer-data-operations.html)

## AWS KMS Internal Operations

==xxx==

* [AWS KMS Internal Operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-internals.html)

# AWS Well-Architected Framework

==xxx==

## Abstract and Introduction

==xxx==

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## The Pillars of the Framework

==xxx==

* [AWS Well-Architected Framework: The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

## The Review Process

==xxx==

* [AWS Well-Architected Framework: The Review Process](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-review-process.html)

## Conclusion

==xxx==

* [AWS Well-Architected Framework: Conclusion](https://docs.aws.amazon.com/wellarchitected/latest/framework/conclusion.html)

## Questions and Best Practices

==xxx==

* [AWS Well-Architected Framework: Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

# Signature Version 4 Signing Process

==xxx==

* [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## Changes in Signature Version 4

==xxx==

* [Changes in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_changes.html)

## Signature Version 4 Request Elements

==xxx==

* [Elements of an AWS Signature Version 4 Request](https://docs.aws.amazon.com/general/latest/gr/sigv4_elements.html)

## Signing AWS Requests

==xxx==

* [Signing AWS Requests with Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html)

## Handling Dates

==xxx==

* [Handling Dates in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-date-handling.html)

## How to Derive a Signing Key

==xxx==

* [Examples of How to Derive a Signing Key for Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html)

## Signing Examples

==xxx==

* [Examples of the Complete Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

## Troubleshooting

==xxx==

* [Troubleshooting AWS Signature Version 4 Errors](https://docs.aws.amazon.com/general/latest/gr/signature-v4-troubleshooting.html)

# AWS Networking Example

==xxx==

* [AWS - Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

# AWS Developer Tools

==xxx==

* [AWS - Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

# AWS Compute Services

==xxx==

* [AWS - Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

# AWS Container Services

==xxx==

* [AWS - Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

# AWS Storage Services

==xxx==

* [AWS - Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

# AWS Database Services

==xxx==

* [AWS - Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

# AWS Migration Services

==xxx==

* [AWS - Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

# AWS Networking Services

==xxx==

* [AWS - Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

# AWS Security, Identity, and Compliance

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