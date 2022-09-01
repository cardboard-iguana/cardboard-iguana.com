# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-07-05

Today I'll be starting the ~6 hour "AWS Cloud Practitioner Essentials" course as I continue to dive deeper into AWS.

* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## Introduction to Amazon Web Services

Wait... AWS has per-minute satellite rental?!?

## Compute in the Cloud

Instance types:

* General Purpose
* Compute Optimized
* Memory Optimized
* Accelerated Computing
* Storage Optimized

"Accelerated computing" here means "*hardware* accelerated computing". So, high-end GPUs, cryptographic accelerators, custom AI/ML chips, etc.

"Storage optimized" instances aren't necessarily designed to support a lot of local storage (though the can, and often do, this), but are rather designed to support for high data throughput for that local storage.

### Pricing Options

On-Demand (the default model)

Savings Plan (commit to a certain numbers of *hours* of compute time; can include services like Lambda, and usage above the agreed-upon amount is charged at the regular rate)

Reserved Instances (commit to a certain number of *instances*)

Spot Instances (additional capacity purchased on the spot market; can be reclaimed by AWS with a 2 minute warning)

Dedicate Hosts (single-account hosts, mostly for high security/compliance workloads)

Both the "savings plan" and "reserved instances" offer similar savings, but over different metrics.

### Elastic Load Balancers

Elastic Load Balancing (ELB) handles both load balancing *between* regions (based on regional capacity and the proximity of a request to a particular region) and *within* regions (by distributing load uniformly between all instances in a region).

ELB doesn't just have to be client facing, however - it can also be used between the front-end and back-end systems in an architecture.

### Messaging and Queueing

Simple Queue Service (SQS) - Queue/Buffer messages from one service to another *within* AWS

Simple Notification Service (SNS) - Queue/Buffer messages from a service in AWS to another service that may be *inside of or outside of* AWS (and could be directly user-facing, like SMS or push notifications)

SQS is a pure machine-to-machine buffer, while SNS is based around a one-to-many pub/sub model.

### Additional Compute Services

Amazon's two container *management* services are ECS (Elastic Container Service) for Docker and EKS (Elastic Kubernetes Service) for Kubernetes. These must be paired with an underlying platform where the containers will actually run - either EC2 (for traditional containerization) or "Fargate" (which functions in a "serverless" fashion like Lambda).
