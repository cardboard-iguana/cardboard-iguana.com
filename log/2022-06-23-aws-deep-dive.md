# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-06-23

## Deep Dive on Amazon S3 Security and Management

### S3 Access Control Mechanisms

By default, S3 buckets are only accessible by the owner

Available access control mechanism:

* IAM — Best when dealing with internal Amazon users/systems. Controls access from the *user’s* perspective.
* S3 Bucket Policy — Uses the same JSON structure as IAM. Controls access from the *bucket’s* perspective. Need to be used for cross-account authentication.
* S3 ACLs — XML-based. Can only *add* access. “Full Control” is used for cross-account access.
* VPC Endpoints — Use a VPC endpoint as a proxy, and then restrict access using VPC policies. Allows bucket *content* to be exposed externally without exposing the entire bucket.
* Pre-Signed URLs — Basically, special URLs that can perform pre-defined actions. *Anyone who can access this URL can perform these actions.*

IAM *authentication* is handled by the account itself, but *authorization* is handled on a service-by-service basis.

### S3 Block Public Access

This is a set of security controls that blocks unrestricted (“public”) non-cross-account access, overriding (depending on the use case) existing permissions. There are four controls, each of which can be applied separately:

* *Block* new public ACLs and objects
* *Remove* existing public access granted by ACLS
* *Block* all new public bucket policies
* Block public *and* cross-account access to public buckets

The last of these is intended to be an intermediate state allowing a bucket to be temporarily locked down while public policies are removed or restricted.

These four policies can be applied in any combination at either the account (which applies to all buckets) or per-bucket level. When applied at the account level, new buckets will automatically inherit these policies. (Note that when new buckets are created on the console these settings are all selected by default, even if these policies have *not* been applied. These can be thought of as “safe defaults”. *However*, if the policies are not applied at the account level, then buckets created via the API will *not* be protected by default!)

### How S3 Authorizes a Request

When S3 is checking authorization, it rolls up all applicable policies and then considers them as a single “master” policy. There are (conceptually) three stages to this check:

* User context (has the user been granted explicit access).
* Bucket context (has the bucket owner granted the user authorization to perform a particular action).
* Object context (does the object ACL grant access).

S3 starts by checking for an *explicit* deny, and if one exists evaluation stops and the action is denied. A check is then made for an explicit *allow*, and if one exists evaluation stops and the action is allowed. If neither an explicit deny or allow are found, then the action/user is *implicitly* denied.

Interestingly, by default bucket ownership does *not* grant object ownership. So in a cross-account situation, objects uploaded by one account to a bucket owned by another account are *not* readable by the bucket owner unless an ACL exists for the object providing that permission. Object-level permissions *cannot* be changed at the bucket level. (To allow other bucket users to view uploaded objects, either the object owner must either add the users to the object ACL or add a role controlled by the bucket owner that other users can assume.)

### S3 Encryption

Encryption keys can be managed directly in S3, via AWS KMS, using client-managed keys, or entirely client-side.

It sounds like encryption is done using symmetric keys, at least in the KMS case. However, the key itself is encrypted by KMS. The encrypted key is then stored alongside the encrypted object, and handed back to KMS for decryption when the object is retrieved (this creates an additional layer of authorization, as KMS is *also* checking to see if decryption operations are authorized). I think the idea here is to enable per-object keys but still use a single “source of truth” for decryption authorization.

### Use Cases

It turns out that Capitol One wrote a similar anti-ACL policy before AWS introduced the security features discussed above. One trick they used was to add an explicit “deny all” with the condition that the user was *not* within Capitol One’s AWS organization.

A good use case here for when to use AssumeRole, but it’s kind of reverse what Amazon was describing: Capitol One’s high-security systems will do an AssumeRole to push lower security data into a segmented low-security system. Doing that means that data being placed into low-security S3 buckets is put there *by the low-security account* (whose role the high-security account has assumed). This allows the low-security account to then manage access to that data without the high-security account ever needing to interact with or know about downstream object consumers. This also gets Capitol One out of having to manage ACLs *entirely*.

### References

* [AWS re:Invent 2018: Deep Dive on Amazon S3 Security and Management (YouTube)](https://youtu.be/x25FSsXrBqU)

## Become an IAM Policy Master in 60 Minutes or Less

### IAM Policy Language

Basic IAM policy structure: “PARC” — Principal, Action, Resource, Condition. This is all led by an initial “effect”, which is allow/deny.

* Principal — the entity with is allowed/denied access.
* Action — the type of access being allowed/denied.
* Resource — what the action is working on.
* Condition — *when* should the policy be enforced.

I’m guessing that the “default” condition is `*`, since I’ve seen IAM policies without conditions.

A non-standard way to think about policy evaluation: It’s all about matching. (Does the incoming policy, which may include AWS-populated data, match a policy defined by the account? If so, then execute that policy, deny before allow. If not, then just deny.)

### Policy Types & Interactions

It sounds like AWS Organizations are basically just another policy layer on top of (and overriding?) regular accounts. In particular, these policies seem to be more geared towards controlling access to entire services (can a particular account even *use* S3 or EC2) more than user- or role-level permissioning. These “service control policies” are default deny, just like everything else in AWS, but all new accounts/organizations are provisioned with an explicit “allow everything” service control policy initially.

IAM has the concept of a “permission boundary”, which are defined *maximum* permission sets *within* an account.

”STS” in AWS stands for “Security Token Service”.

In general, you need an IAM policy *or* a resource-based policy to access something within an account. For cross-account access *both* the IAM and resource-based policies must be present and aligned.

### Policy Use Cases

The recommendation here when using service control policies at the organization level is to blacklist, rather than whitelist, things. That’s kind of reverse from the normal way of doing things, and seems to mostly be motivated by the sheer number of services (and the growth rate of that number) that AWS supports.

When scoping service control policies by region, note that a handful of services (and actions within some otherwise normal services) that are *globally* scoped. That means that *denying* a region will not always have the effect you want! (I assume this means we should deny globally and then allow in specific regions in this case, opposite of the previous advice.)

You can do some cool things with IAM and service control policies, like *requiring* that developer-created roles include a permission boundary or region.

Policies actually support some limited variables: For example, `${aws:PrincipalTag/project}` let’s you reference user (“principal”) tags within a policy condition. This lets you, for example, require that developers always tag resources they create with a pre-assigned (role?) tag (you can also restrict the ability of developers to *control* resources that don’t share their tag). This sort of generality comes in handy if you have a lot of teams that have the *same* permission structure but need to be siloed from each other — write *one* policy (or set of policies), and then tag the associated users/groups/roles to apply that policy in an *identical but disjoint* fashion.

### References

* [AWS re:Invent 2018: Become an IAM Policy Master in 60 Minutes or Less (YouTube)](https://youtu.be/YQsK4MtsELU)

<!--

## Amazon S3: Bucket Policies and User Policies

(Step through this as an exercise.)

REFERENCES:

* [Amazon Simple Storage Service (S3) — Bucket policies and user policies: Bucket owner granting cross-account bucket permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example2.html)

## AWS IAM: Granting a User Permissions to Switch Roles

REFERENCES:

* [AWS Identity and Access Management — User Guide: Granting a user permissions to switch roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html)

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
