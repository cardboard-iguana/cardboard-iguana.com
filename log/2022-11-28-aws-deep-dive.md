# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-28

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With WebSocket APIs

* [Amazon API Gateway: Working with WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

### Create a WebSocket API in API Gateway

WebSocket APIs require the use of TLS 1.2 (API Gateway doesn't seem to support TLS 1.3).

WebSocket APIs *cannot* be converted into REST APIs, nor can REST APIs be turned into WebSocket APIs. (This makes sense.)

* [Create a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-create-empty-api.html)

### Working With Routes for WebSocket APIs in API Gateway

Route selection expressions are based around the form `$request.body.<JSON_PATH_TO_PROPERTY>`. Objects can be matched by the JSONPath, but the results will be stringified before evaluation. Multiple selection expressions can be combined into the final expression; static values can be included to make it easier to read/parse the evaluated route key's value.

Note that the `$` is *not* included in a custom route key name when setting up a route; only the built-in `$default`, `$connect`, and `$disconnect` route names can lead with this character.

The `$connect` route supports IAM (`AWS_IAM`) and Lambda Authorizers (`CUSTOM`) for authorization. There's also a `NONE` option. API Gateway can also check for the presence of a valid API key when the `$connect` route is called.

Only the `$default` route can be used for responses, which is somewhat annoying as all of the (user-facing) machinery seems to exist to support route responses on custom route selections.

The `$connect` route allows a Lambda authorizer to reject connections for unsupported subprotocols (specified by the `Sec-WebSocket-Protocol` header). It's not clear to me what this gets you, but I assume this is important functionality for people who work with WebSockets.

* [Working with routes for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-develop-routes.html)

### Controlling and Managing Access to a WebSocket API in API Gateway

IAM policies work basically the same for WebSocket APIs as REST APIs, except that (1) WebSockets support a `ManageConnections` action that controls access to the `@connections` API, and (2) non-`@connections` routes use a different ARN format (the `@connections` API is represented as `arn:aws:execute-api:*:*:*/*/POST/@connections`).

(It's not 100% clear *what* the `@connections` API is. It seems to be different than the `$connect` route, and has something to do with response routes.)

The biggest difference when using a Lambda authorizer between WebSockets and REST APIs is that the `event.methodArn` is different (`arn:aws:execute-api:*:*:*/*/$connect`). Path variables (`event.pathParameters`) aren't available and context variables (`event.requestContext`) are different too, but these pretty obviously need to be the case.

* [Controlling and managing access to a WebSocket API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-control-access.html)

### Setting up WebSocket API Integrations in API Gateway

The "Lambda Function" integration type is only for *existing* Lambda functions that don't/won't require special resource permissions. All other Lambda function requests (including the automatic creation of new Lambda functions) are handled with the "AWS Service" integration type. (This strikes me as a weird and *really* specific distinction.)

Regardless of the integration type, WebSockets APIs support a template selection process that parallels the route selection process - a template selection expression (like a route selection expression) will be used to determine a template key. The template corresponding to that key will then be used to determine which request mapping template is used to pre-process the incoming request before handing it off to the backend.

Integration responses can be pre-processed in a similar way as requests, using a "response key" that maps to a particular response template. Responses that don't match this key are handled by the `$default` response key (and corresponding template). The big difference here is that the response key is a regular expression matching the returned backend HTTP status code, rather than a JSONPath.

Note that there is no response setup for proxy integrations; API Gateway simply passes these backend responses to the client unaltered (assuming that a response route has been configured).

* [Setting up WebSocket API integrations](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-integrations.html)

### Request Validation for WebSocket APIs in API Gateway

Incoming WebSocket requests can be validated by API Gateway before being passed to backend integrations, just like with REST APIs. As you might expect by this point, different JSON schema request models can be used for validation, each keyed off of a model selection expression (which works just like a route selection expression). A catch-all `$default` model can also be defined.

Models can be chosen at the same time (and by the same expression) as routes, which seems like how you'd normally want to handle things.

* [Request validation](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-request-validation.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-11-29

# Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Working With WebSocket APIs

* [Amazon API Gateway: Working with WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html)

### Setting Up Data Transformations for WebSocket APIs in API Gateway

==xxx==

> https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-data-transformations.html

* [Setting up data transformations for WebSocket APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/websocket-api-data-transformations.html)

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