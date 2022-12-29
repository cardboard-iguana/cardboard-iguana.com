# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-28

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Security

* [Security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

### Monitoring API Gateway API configuration with AWS Config

The AWS Config service allows changes to API Gateway configuration (both API- and stage-related) to be tracked and optionally alerted on. It's worth noting that AWS Config seems to pick up on configuration changes when they're *made*, but in API Gateway some changes only take effect *after* the API has been redeployed. In these cases, AWS Config can show a change as having been made (which it was), but the API may still be operating under the previous settings (if the change required a redeployment to become active).

* [Monitoring API Gateway API configuration with AWS Config](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-config.html)

### Infrastructure Security in Amazon API Gateway

STS (an acronym that shows up frequently when talking about assumable roles) stands for "Security Token Service".

* [Infrastructure security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/infrastructure-security.html)

## Tagging

Tags in AWS are key/value pairs - kind of an intermediate step between the simple string-only tagging found in many apps and full hierarchical tagging (key/value tagging is isomorphic to hierarchical tagging that's been restricted to only two levels).

Tags without assigned values are interpreted as having a value of the empty string.

* [Tagging your API Gateway Resources](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-tagging.html)

### API Gateway resources that can be tagged

Tags are basically at the level of an "API" (or stage) in API Gateway - they cannot be applied to individual *methods* (or other components) within that API, though queries on sub-API components will return the tag of the parent API or stage in some cases.

In the case of stages, tags can either be set directly or inherited from the parent API. If tags with the same key but different values are assigned to both the API and the stage, the more specific tag (i.e., the tag for the stage) will take precedence.

As you might expect from this, only one tag with a given key can be applied to a particular resource in API Gateway. There is also a limit of 50 tags per resource (however, AWS-reserved tags, which all begin with `aws:`, don't count against this limit).

* [API Gateway resources that can be tagged](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-tagging-supported-resources.html)

### Using Tags to Control Access to API Gateway Resources

Tags can limit access to both resources that currently exist (resource tags) and resources that a user tries to create (request tags).

(Request tags are basically resource tags that are being applied to resources that are being created. You'd think that it would be easiest to just think of these as resource tags as well, but IAM policies distinguish between these tag types: Resource tags are referenced using `aws:ResourceTag/$TAG_NAME` condition keys, while request tags are referenced using `aws:RequestTag/$TAG_NAME` condition keys.)

* [Using tags to control access to API Gateway resources](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-tagging-iam-policy.html)

## Quotas and Important Notes

In practice, ARNs are limited to a total of 1600 bytes (ASCII characters), as IAM policies and quotas (and other things?) will take errors when attempting to operate on longer values.

API Gateway quotas are surprisingly low, generally just a few hundred requests per second across a given API. Accounts are capped at 10,000 requests per second across *all* APIs, though this can be increased. This would seem to make API Gateway unsuitable for extremely popular APIs, unless such an API was sharded across multiple API Gateway APIs and/or AWS accounts (in which case a custom domain would be required to "stitch" the full API back together).

* [Amazon API Gateway Quotas and Important Notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)

### Amazon API Gateway important notes

APIs cannot use `/ping` and `/sping` method endpoints, as these are reserved for internal health checks. Or, rather, apparently you *can* use these method endpoints, but they won't work because the internal mapping will take precedence.

Rest APIs in API Gateway apparently don't handle `|` and `;` characters in query strings very gracefully - the former must be percent-encoded, while the latter will always split the query data.

Apparently, VPC link information needs to be removed *before* associated methods are deleted, as otherwise the VPC link will still be registered as in-use!

Also, API Gateway apparently doesn't play nice with NGINX.

If I read the header restrictions for API Gateway correctly, I'm not sure it's ever vulnerable to HTTP request smuggling, as the `Transfer-Encoding` header is never passed through, and will sometimes even generate an exception when supplied.

API Gateway only inspects the *first* media type in the `Accept` header; since the application can't always control the order the browser will send these headers in, this means that you basically need to include all possible MIME types that may be associated with a request when configuring the `binaryMediaTypes` parameter, even if the backend only responds with a limited number of types.

* [Amazon API Gateway important notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html)
* [Percent-encoding (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)
* [HTTP request smuggling (Wikipedia)](https://en.wikipedia.org/wiki/HTTP_request_smuggling)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-29

I'm *finally* done reading about Amazon's API Gateway. Now on to reading about the AWS Key Management Service (KMS)!

# AWS KMS Cryptographic Details

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