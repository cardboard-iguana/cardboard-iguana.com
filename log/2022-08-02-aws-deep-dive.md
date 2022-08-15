# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-02

Today I’ll be covering the “Security” module of the “AWS Cloud Practitioner Essentials” course.

REFERENCES:

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## Shared Responsibility

A good way of describing the shared security model:

> AWS is responsible for security *of* the cloud, while customers are responsible for security *in* the cloud.
> 
> — Rudy Chetty, “AWS Cloud Practitioner Essentials”

Apparently, “AWS phone support scams” are a thing.

## User Permissions

Only the permissions for a single role are in effect at any one time.

## AWS Organizations

AWS accounts are commonly used to provide hard(er) permission boundaries between teams and application functions.

”Organizations“ provides a “meta account” feature (called the “root” account) that can centralize billing and enforce features *within* the member accounts.

Within organizations, accounts can be grouped using an OU model.

Permissions are enforced using “service control policies (SCPs), which enable/disable services/APIs and can set permission ceilings. SCPs can be applied to individual accounts or to entire OUs.

Note that SCPs do *not* apply directly to IAM objects. Instead, think of them as providing limits that those IAM objects (and the account’s root user!) must operate within.

## Compliance

AWS compliance reports and agreements are consolidated into a single portal, called “Artifact”.

## DDoS Attacks

DDoS mitigations in AWS:

| Attack                        | Mitigation            |
|:----------------------------- |:--------------------- |
| UDP Flood, Reflection Attacks | Security Groups       |
| Slowloris                     | Elastic Load Balancer |
| Targeted Attacks              | AWS Shield / WAF      |

## Additional Security Services

AWS Inspector is a service that can audit an AWS account configuration and report on deviations from baseline best practices.

GuardDuty is an AWS-centric threat hunting solution (sounds a bit like a SIEM). GuardDuty can be hooked into AWS Lambda to automate response based on the signals it detects.