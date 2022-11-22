# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-21

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With HTTP APIs

HTTP APIs are also REST APIs - they just have fewer features, but cost less per call. HTTP APIs can also be used with Lambda functions; their main distinguishing feature is that client calls are passed in full to the backend, and backend responses are passed in full to the requesting client.

Lambda authorizers are *not* supported for HTTP APIs, though OpenID Connect and OAuth2 authorization methods are supported.

* [Amazon API Gateway: Working with HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)

### Working With Routes for HTTP APIs in API Gateway

HTTP APIs support the ANY pseudo-method, path variables, and query string parameters, just like API Gateway REST APIs (though unlike REST APIs, by default HTTP APIs pass query parameters through unchanged to the backend).

They also support the creation of a `$default` route, which is used for any unhandled methods (i.e., method/path tuples). By default, requests that fall through to the `$default` route are passed on to the backend with the same method, path, and query parameters that they were received with by API Gateway.

* [Working with routes for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-routes.html)

### Controlling and Managing Access to an HTTP API in API Gateway

HTTP APIs support using Lambda functions, JWT tokens, and IAM roles/policies for access control.

Lambda authorizers for HTTP APIs receive a JSON payload in a fixed format from API Gateway and then must respond with either a boolean `isAuthorized` (which provides authorization for the *entire* API) or an IAM policy (which can allow or deny access for specific routes). The authorizer can also supply additional `$context` variables to be passed to the actual backend of the API call. API Gateway can also pre-check that appropriate "identity sources" are being passed in, and immediately respond (without invoking the Lambda authorizer) if it is not. If an identity source is specified in API Gateway, then authorizer responses can also be cached (using the source as the cache key).

For JWT authorization, API Gateway validates a JWT that is presented in a configured identity source. Tokens must include a scope property listing permitted API routes. API Gateway doesn't issue appropriate JWT tokens - some other system is expected to issue these to the client. All claims in a JWT are passed along to the backend.

IAM authorization requires that requests be Sigv4 signed.

* [Controlling and managing access to an HTTP API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-access-control.html)

### Configuring Integrations for HTTP APIs in API Gateway

HTTP API supports using Lambda functions, other web servers, other Amazon services, and VPC resources as backends.

Like Lambda authorizers, backend Lambda functions are provided input in a specific format and are expected to reply in a specific format. Unlike REST APIs, subsequent mappings are not configurable.

HTTP server backend are more-or-less freeform: API Gateway passes the request (including the path) unchanged to the backend, and returns the backend's response directly to the client. The one wrinkle is that API Gateway *does* allow the request path to be rewritten; path variables specified in the matched route can be used in the rewritten path.

Finally, AWS services can be called directly as API backends. These integrations are configured directly in API Gateway; values to pass to the backend service can be specified using parameters provided by the client, stage variables, or static values. The number, name, and constraints will depend on the backend service being configured. API Gateway will access the configured service using an IAM role that must be manually configured.

(Unfortunately, only a handful of AWS services can be directly integrated with HTTP APIs - EventBridge, SQS, AppConfig, Kinesis, and StepFunctions. These integrations further only support a handful of actions. So AWS service integration isn't nearly as flexible as it initially sounds.)

VPC resources are exposed to API gateway using "private integrations". Any VPC resource in AWS Cloud Map can be connected in this way. Private integrations are really just HTTP server integrations that are routed over a VPC link (and to an ARN instead of a normal URL). Note that VPC links become inactive after 60 days, and will fail for a few minutes before becoming active again if API requests resume.

* [Configuring integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations.html)

### Configuring CORS for an HTTP API in API Gateway

When CORS is turned on for an API, API Gateway will automatically respond to preflight OPTIONS requests (no special routes need to be configured).

One disadvantage of using a `$default` route is that it will trap preflight OPTIONS requests. Since preflight requests are do not include any authorization, an additional `OPTIONS /{proxy+}` route needs to be added that also does not require any authorization. (I'm 90% certain that OPTIONS requests in this case will still need to be handled by the backend, though the API Gateway documentation is silent on this point.)

> https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html

* [Configuring CORS for an HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-22

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With HTTP APIs

* [Amazon API Gateway: Working with HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)

### Transforming API Requests and Responses in API Gateway

xxx

> https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html

* [Transforming API requests and responses](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html)

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
