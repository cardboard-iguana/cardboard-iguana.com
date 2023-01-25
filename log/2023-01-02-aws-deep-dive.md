# AWS Deep Dive

* **author**:: Nathan Acks  
* **date**:: 2023-01-02

## AWS Well-Architected Framework

### [Introduction](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

#### [Definitions](https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html)

The Well-Architected Framework uses somewhat eccentric definitions of "component" (mostly normal) and "workload" (not really normal). In the Well-Architected Framework, a **component** is a unit of *something* (code, application configuration, S3 bucket, etc.) that meets some atomic requirement. A **workload** is then a collection of components that performs a distinct business function (this is in contrast to the more usual understanding of the term "workload", which would be something like "system resources consumed when performing an operation of some sort").

**Architectures** and **technology portfolios** are then understood as collections of "workloads" within the Well-Architected Framework.

> Security and operational excellence are generally not traded-off against the other pillars.

I suppose that quote pretty clearly contextualizes the Well-Architected Framework as more *aspirational* than anything else.

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html)

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-design-principles.html)

Basically:

* Infrastructure as code
* Modular infrastructure
* Regular performance analysis
* Tabletop exercises
* Post-motems

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-bp.html)

###### [Organization](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-organization.html)

It's not called this, but the directive that each components, processes, etc. must have a "single wringable neck" associated with it makes an oblique appearance in the AWS "organizational" best practices for "operational excellence".

Key questions:

* How do you determine what your priorities are?
* How do you structure your organization to support your business outcomes?
* How does your organizational culture support your business outcomes?

This document really is full of zingers:

> Recognize that an undesired result is a successful experiment that has identified a path that will not lead to success.

###### [Prepare](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-prepare.html)

Key questions:

* How do you design your workload so that you can understand its state?
* How do you reduce defects, ease remediation, and improve flow into production?
* How do you mitigate deployment risks?
* How do you know that you are ready to support a workload?

So, explainability, modularity, reversibility.

###### [Operate](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-operate.html)

Key questions:

* How do you understand the health of your workload?
* How do you understand the health of your operations?
* How do you manage workload and operations events?

So, logging and playbooks.

###### [Evolve](https://docs.aws.amazon.com/wellarchitected/latest/framework/oe-evolve.html)

Key question:

* How do you evolve operations?
