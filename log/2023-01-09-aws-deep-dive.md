# AWS Deep Dive

* **author**:: Nathan Acks  
* **date**:: 2023-01-09

## AWS Well-Architected Framework

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Security](https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html)

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-bp.html)

###### [Security](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-security.html)

**Key question:** How do you securely operate your workload?

(Recall here that the Well-Architected Framework uses “workload” to mean “the collection of resources and processes that provides an atomic business function”.)

This section ends with the recommendation that each *workload* have a dedicated AWS account, which makes sense conceptually and is the first guidance I’ve seen regarding the recommended way to determine account boundaries.

###### [Identity and Access Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-iam.html)

Finally, a definition of “principal”!

**Principal:** Something that performs an *action* within an AWS account (e.g., accounts themselves, users, roles, and — in some cases — services).

**Key questions:**

* How do you manage identities for people and machines?
* How do you manage permissions for people and machines?

Identities are managed by things like logins, AWS access keys, IdPs, etc. Permissions are managed using roles and IAM policies (which might be attached to roles, or directly to users/machines).

###### [Detection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-detection.html)

**Key question:** How do you detect and investigate security events?

###### [Infrastructure Protection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-infrastructure.html)

**Key questions:**

* How do you protect your network resources?
* How do you protect your compute resources?

I knew that AMIs were used as images for EC2 instances, but apparently they’re also used in the Amazon Elastic Container Service and AWS Elastic Beanstalk.

###### [Data Protection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-dataprot.html)

**Key questions:**

* How do you classify your data?
* How do you protect your data at rest?
* How do you protect your data in transit?

###### [Incident Response](https://docs.aws.amazon.com/wellarchitected/latest/framework/sec-incresp.html)

Interesting idea: Using CloudFormation to spin up known-clean, isolated forensics environments. (That said, given that almost everything you deal with as an admin in AWS is virtualized and never accessed directly, there are real limits on how much you can do here. Still, this is useful, especially if/when the forensics investigation becomes a *legal* investigation…)

**Key question:** How do you anticipate, respond to, and recover from incidents?

I wonder if there’s a way to take memory snapshots of EC2 instances…?

#### [Reliability](https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html)

> The Reliability pillar encompasses the ability of a workload to perform its intended function correctly and consistently when it’s expected to. This includes the ability to operate and test the workload through its total lifecycle.

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-dp.html)

Amazon suggests monitoring KPIs that measure some aspect of *business value provided* by a service, rather than purely technical operational performance. Not 100% sure what I think of this — some aspects of technical performance are going to be important for providing business value, but are also not going to translate to that value in a straight-forward way.

There’s also an emphasis on *simulating workload failures* in this section. This is obviously a lot easier to do with turnkey infrastructure.

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-bp.html)

###### [Foundations](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-found.html)

**Key questions:**

* How do you manage service quotas and constraints?
* How do you plan your network topology?

These questions are of a set with the “Infrastructure Protection” questions above. However, rather than focusing on the security parameters of the architecture, these questions are about *capacity* and *structure*.

###### [Workload Architecture](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-workload-arch.html)

**Key questions:**

* How do you design your workload service architecture?
* How do you design interactions in a distributed system to prevent failures?
* How do you design interactions in a distributed system to mitigate or withstand failures?

These are all actually *hard* questions! Lots of trade-offs here, especially w.r.t. performance.

###### [Change management](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-chg-mgmt.html)

**Key questions:**

* How do you monitor workload resources?
* How do you design your workload to adapt to changes in demand?
* How do you implement change?

###### [Failure Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel-failmgmt.html)

**Key questions:**

* How do you back up data?
* How do you use fault isolation to protect your workload?
* How do you design your workload to withstand component failures?
* How do you test reliability?
* How do you plan for disaster recovery?

I’d be curious what the best practices for implementing fault isolation are. I assume the key is a redundant, modular design *within* workloads, and the prevention of cross-module dependencies.
