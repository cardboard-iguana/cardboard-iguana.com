# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-06-29

This entry was actually written over the course of most of the day, as the next session of Offensive Security’s free streaming “OffSec Live” class was in the morning and I worked on the “AWS Deep Drive” learning path in the evening.

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [OffSecOfficial Twitch Channel](https://www.twitch.tv/offsecofficial)

## OffSec Live: Basic Tools, Part 1

(Missed the first few minutes again…)

```bash
# Use netcat to connect to any port (like Telnet).
#
#     -n    Prevent DNS lookups (good to use with IP addresses, as
#           otherwise netcat will try to look these up!)
#     -v    Increase verbosity (connection status, etc.)
#
nc -nv $IP $PORT

# Use netcat to scan for open ports (slow, TCP-only).
#
#     -z    Try to connect to all TCP ports, and report which are open
#
nc -nzv $IP
```

The difference between a “reverse” and “bind” shell depends on where you’re working/observing from. A “reverse” shell is when you’re *receiving* the connection, while a “bind” shell is when you’re *initiating* a connection.

REFERENCES:

* [Using “netcat”](../notes/netcat.md)

## AWS CloudFormation Tutorial

As the first part of today’s ”AWS Deep Dive” I’ll be watching and taking notes on a video detailing how to set up a CloudFormation stack in AWS. I’ll follow this up by any additional notes about my experiences setting up my own version of the two demos.

### Video Notes

The idea behind CloudFormation is to manage the multiple services that are required to run an application in AWS. It’s the same idea as AMIs in EC2, except that CloudFormation templates snapshotting AWS *infrastructure* rather than just VMs. Once you have a CloudFormation template, you can use it to spin up identical copies of your infrastructure in multiple regions.

CloudFormation templates are defined as JSON or YAML blobs (normally configured using the AWS CloudFormation Designer).

Demos:

* Create an S3 bucket
* Create an EC2 instance with a LAMP stack (use the sample template)

Note that when you give a resource a name in CloudFormation, that resource *won’t* be created with that literal name (which would obviously be problematic for things like S3). Instead, resources will be spun up using the format `${STACK_NAME}-${RESOURCE_NAME}-${RANDOM_STRING}`.

Information that needs to be filled in during stack creation is specified by the `Parameters`.

The default EC2 SSH login is `ec2-user`; only private key logins are allowed.

REFERENCES:

* [AWS CloudFormation Tutorial (YouTube)](https://youtu.be/LDSMIvUuFOE)

### Demo Stack Setup Notes

* Note that the CloudFormation Designer does *not* work well in iOS browsers! (In particular, drag-and-drop is next-to-broken…)
* You *really* want to let CloudFormation control your bucket name, since names must be globally unique!
* If you want to edit the template name in the CloudFormation Designer, you need to be on the “Template” tab, *not* the “Components” tab (whose name refers to the currently selected resource).
* As far as I can tell, the random string appended to default CloudFormation names is always 12 lowercase alphanumeric characters.
* EC2 instances created by CloudFormation have names like `i-${RANDOM_HEX_NUMBER}`, where `$RANDOM_HEX_NUMBER` is always 17 (👀) digits.

## Capacity Management Made Easy with Amazon EC2 Auto Scaling

* There are three different methods of autoscaling in AWS: EC2 autoscaling, application autoscaling (EC2 Containers, Aurora, DynamoDB, and AppStream), and AWS autoscaling (which scales bundles of resources in AWS, rather than just single services).
* EC2 autoscaling works over a logical group of instances with a defined minimum and maximum number of instances. A variety of mechanisms can be used by the group to determine the “desired” number of instances (which is bound by the min and max) at a given time.
* The instances launched by EC2 autoscaling are determined by the associated launch template, which defines instance type, AMI, security groups, SSH keys, etc.
* While a launch template *can* auto-configure the launched EC2 instances, it’s more common for organizations to create a “golden image” that already has all of the required applications and as much configuration data as possible embedded within it. (Netflix uses this approach.)
* Puppet, Chef, and Ansible are also popular alternatives to the built-in launch template configuration capabilities.
* Launch templates can also be used to manage various lifecycle tasks, such as provisioning external IP addresses or archiving log files. This is generally done using Lambda functions that are fired at particular points in the instance lifecycle. (Alternately — or additionally! — launch templates can generate SNS notifications or CloudWatch events when certain lifecycle stages occur.) (Netflix uses lifecycle hooks to make sure that instances are quiescent before termination.)
* EC2 autoscaling integrates with both EC2 and Elastic Load Balancer health checks. Misbehaving instances will be automatically killed, and new instances started, as needed.
* EC2 autoscaling also understands availability zones, and can divide instances between zones automatically. If there are repeated failures in one zone, autoscaling can even automatically shift instances to alternate zones, and then rebalance instances once zone health has been restored. (Netflix uses this; every autoscaling group maintains instances across three availability zones.)
* EC2 autoscaling understands spot instances, and can be provided with target prices and group percentages for spot instances.
* How is the minimum, maximum, and desired number of instances for a group determined? There are four methods: Manual scaling (“by hand”), scheduled scaling, dynamic scaling (which uses target metrics to determine when to scale up or down), and finally predictive scaling (this is similar to dynamic scaling, but it looks at historic data and tries to *anticipate* when to scale up or down, rather than waiting for an “alarm” to be tripped).
* *Do not set your scale-up and scale-down thresholds to the same value!* Netflix has a story of a team doing this, and it caused the EC2 autoscaling service to continually churn instances.
* The general take-away from Netflix’s part of the presentation seems to be “just use dynamic scaling with a single target”. That target should be indicative of instance *capacity*, not overall service *usage*; in practice, this *generally* means scaling on CPU usage.

REFERENCES:

* [AWS re:Invent 2018: Capacity Management Made Easy with Amazon EC2 Auto Scaling (YouTube)](https://youtu.be/PideBMIcwBQ)

<!--

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
