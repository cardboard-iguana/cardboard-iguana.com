# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-10-04

# Amazon API Gateway

Notes about the Amazon API Gateway continue.

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Creating a REST API in Amazon API Gateway (Continued...)

In the API Gateway documentation, "request parameters" always means URL parameters (either GET variables or dynamic portions of the URL) or HTTP headers, while "request body" refers to JSON blobs that compose the, well, request body.

For non-GET requests, JSON payloads can be defined as "models" using the JSON Schema specification. These are specified with the AWS CLI using the `--request-models` flag with the JSON blob `{"media/type":"modelName"}` (for example, `{"application/json":"apiInputModel"}`).

Dynamic resource substrings can be specified using the `{proxy+}` notation ("proxy" can actually be any word). This functions like a wildcard, so `/foo/{proxy+}` functions like `/foo/*`. Proxy resources are passed as full strings, and can contain additional URL sub-paths (for example, `/foo/bar/baz/1000` will be passed as `bar/baz/1000`); it's the backend's responsibility to decompose the proxy string and respond appropriately. Proxy strings can't have children (so `/foo/{proxy+}/{itemId}` is *not* permitted), but can have siblings (if `/foo/bar` is defined, then `{proxy+}` will *not* match `bar` and its children).

Request parameter specs:

* method.request.path.foo - path parameter "foo"
* method.request.querystring.bar - GET variable "bar"
* method.request.header.baz - HTTP header "baz"

Setting a request parameter to "true" when defining it marks it as required, while using "false" marks it as optional. Example AWS CLI call:

```bash
aws apigateway put-method \
	--rest-api-id vaz7da96z6 \
	--resource-id 6sxz2j \
	--http-method GET \
	--authorization-type "NONE" \
	--region us-west-2 \
	--request-parameters '{
	    "method.request.path.foo": true,
	    "method.request.querystring.bar": false,
	    "method.request.header.baz": false
	  }'
```

If a request model is supplied, then a "validator" can also be set up in the API Gateway and then applied to incoming parameters, though only parameters marked as required can be validated.

API Gateway supports the DELETE, GET, HEAD, OPTIONS, PATCH, POST, and PUT methods, as well as the special ANY method which will pass *all* methods to the same backend handler (like `{proxy+}`, in this case the backend becomes responsible for decomposing and properly handling the different verbs).

The API Gateway can handle *some* authorization methods as well:

* `NONE` - no authorization
* `AWS_IAM` - use IAM
* `CUSTOM` - use a Lambda function for authorization
* `COGNITO_USER_POOLS` - use Amazon Cognito

IAM authentication uses Sigv4; cross-account access to call APIs can only be granted indirectly via AssumerRole.

Method responses can either be pre-configured mappings from the backend to the client (HTTP status code, response parameters, and a response model), or just directly proxy the backend response to the client. Defined method responses are chosen by matching the HTTP status code returned by the backend, with 500 returned for any unmapped backend responses. Note that response parameters are only necessary if the API Gateway is to map the backend responses - if not defined, then the backend response will simply be proxied. Response models are only necessary for automatic SDK generation.

* [2022-10-02 - AWS Deep Dive (Creating a REST API in Amazon API Gateway, Part 1)](2022-10-02-aws-deep-dive.md)
* [JSON Schema](https://datatracker.ietf.org/doc/html/draft-zyp-json-schema-04)
* [Creating a REST API in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-create-api.html)

### Controlling and Managing Access to a REST API in API Gateway

Resource policies can be attached to APIs defined in the API Gateway in a similar fashion to S3.

(To be continued...)

* [Controlling and managing access to a REST API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)

<!--

# Amazon API Gateway

Notes about the Amazon API Gateway continue...

## Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

### Controlling and Managing Access to a REST API in API Gateway (Continued...)

> https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-policy-language-overview.html

xxx

* [2022-10-04 - AWS Deep Dive (Controlling and Managing Access to a REST API in API Gateway, Part 1)](2022-10-04-aws-deep-dive.md)
* [Controlling and managing access to a REST API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)

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
