# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-06-28

## Amazon S3: Bucket Policies and User Policies

This is an exercise in setting up cross-account bucket permissions. The exercise itself is fairly straight-forward; below is just going to be some random-ish notes.

* The idea here is for Account A to grant Account B access to some resource (in this case, an S3 bucket), and then for Account B to delegate access to users within that account.
* For a user to access a cross-account resource, they must have permission to do so from *both* the resource owner (Account A) and their own account (Account B). *This is true even if Account B as a whole does not have access to the resources the user has been granted permission to.*
* I eventually had to set up the AWS CLI on my Raspberry Pi, as iSH seems to be deeply broken right now (though everything seems to be fixed in git).

REFERENCES:

* [Amazon Simple Storage Service (S3) — Bucket policies and user policies: Bucket owner granting cross-account bucket permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html)
* [Use a Raspberry Pi 4B as an iPad Pro Hacking Accessory](../notes/use-a-raspberry-pi-4b-as-an-ipad-pro-hacking-accessory.md)
* [iSH](http://ish.app/)
* [ish-app / ish](https://github.com/ish-app/ish)

## Using IAM Roles

Next up is reading through the section of the AWS IAM documentation about roles. I’m going to continue to use bullet-point lists here for notes.

### Using IAM Roles

* Interesting limitations: `RoleName` attributes are limited to 64 characters, but can have an prepended `Path` of up to 512 *additional* characters. However, roles  where the length of `Path` + `RoleName` is greater than 64 characters cant’s be switched to via the Console — they’re essentially API-only. This is rooted in the combined `Path` + `RoleName` value being stored as a browser cookie.
* How long you can assume a role for varies a lot, and can be controlled via URL construction or API call *up to* the maximum session duration defined for that role (or to 12 hours for roles assumed via a URL, which happens to be the maximum value for the maximum session duration).
* There’s a hard limit of 1 hour, however, when you chain roles together (assuming one, and then using that role to assume another).
* If you try to assume a role for longer than the maximum duration allowed in a given context, the operation will fail. Which is unfortunate, as that means that before assuming a role on behalf of a user any process would need to call `aws iam get-role` / the `GetRole` API if the intention is to assume the role for as long as possible.
* Role time limits apply only to users — AWS services and applications running on EC2 instances are exempt.

REFERENCES:

* [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html)

### Granting a User Permissions to Switch Roles

* As noted above, using cross-account roles (or services) requires the cooperation of both accounts: The account being granted permission to use the role must still *explicitly* make that role (or service) available to its users.
* Root users cannot switch roles.
* Roles that require an `ExternalId` can only be accessed over the API.
* Switching roles using the admin console does not appear to allow for role chaining.
* Successful `AssumeRole` events are tracked by CloudTrail.

REFERENCES:

* [Granting a User Permissions to Switch Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html)

### Granting a User Permissions to Pass a Role to an AWS Service

* `PassRole` cannot be used with cross-account roles.
* Three things are required for a user to pass a role to a service: (1) The role itself, (2) a “trust policy” attached to the role that allows the service in question to call `sts:AssumeRole`, and (3) an IAM policy attached to the user passing the role that allows `iam:PassRole` for the role resource ARN.
* The user passing a role doesn’t need to have access to that role themselves — they just need permission to pass it.
* Role names cannot be changed. But surprisingly, role `Path` parameters *can* be changed.

REFERENCES:

* [Granting a User Permissions to Pass a Role to an AWS Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html)
* [Switching to a Role (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html)

### Switching to an IAM Role (AWS CLI)

* You can create a profile for the AWS CLI that automatically assumes a role by specifying two parameters in the associated `profile` block: `role_arn` (obviously the ARN of the role to be assumed) and `source_profile` (the name of an *existing* profile that has permission to assume `role_arn`). When the AWS CLI is being used on an EC2 instance that has an existing role, `credential_source = Ec2InstanceMetadata` needs to be used instead of `source_profile`.
* The requirements to allow a service to assume a role are similar to those to allow a user to pass a role: (1) The role itself, (2) a “trust policy” attached to the role that allows the role that allows the role attached to the service (see next requirement) to call `sts:AssumeRole`, and (3) an role attached to the service itself that allows it to call `sts:AssumeRole` for the first role resource ARN. This is again the pattern where AWS requires that trust relationships be bidirectional.

REFERENCES:

* [Switching to an IAM Role (AWS CLI)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-cli.html)

### Switching to an IAM Role (AWS API)

* When calling the `AssumeRole` API, you can pass in a JSON `Policy` or up to 10 ARNs for pre-defined policies (using `PolicyArns`). The session that is returned will then have the *intersection* of the permissions of the role being assumed and the provided policies (so these can be thought of as additional limits). This mostly seems to be for when credentials need to be handed off to another user or service.

REFERENCES:

* [Switching to an IAM Role (AWS API)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-api.html)

### Using an IAM Role to Grant Permissions to Applications Running on Amazon EC2 Instances

* Applications that run on an EC2 instance automatically inherit the role assigned to that instance.
* The role assigned to an EC2 instance is defined in the “instance profile”.
* EC2 is just a service, so the requirements for EC2 instances to use roles (and for developers to assign roles to EC2 instances) are identical to those for a user who wishes to pass a role to a (generic) service.
* That said, allowing an EC2 instance to use a role as part of its “instance profile” does require that the role assigned to the “instance profile” *also* has a trust policy specifying that EC2 is allowed to call `sts:AssumeRole`.

REFERENCES:

* [Using an IAM Role to Grant Permissions to Applications Running on Amazon EC2 Instances](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

### Using Instance Profiles

* Instance profiles and roles are linked in the management console; instance profiles will be automatically created and deleted as needed, and are never directly exposed.
* Instance profiles created using the API can also be managed in the console *if and only if* they have they same name as they associated role.
* Tags can *only* be added to instance profiles using the API.
* Changes to instance profiles are not applied instantly, but are rather subject to *eventual consistency*.

REFERENCES:

* [Using Instance Profiles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html)

### Revoking IAM Role Temporary Security Credentials

* Temporary credentials associated with a role can be revoked before a given point in time. They *cannot* be revoked per-user.
* Revocation is handled by attaching an inline policy to the role that denies all actions before the specified point in time (“now”).
* The inline policy will be refreshed automatically with a new point in time denial timestamp if sessions are revoked again at a later time.
* AWS CLI users who have their credentials revoked in this way will either need to wait until their session would have expired (which could be up the 12 hours, depending on the role configuration) or manually delete the AWS CLI credential cache (`~/.aws/cli/cache`).

REFERENCES:

* [Revoking IAM Role Temporary Security Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html)

<!--

## AWS CloudFormation Tutorial

(Watch + set up a stack.)

REFERENCES:

* [AWS CloudFormation Tutorial (YouTube)](https://youtu.be/LDSMIvUuFOE)

## Amazon EC2: Auto Scaling

REFERENCES:

* [Amazon EC2: Auto Scaling](https://medium.com/tensult/amazon-ec2-auto-scaling-884ea50d2d)

## Capacity Management Made Easy with Amazon EC2 Auto Scaling

REFERENCES:

* [AWS re:Invent 2018: Capacity Management Made Easy with Amazon EC2 Auto Scaling (YouTube)](https://youtu.be/PideBMIcwBQ)

## AWS Cloud Practitioner Essentials

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

### Introduction to Amazon Web Services

### Compute in the Cloud

### Global Infrastructure and Reliability

### Networking

### Storage and Databases

### Security

### Monitoring and Analytics

### Pricing and Support

### Migration and Innovation

### The Cloud Journey

### AWS Certified Cloud Practitioner Basics

### Course Final Assessment

## Amazon VPC: Security at the Speed of Light

REFERENCES:

* [AWS re:Invent 2018: Amazon VPC — Security at the Speed of Light (YouTube)](https://youtu.be/uhXalpNzPU4)

## Amazon API Gateway

REFERENCES:

* [Amazon API Gateway: Developer Guide](https://aws.amazon.com/api-gateway/getting-started/)

## AWS IAM Policies in a Nutshell

REFERENCES:

* [AWS IAM Policies in a Nutshell](https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/)

## DNS Demystified: Amazon Route 53

REFERENCES:

* [AWS re:Invent 2016: DNS Demystified — Amazon Route 53 (YouTube)](https://youtu.be/UP7wDBjZ37o)

## Deep Dive on New Amazon EC2 Instances and Virtualization Technologies

REFERENCES:

* [Deep Dive on New Amazon EC2 Instances and Virtualization Technologies (YouTube)](https://youtu.be/AAq-DDbFiIE)

## Another Day, Another Billion Packets

REFERENCES:

* [AWS re:Invent 2015: Another Day, Another Billion Packets (YouTube)](https://youtu.be/R-n4dDGfQd4)

## A Serverless Journey: AWS Lambda Under the Hood

REFERENCES:

* [AWS re:Invent 2018: A Serverless Journey — AWS Lambda Under the Hood (YouTube)](https://youtu.be/3qln2u1Vr2E)

## AWS IAM Privilege Escalation: Methods and Mitigation

REFERENCES:

* [AWS IAM Privilege Escalation — Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)

## AWS KMS Cryptographic Details

REFERENCES:

* [AWS KMS Cryptographic Details](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

## AWS Well-Architected Framework

REFERENCES:

* [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

## AWS Networking Example

REFERENCES:

* [AWS — Networking Example](https://ardsec.blogspot.com/2018/09/networking-in-aws.html)

## AWS Developer Tools

REFERENCES:

* [AWS — Developer Tools](https://ardsec.blogspot.com/2018/09/devops-in-aws.html)

## Signature Version 4 Signing Process

REFERENCES:

* [Signature Version 4 signing process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html)

## Introduction to the AWS CLI

REFERENCES:

* [AWS re:Invent 2017: Introduction to the AWS CLI (YouTube)](https://youtu.be/QdzV04T_kec)

-->

<!-- (Walk through Learning Path 2 on the internal wiki.) -->

<!--

## AWS Compute Services

REFERENCES:

* [AWS — Compute Services](https://ardsec.blogspot.com/2019/05/aws-compute-services.html)

## AWS Container Services

REFERENCES:

* [AWS — Container Services](https://ardsec.blogspot.com/2019/05/aws-compute-container-services.html)

## AWS Storage Services

REFERENCES:

* [AWS — Storage Services](https://ardsec.blogspot.com/2019/05/aws-storage-services.html)

## AWS Database Services

REFERENCES:

* [AWS — Database Services](https://ardsec.blogspot.com/2019/05/aws-database-services.html)

## AWS Migration Services

REFERENCES:

* [AWS — Migration Services](https://ardsec.blogspot.com/2019/05/aws-migration-service.html)

## AWS Networking Services

REFERENCES:

* [AWS — Networking Services](https://ardsec.blogspot.com/2019/05/aws-networking-services.html)

## AWS Security, Identity, and Compliance

REFERENCES:

* [AWS — Security, Identity, and Compliance](https://ardsec.blogspot.com/2019/06/aws-security-identity-and-compliance.html)

## PortSwigger Web Security Academy

(There are 210 total labs. I should try to do them all.)

(Maybe I should just get the Burp Suite Certified Practitioner at this point? See: <https://portswigger.net/web-security/certification>.)

REFERENCES:

* [PortSwigger: Web Security Academy](https://portswigger.net/web-security/learning-path)

### SQL Injection

### Authentication

### Directory Traversal

### Command Injection

### Business Logic Vulnerabilities

### Information Disclosure

### Access Control

### File Upload Vulnerabilities

### Server-Side Request Forgery (SSRF)

### XXE Injection

### Cross-Site Scripting (XSS)

### Cross-Site Request Forgery (CSRF)

### Cross-Origin Resource Sharing (CORS)

### Clickjacking

### DOM-Based Vulnerabilites

### WebSockets

### Insecure Deserialization

### Server-Side Template Injection

### Web Cache Poisoning

### HTTP Host Header Attacks

### HTTP Request Smuggling

### OAuth Authentication

-->

<!-- Finish up the TryHackMe: Jr. Penetration Tester “Supplements” -->

<!-- Resume my normally planned learning path. -->
