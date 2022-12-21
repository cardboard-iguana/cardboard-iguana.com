# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-20

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With WebSocket APIs

* [Amazon API Gateway: Working with WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

### Setting Up Data Transformations for WebSocket APIs in API Gateway

WebSocket API proxy integrations cannot use integration response templates - the backend response is always passed back as-is to the caller. When response templates *are* used, they are limited to switching on Lambda error messages or HTTP status codes (depending on the integration type).

* [Setting up data transformations for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-data-transformations.html)

### Working With Binary Media Types for WebSocket APIs in API Gateway

Basically, WebSocket APIs in API Gateway can't handle raw binary. Any such files need to be converted to/from base64, as appropriate, as the first step in processing.

* [Working with binary media types for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-develop-binary-media-types.html)

### Invoking a WebSocket API in API Gateway

Sending callback messages from the backend *to* the client require that those messages be SigV4 signed. Surprisingly, this can be done by calling the corresponding `@connections` URL in API Gateway directly - connections don't have to be established through API Gateway first!

```
https://${api-id}.execute-api.${region}.amazonaws.com/${stage}/@connections/${connection_id}
```

Given that *any* client can call this URL, it's a good thing that SigV4 signing is required!

Messages can be sent to the client at `connection_id` using POST requests, while the client's current status will be returned when using GET. A DELETE request will disconnect the client.

* [Invoking a WebSocket API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-how-to-call-websocket-api.html)

### Working With Stages for WebSocket APIs in API Gateway

As with other API types, you cannot specify a Lambda function for use with the WebSockets API using stage variables if that function is in another account.

* [Working with stages for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-stages.html)

### Deploy a WebSocket API in API Gateway

Each API in API Gateway is limited to ten stages.

* [Deploy a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-set-up-websocket-deployment.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-22

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With WebSocket APIs

* [Amazon API Gateway: Working with WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

### Setting Up Custom Domain Names for WebSocket APIs in API Gateway

==xxx==

> https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-custom-domain-names.html

* [Setting up custom domain names for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-custom-domain-names.html)

## API Gateway ARNs

==xxx==

* [API Gateway Amazon Resource Name (ARN) Reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/arn-format-reference.html)

## OpenAPI Extensions

==xxx==

* [Working with API Gateway Extensions to OpenAPI](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions.html)

## Security

==xxx==

* [Security in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

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