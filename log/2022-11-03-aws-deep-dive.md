# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-03

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Setting Up Custom Domain Names for REST APIs in Amazon API Gateway (Continued)

API Gateway custom domains are all managed through CloudFront.

APIs are mapped to base paths (which might be just `/`) off of the custom domain; thus, multiple APIs can (potentially) use the same custom domain (just with different base paths). For *regional* custom domains (this is a weird restriction...), *subsets* of multiple APIs can be rooted in different base paths with multiple components. To determine which API to route a request to, API Gateway chooses the API with the longest full path (base path + API path). One consequence of this is that for regional custom domains, one API can be "mounted" inside of another.

Once a custom domain is set up, the default API Gateway endpoint can be disabled. However, doing so disables it for *all* stages of that API.

* [2022-10-31 - AWS Deep Dive (Setting Up Custom Domain Names for REST APIs in Amazon API Gateway, Part 1)](2022-10-31-aws-deep-dive.md)
* [Setting up custom domain names for REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html)

### Enabling API Caching to Enhance Responsiveness  of API Gateway

By default, only GET API methods are cached. This can be tuned on a per-method basis, however. Custom headers and URL paths / query string can also be used as cache keys to further ensure that API responses are not inappropriately cached together.

Clients can force a cache reload by sending the `Cache-Control: max-age=0` HTTP header. This is actually allowed by default, and must be specifically denied using an IAM policy (which you probably want to do, less user activity negate your caching setup).

* [Enabling API caching to enhance responsiveness](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html)

### Enabling Payload Compression for an API in API Gateway

Compression is *not* enabled in API Gateway by default, but like many things can be enabled by setting a single property - in this case, `minimumCompressionsSize`. Any value between 0 and 10 MB (note that the variable is in bytes) will enable compression for responses with a size *greater* than that value (if the client has indicated that compression is supported). Compression is disabled by removing the parameter or setting it to null.

* [Enabling payload compression for an API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-gzip-compression-decompression.html)

### Creating and Using Usage Plans with API Keys in API Gateway

API Gateway can also generate API keys and tie these to per-stage usage plans in order to enable third-party developer access to a finished API. Individual API methods *cannot* be restricted per API key, though methods can be restricted to require *an* API key (it's just that all such restricted methods are available to anyone with an API key for that API). API keys must be either be transmitted by the client using the `x-api-key` header or provided by a Lambda authorizer (via the returned `usageIdentifierKey` property).

* [Creating and using usage plans with API keys](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-04

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Creating and Using Usage Plans with API Keys in API Gateway (Continued)

> https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-setup-api-key-with-console.html

* [2022-11-03 - AWS Deep Dive (Creating and Using Usage Plans with API Keys in API Gateway, Part 1)](2022-11-03-aws-deep-dive.md)
* [Creating and using usage plans with API keys](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html)

## Working With HTTP APIs

xxx

* [Amazon API Gateway: Working with HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)

## Working With WebSocket APIs

xxx

* [Amazon API Gateway: Working with WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

## API Gateway ARNs

xxx

* [API Gateway Amazon Resource Name (ARN) Reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/arn-format-reference.html)

## OpenAPI Extensions

xxx

* [Working with API Gateway Extensions to OpenAPI](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html)

## Security

xxx

* [Security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

## Tagging

xxx

* [Tagging your API Gateway Resources](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-tagging.html)

## API References

xxx

* [Amazon API Gateway: API References](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-ref.html)

## Quotas and Important Notes

xxx

* [Amazon API Gateway Quotas and Important Notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)

# AWS KMS Cryptographic Details

xxx

## Introduction

xxx

* [Introduction to the Cryptographic Details of AWS KMS](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Key Management Service Foundations

xxx

* [AWS Key Management Service Foundations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/foundation.html)

## Use Cases

xxx

* [AWS KMS Use Cases](https://docs.aws.amazon.com/kms/latest/cryptographic-details/use-cases.html)

## AWS KMS Keys

xxx

* [Working with AWS KMS Keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-keys.html)

## Customer Data Operations

xxx

* [AWS Key Management Service: Customer Data Operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/customer-data-operations.html)

## AWS KMS Internal Operations

xxx

* [AWS KMS Internal Operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-internals.html)

# AWS Well-Architected Framework

xxx

## Abstract and Introduction

xxx

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## The Pillars of the Framework

xxx

* [AWS Well-Architected Framework: The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

## The Review Process

xxx

* [AWS Well-Architected Framework: The Review Process](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-review-process.html)

## Conclusion

xxx

* [AWS Well-Architected Framework: Conclusion](https://docs.aws.amazon.com/wellarchitected/latest/framework/conclusion.html)

## Questions and Best Practices

xxx

* [AWS Well-Architected Framework: Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

# Signature Version 4 Signing Process

xxx

* [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## Changes in Signature Version 4

xxx

* [Changes in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_changes.html)

## Signature Version 4 Request Elements

xxx

* [Elements of an AWS Signature Version 4 Request](https://docs.aws.amazon.com/general/latest/gr/sigv4_elements.html)

## Signing AWS Requests

xxx

* [Signing AWS Requests with Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html)

## Handling Dates

xxx

* [Handling Dates in Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/sigv4-date-handling.html)

## How to Derive a Signing Key

xxx

* [Examples of How to Derive a Signing Key for Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html)

## Signing Examples

xxx

* [Examples of the Complete Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html)

## Troubleshooting

xxx

* [Troubleshooting AWS Signature Version 4 Errors](https://docs.aws.amazon.com/general/latest/gr/signature-v4-troubleshooting.html)

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
