# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-09-19

The AWS deep dive reading notes return!

# AWS IAM Policies in a Nutshell

IAM policy statements can include an `Sid` value (different than the policy-level `Id`). This is only required by a few services (SQS and SNS). It seems like it's probably safe to just set both the `Id` and the `Sid` to some UUIDv4 value (though the two should *probably* use different UUIDs).

(The reason there's both an `Sid` and an `Id` is that the policy `Statement` can point *either* to a single object *or* an array of objects. `Sid` is redundant in the first case, but uniquely identifies each policy statement object in the second case.)

Many (most?) IAM policy properties accept wild-carding. An `Action` of `s3:Get*` is equivalent to writing `s3:GetObject`, `s3:GetBucket`, ...

(The "?" string can also be used as a single-character wildcard.)

There's also "policy variables" which can be used anywhere a wildcard can be. These are things like `aws:username`, and when used they're referenced as `${aws:username}`.

Statement properties (`Principal`, `Action`, and `Resource`) generally accept either a string or an array of strings.

The IAM policy statement `Principal` isn't needed for policies attached to users, groups, and roles. In all of these cases, the `Principal` defaults to the object the policy is attached to (makes sense). Thus, `Principal` is primarily used only for policies attached to resources like S3 buckets and SQS queues.

(Policies attached to resources *sometimes* don't need to include a `Resource` object in the policy statement. But sometimes they do. For example, "permissions policies" attached to roles - see below - don't need a `Resource`, but policies attached to S3 buckets *do* need a `Resource`.)

Group ARNs are *not* allowed to be principals.

Roles require *two* policies to be attached - a "permissions policy" (which specifies what the role can do) and a "trust policy" (which specifies who can assume the role). In a sense, a role functions as both an actor (via the "permissions policy") and a resource (via the "trust policy").

Trust policies are where the `sts:AssumeRole` action gets used.

The ARN format:

```
arn:aws:[service]:[region]:[account]:[resourceType]/[resourcePath]
```

The "service", "region", and "account" portions of an ARN can be collapsed if not relevant. Thus `arn:aws:s3:::bucket-name/*` is equivalent to `arn:aws:s3:*:*:bucket-name/*`.

The statement `Condition` property is an object that contains one or more conditions of the following form:

```json
"conditionOperator": {
	"conditionKey": "conditionValue"
}
```

For example:

```json
"DateGreaterThan": {
	"aws:CurrentTime": "2022-09-19T00:00:00Z"
}
```

Many (all?) available condition keys are also policy variables.

Annoyingly, not every action supports every condition key.

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)
* [IAM policy elements: Variables and tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html)
* [Actions, resources, and condition keys for AWS services](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html)
* [IAM JSON policy elements: Condition operators](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html)
* [AWS global condition context keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html)

<!--

# AWS IAM Privilege Escalation: Methods and Mitigation

xxx

* [AWS IAM Privilege Escalation - Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

# Amazon API Gateway

xxx

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

# AWS KMS Cryptographic Details

xxx

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

# AWS Well-Architected Framework

xxx

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

# Signature Version 4 Signing Process

xxx

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

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
