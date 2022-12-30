# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-29

I'm *finally* done reading about Amazon's API Gateway. Now on to reading about the AWS Key Management Service (KMS)!

# AWS KMS Cryptographic Details

## Introduction

The KMS HSMs are all FIPS 140-2 validated

* [Introduction to the Cryptographic Details of AWS KMS](https://docs.aws.amazon.com/kms/latest/cryptographic-details/intro.html)

### Basic Concepts

There are three types of KMS keys:

* *Customer managed keys* are fully controlled by a given AWS account.
* *AWS managed keys* are controlled by AWS but still live within an AWS account. My impression is that these keys are generally automatically created when a service is configured to provide encryption services; I'm guessing that things like S3 bucket encryption keys fall into this category.
* *AWS owned keys* are internal keys used by AWS. They are *not* associated with customer accounts and do not show up in logs (unlike the other two key types).

Keys can have both permissions (IAM resource policies) and *grants*, which are delegated permissions *not* managed by IAM. Grants are used to allow services to perform encryption operations asynchronously on behalf of a given principal.

The ciphertext produced by AWS KMS contains not only the encrypted data, but also the identifier for the KMS key to use for decryption. Interestingly, it seems that KMS is limited to encrypting only 4 KB of data at a time. (This makes me wonder how things like S3 encryption work. Is data being chunked before encryption? Or does S3 do its own encryption and decryption using a key that's protected with KMS?)

KMS ciphertext can optionally depend on "context" information passed in at during initial encryption. This context is *not* returned with the ciphertext, but the ciphertext *cannot* be decrypted without it. (This makes me think that the context is used as part of the encryption key in some way.) It's worth noting that context should *not* be sensitive information, as it *will* be logged.

When used with asymmetric encryption, only the private part of the key pair is managed by the HSMs (which makes sense, if you think of how public keys are derived and used).

* [Basic concepts](https://docs.aws.amazon.com/kms/latest/cryptographic-details/basic-concepts.html)

### AWS KMS Design Goals

Internal administrative actions on HSMs (all?) use quorum-based access control mechanisms.

* [AWS KMS design goals](https://docs.aws.amazon.com/kms/latest/cryptographic-details/design-goals.html)

## AWS Key Management Service Foundations

* [AWS Key Management Service foundations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/foundation.html)

### Cryptographic Primitives

Symmetric encryption is currently handled using AES-GCM with 256-bit keys. The initial symmetric encryption key is never directly used (if I understand this section correctly); rather a new key is derived from this master key for each encryption call.

Asymmetric encryption uses RSA or ECC keys and supports a variety of key lengths (for RSA) or curves (for ECC).

It sounds like encryption context information may be included when a hash is generated to verify the integrity of the encrypted information. In which case it's not so much that failure to include the proper context will result in a decryption failure as it will result in a *verification* failure (and presumably the HSM just doesn't return plaintext that fails verification).

All intra-KMS communications are verified using ECDSA signatures.

* [Cryptographic primitives](https://docs.aws.amazon.com/kms/latest/cryptographic-details/crypto-primitives.html)

### AWS KMS Key Hierarchy

AWS KMS basically work a bit like a hierarchical deterministic wallet - there's some central "domain key" that's stored on the HSM, and then an (encrypted) "HSM backing key" (HBK) is derived and exported from it. Key "rotation" consists of deriving a new HBK. While KMS ARNs point to the domain key, they functionally reference the current HBK for new encryption operations and whichever HBK was used to encrypt a given ciphertext for decryption operations.

Additional customer data keys (CDKs) can in turn be derived from the currently active HBK. Unlike HBKs, CDKs can be exported as plaintext (though the default still appears to be ciphertext).

Decrypting information requires that both the ciphertext and corresponding HBK (or CDK, presumably if its returned as ciphertext) be passed back to the HSM; this is essentially envelope encryption where the encrypted key material has been separated from the corresponding ciphertext and is kept within the KMS system.

Apparently domain keys are rotated daily-to-weekly. I assume this means that all HBKs need to be re-encrypted on this frequency as well?

* [AWS KMS key hierarchy](https://docs.aws.amazon.com/kms/latest/cryptographic-details/key-hierarchy.html)
* [BIP 32: Hierarchical Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
* [BIP 39: Mnemonic Code for Generating Deterministic Keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
* [BIP 44: Multi-Account Hierarchy for Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

## AWS KMS Use Cases

* [Use cases](https://docs.aws.amazon.com/kms/latest/cryptographic-details/use-cases.html)

### Amazon EBS Volume Encryption

EBS volumes work via a KMS grant that allows for the generation and on-demand decryption of volume keys. (I assume that these are a species of CDK?) Volume keys are stored in encrypted for along with the EBS volume, and then passed back to KMS for decryption at mount time.

EBS seems to work similarly to LUKS and similar systems, in that the decrypted volume key is held in the memory of the EC2 instance using the volume as long as that volume is mounted.

* [Amazon EBS volume encryption](https://docs.aws.amazon.com/kms/latest/cryptographic-details/ebs-volume-encryption.html)

### Client-Side Encryption

The AWS Encryption SDK provides hooks for envelope encryption, where the "long term" key for decrypting the message key is held in KMS.

* [Client-side encryption](https://docs.aws.amazon.com/kms/latest/cryptographic-details/client-side-encryption.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2023-01-02

# AWS KMS Cryptographic Details

## Working with AWS KMS Keys

==xxx==

* [Working with AWS KMS keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-keys.html)

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