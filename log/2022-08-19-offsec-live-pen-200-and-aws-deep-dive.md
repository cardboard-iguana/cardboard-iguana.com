# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-19

Two things today: OffSec Live in the morning and finishing up the “AWS Cloud Practitioner Essentials” course in the evening

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)
* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## OffSec Live: PEN-200

### Linux Privilege Escalation

* Recommended privilege escalation resource (again): g0tm1lk’s Blog.
* To have `top` display only those processes owned by `root` with their full path, use `top -c -u root`.
* You can filter `top` using `o`. Filters specify the column, so for example `COMMAND=/bin/bash` will only show those processes that contain `/bin/bash` in their command line.
* When a Python module is imported, the contained `__init__.py` and any `__init__.py` files in parent directories are automatically executed.
* The default Python import path always looks in the current directory *first*. Note that the full path to imported modules can be specified on the command line, but *not* with the commonly-used `-m` flag!
* Reminder on how to find SUID binaries: `find / -perm -u=s -type f 2> /dev/null`
* Linux will still bypass `/etc/shadow` if there’s a password hash in the second field of `/etc/passwd` (instead of an `x`)! Generate an appropriate password hash using `openssl passwd $PASSWORD`.
* Also remember that multiple users with the same UID can be specified in `/etc/passwd`!

REFERENCES:

* [g0tm1lk’s Blog](https://blog.g0tmi1k.com/)

## AWS Cloud Practitioner Essentials

### The AWS Well-Architected Framework

* OPERATIONAL EXCELLENCE — Actual, well, operations work, with a focus on those aspects that most directly impact the organizational mission.
* SECURITY — mostly focused on encryption.
* RELIABILITY — backups, redundancy, and scaling.
* PERFORMANCE EFFICIENCY — architectural cost/performance optimization.
* COST OPTIMIZATION — similar to the above, but focused on cost optimization w.r.t. scaling.
* This isn’t just a written framework, but is now also embodied by a tool accessible through the AWS console (though this tool is still just a simple questionnaire, rather than an actual automated analysis of the current AWS account).

### Benefits of the AWS Cloud

* Trade fixed expenses for variable expenses.
* Benefit from massive economies of scale.
* Stop guessing capacity.
* Increase speed and agility.
* Stop spending money running and maintaining data centers.
* Go global in minutes.

### Course Final Assessment

* For S3 storage tiers, the “-IA” suffix stands for “Infrequent Access”.
* Elastic Beanstalk is a tool for automating and scaling (pre-packaged) applications.
* AWS Outposts is a tool for managing hybrid cloud environments.
* EC2 “savings plans” are discounts that apply when a customer commits to a certain amount of computer time, while “reserved instances” are basically pre-paid on-demand (normal) EC2 instances.
* EC2 “dedicated hosts” represent actual dedicated hardware (as opposed to VMs that may shift to different hardware when restarted).

<!--

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

-->

<!-- Finish up the TryHackMe: Jr. Penetration Tester “Supplements” -->

<!--

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

<!-- Resume my normally planned learning path. -->
