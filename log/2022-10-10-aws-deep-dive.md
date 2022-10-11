# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-10-10

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Controlling and Managing Access to a REST API in API Gateway (Continued...)

Lambda authorization functions for the API Gateway can be called across accounts, though the setup process definitely shows that this is a bit of a hack / afterthought. Still, doing this allows authorization and API functions to be clearly separated, and also allows a single authorization method to be shared across multiple API Gateways (since the recommendation is only to deploy a single API Gateway per account). Cross-account Cognito user pools can be configured in a similar fashion.

Updating authorization methods seems to always require the apigateway:POST (create) and apigateway:PATCH (update) IAM permissions, though the target resources differ depending on which authorization method is being used.

* [2022-10-04 - AWS Deep Dive (Controlling and Managing Access to a REST API in API Gateway, Part 1)](2022-10-04-aws-deep-dive.md)
* [2022-10-08 - AWS Deep Dive (Controlling and Managing Access to a REST API in API Gateway, Part 2)](2022-10-08-aws-deep-dive.md)
* [Controlling and managing access to a REST API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)

### Setting up REST API Integrations

Integration request URIs can either be URLs or ARNs. Using ARNs allows selected API requests to be mapped directly to Amazon services (such as S3), though IMHO I've found this approach inadvisable (because it's *really* easy to expose too much functionality/data this way!).

(If I read this section correctly, then one way to think of the distinction between method request/response and integration request/response is that the method determines request/response *formatting*, while the integration determines request/response *variable mapping*.)

In addition to integrating with Lambda functions, generic AWS services, and generic HTTP endpoints, API Gateway can also act as a "mock" endpoint itself for the purpose of integration testing. In general, integrations can be divided into "proxy" and "non-proxy" types; the difference is in whether the request/response is passed unchanged from client to backend (and vice versa), or whether a more complicated transform using integration requests/responses needs to be defined.

(It's worth noting that Lambda proxies aren't *true* proxies, in that the request isn't *literally* passed through to the backend (or back to the client). Rather, the request is translated to a standardized JSON format, and the response is expected in a standardized format, which is then automatically re-mapped/formatted into a more REST-like HTTP response by the API Gateway.)

It sounds like using a Lambda proxy requires the use of both the greedy `{proxy+}` path element and the virtual `ANY` HTTP verb...? Which I suppose makes sense (as this allows you to think of the Lambda function as sitting at the "root" of a particular path).

As one might suspect, regular expressions in the API Gateway are all Java-flavored.

(To be continued...)

* [Amazon API Gateway: Setting up REST API Integrations](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-integration-settings.html)

<!--

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Setting up REST API Integrations (Continued...)

> https://docs.aws.amazon.com/apigateway/latest/developerguide/setup-http-integrations.html

* [2022-10-10 - AWS Deep Dive (Setting up REST API Integrations, Part 1)](2022-10-10-aws-deep-dive.md)
* [Amazon API Gateway: Setting up REST API Integrations](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-integration-settings.html)

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
