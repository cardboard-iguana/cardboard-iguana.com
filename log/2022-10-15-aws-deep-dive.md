# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-10-15

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Enable Request Validation in API Gateway

Incoming requests that fail API Gateway validation (if configured) result in the following:

* The integration request and later steps are *not* performed.
* The API Gateway immediately responds with a 400.
* The validation failure is pushed to the configured CloudWatch log.

API Gateway validation consists of ensuring that all expected parameters are present and (if applicable/configured) that any request payload conforms to the "JSON schema" supplied when specifying the request body in the corresponding method request. Validation is activated by specifying a "validator", which is just a (defined) collection of parameters that controls whether validation is performed on the request body, other request parameters, or both (an absent validator seems to be equivalent to specifying no validation on either parameter set). It's a little unclear what advantage the level of abstraction provided by the "validator" object provides, since there are only two valid sub-parameters.

A "default" validator can be set at the level of the entire API, in which case it will be applied to all defined methods (unless that method specifies an alternate, overriding, validator).

* [Enable request validation in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html)

### API Gateway: Setting Up Data Transformations for REST APIs

Mapping templates (method request -> integration request and integration response -> method response) are Velocity Template Language (VTL) scripts; individual data elements from the input are specified using JSONPath. VTL itself looks fairly straightforward, and is reminiscent of both Handlebars and Liquid.

VTL transformations can be applied to either the body payload or to non-body parameters (headers, query parameters, or response codes). It is a little unclear how the API Gateway determines whether a mapping template is operating over a request or response payload vs. other HTTP parameters, though it looks from the documentation that different parts of the HTTP request/response (headers, body, etc.) are set in different parts of the API Gateway console/API.

Mappings are defined in the final processing step ("integration request" for incoming requests, or "method response" for outgoing responses). Different body mappings can be defined for different content types: For incoming (method) requests the API Gateway will inspect the `Content-Type` header, while for outgoing (integration) responses the `Accept` header will be used; `application/json` is used as the default if an appropriate header is missing. Mappings can be used for some content types but not others, but if this is done then an empty mapping (and appropriate pass-through behavior) *must* be supplied for any content types that should be transparently passed through.

Parameter names (GET variables, header names, and JSON parameters) must match the `^[a-zA-Z0-9._$-]+$` regexp. While body mappings are defined explicitly, (JSON) body parameters can be referenced in non-body mappings using JSONPath expressions (in the `method.request.body` or `integration.response.body` namespace).

Apparently the standard `$input.params(i)` variables are vulnerable to JSON path injection. For whatever reason Amazon *doesn't* fix this automatically, but rather recommends that returned values be processed by `$util.escapeJavaScript()` before use instead (I guess that fixing this proactively must break critical functionality for some *really* big customers...). (Except... Apparently `$util.escapeJavaScript()` produces invalid JSON when the input contains single quotes, so the construct `$util.escapeJavaScript('$').replaceAll("\\'","'")` needs to be used instead. WTF?)

For all `$input` functions, the `$` parameter represents the root of the request body JSON (though it looks like this can be safely dropped so long as you're not referring to the entire object itself).

* [Setting up data transformations for REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/rest-api-data-transformations.html)
* [Apache Velocity Engine - User Guide](https://velocity.apache.org/engine/2.3/user-guide.html)
* [Handlebars - Introduction](https://handlebarsjs.com/guide/)
* [Liquid template language](https://shopify.github.io/liquid/)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-10-15

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Gateway responses in API Gateway

> https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-gatewayResponse-definition.html

* [Gateway responses in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-gatewayResponse-definition.html)

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
