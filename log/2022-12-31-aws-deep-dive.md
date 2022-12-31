# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-12-31

# AWS KMS Cryptographic Details

## Working with AWS KMS Keys

* [Working with AWS KMS keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-keys.html)

### Calling CreateKey

By default, KMS creates symmetric keys.

Interestingly, ARNs are generated *before* key material is requested from the HSM. I'd naively expect that an ARN would only be created *after* successful HBK generation.

* [Calling CreateKey](https://docs.aws.amazon.com/kms/latest/cryptographic-details/create-key.html)

### Importing Key Material

KMS only supports the import of 256-bit symmetric keys. This *cannot* be uploaded as plain text, but must instead be pre-encrypted using a public key provided by KMS as part of the import sequence.

Unlike HBKs (which are retained after expiration to enable the decryption of older ciphertexts), imported key material is *deleted* upon expiration.

* [Importing key material](https://docs.aws.amazon.com/kms/latest/cryptographic-details/importing-key-material.html)

### Deleting Keys

KMS keys can be deleted; there's by default a 7-day "grace period" before deletion during which the key is disabled before deletion... It's not clear if key deletion can be canceled during this window, however.

* [Deleting keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/key-deletion.html)

### Rotating Key Material

KMS provides a `ReEncrypt()` API to re-encrypt ciphertext that was encrypted using a previous HBK with the current HBK (via the HSM, ensuring that plaintext is never exposed). However, this API is a manual call - ciphertext is *not* re-encrypted to new HBKs on key rotation (for obvious reasons, if you think about how diverse the AWS infrastructure is).

* [Rotating key material](https://docs.aws.amazon.com/kms/latest/cryptographic-details/rotate-customer-master-key.html)

## Customer Data Operations

Encrypted data is basically clear text metadata + ciphertext + an integrity mechanism (I assume a signature of the concatenation of both parts?).

* [Customer data operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/customer-data-operations.html)

### Encrypt

Okay, so the 4 KB limit is only for "direct" calls to KMS - apparently the AWS Encryption SDK allows larger blobs to be encrypted. I'm still curious if this is via some kind of semi-private API, or if instead larger blobs are chunked into 4 KB segments and then stored as some kind of ordered data structure.

* [Encrypt](https://docs.aws.amazon.com/kms/latest/cryptographic-details/encrypt-operation.html)

### Decrypt

Apparently, services identify themselves to KMS when using a grant by providing some kind of token related to this grant. I'm going to guess that these tokens must include some kind of time-based signature in order to protect them against being used if leaked?

The only "authentication" that the returned plaintext is authentic is that it includes a key ID that should match the key that was used to encrypt the original ciphertext. Seems... Like not a very strong way of authenticating the returned plaintext?

* [Decrypt](https://docs.aws.amazon.com/kms/latest/cryptographic-details/decrypt-operation.html)

### Re-Encrypting an Encrypted Object

The `ReEncrypt()` API is actually pretty general - it can be used to re-encrypt a ciphertext using the current HBK of the original KMS key, the current HBK of a *different* KMS key, or change the encryption context (which is done in conjunction with one of the two previous operations).

Again, the only authentication that the returned ciphertext is authentic is the key ID used in the original ciphertext.

* [Reencrypting an encrypted object](https://docs.aws.amazon.com/kms/latest/cryptographic-details/reencrypting-an-encrypted-object.html)

## AWS KMS Internal Operations

* [AWS KMS internal operations](https://docs.aws.amazon.com/kms/latest/cryptographic-details/kms-internals.html)

### Domains and Domain State

HSMs and associated keys and *internal* services/operators are grouped into logical domains. HSMs do *not* communicate with each other, even to synchronize domain keys. Instead, a quorum of operators requests an updated domain state from one HSM and then distributes that updates (and authenticated) domain state to all HSMs in the domain. Importantly, the HSM generating the new domain state does *not* update its own state when generating a new domain state; rather, it only updates state when it receives back the authenticated updated domain state that it previously generated.

In practice, the operators don't communicate with the HSMs directly; rather, commands are requested and distributed through a (dedicated?) service host within the KMS domain.

It sounds like HSMs always retain the current and previous domain key upon domain key rotation; the previous retained domain key is discarded during this process. (Again, I assume that HBKs must get re-encrypted immediately after domain key rotation, since only a limited number of previous domain keys are retained within the HSM memory.)

* [Domains and domain state](https://docs.aws.amazon.com/kms/latest/cryptographic-details/domains-and-domain-state.html)

### Internal Communication Security

Commands between a domain's service host and the associated HSMs are all envelope encrypted using a periodically renegotiated session key.

* [Internal communication security](https://docs.aws.amazon.com/kms/latest/cryptographic-details/internal-communication-security.html)

### Replication Process for Multi-Region Keys

Inter-region replication is similar to internal communication, except that dedicated "replication signing keys" are used. A proxy service is used to transmit data between the two (regional) KMS domains. (Presumably, the proxy talks to each domain's service host, rather than to the HSMs directly, though this isn't entirely clear from the documentation.)

* [Replication proces for multi-Region keys](https://docs.aws.amazon.com/kms/latest/cryptographic-details/replicate-key-details.html)

### Durability Protection

All KMS domains contain some number of offline HSMs that are part of the domain, but stored in a powered-down state in multiple locations. Access to the safes storing these HSMs requires at least one AWS security officer and one AWS KMS operator from *different* teams.

Presumably there must be some rotation between online and offline HSMs to ensure that offline HSM state doesn't become too "stale".

* [Durability protection](https://docs.aws.amazon.com/kms/latest/cryptographic-details/durability-protection.html)

<!--

# AWS Deep Dive

author:: Nathan Acks  
date:: 2023-01-02

# AWS Well-Architected Framework

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