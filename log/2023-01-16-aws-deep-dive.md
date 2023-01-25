# AWS Deep Dive

* **author**:: Nathan Acks  
* **date**:: 2023-01-16

## AWS Well-Architected Framework

### [The Pillars of the Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)

#### [Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html)

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-dp.html)

It’s a little unclear to me how “performance efficiency” is different than “cost optimization”, as all of the efficiency pillars are basically about reducing head count or discrete infrastructure deployments.

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-bp.html)

###### [Selection](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-sel.html)

* How do you select the best performing architecture?
	* How do you select your compute solution?
	* How do you select your storage solution?
	* How do you select your database solution?
	* How do you configure your networking solution?

For compute, AWS options can be thought of as a hierarchy, with EC2 → ECS/EKS → Lambda, where each step simplifies deployment and maintenance needs at the expense of control over the application’s environment.

For storage, a similar hierarchy is probably EBS → EFS → S3, where each step behaves less-and-less like physical/local storage, but provides file access to more-and-more systems.

###### [Review](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-review.html)

* How do you evolve your workload to take advantage of new releases?

Basically, computing systems remain one place where trying to “keep up with the Joneses” is *not* a bad thing. The landscape changes fast, so it’s worth periodically re-evaluating the solution landscape.

###### [Monitoring](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-monitoring.html)

* How do you monitor your resources to ensure they are performing?

A good point in here about the need to periodically *test* any alarm/monitoring solution.

###### [Tradeoffs](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-tradeoffs.html)

* How do you use tradeoffs to improve performance?

#### [Cost Optimization](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html)

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-dp.html)

As best I can determine, the difference between “performance efficiency” and “cost optimization” is what metrics you’re monitoring…?

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-bp.html)

###### [Practice Cloud Financial Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-cfm.html)

* How do you implement cloud financial management?

Honestly, it’s not clear what this means outside of “make sure that incentives are aligned and people are using the tools at their disposal,” which is kind of a pedestrian observation.

###### [Expenditure and Usage Awareness](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-aware.html)

Again, this section seems somewhat pedestrian: “Make sure that costs are attributed internally and continuously monitor budgets.” This is very much something that *every* organization should be doing.

* How do you govern usage?
* How do you monitor usage and cost?
* How do you decomission resources?

Additional points here about tying costs to (team) objectives, and ensuring that infrastructure ownership includes end-of-life decommissioning. Again, this all seems a bit pedestrian.

Perhaps the big innovation that AWS brings here is that cost reporting and monitoring can be incredibly granular — think *hour-by-hour*.

###### [Cost-Effective Resources](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-cereso.html)

* How do you evaluate cost when you select services?
* How do you meet cost targets when you select resource type, size, and number?
* How do you use pricing models to reduce cost?
* How do you plan for data transfer charges?

(Note that it’s implied here that most — if not all — AWS services are wrappers around some combination of EC2, EBS, and S3. I suspect that this isn’t 100% the case, but it’s almost certainly true more often than not.)

Again, regular architectural reviews are important!

###### [Manage Demand and Supply Resources](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-mandem.html)

Shorter section: Asynchronous batch- and queue-based processing is good, and you should use it.

* How do you manage demand, and supply resources?

###### [Optimize Over Time](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-opti.html)

* How do you evaluate new services?

More importantly, are you periodically evaluating *your* existing services?

#### [Sustainability](https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html)

So, this is about environmental sustainability… Though surely isn’t energy and resource consumption implicitly integrated into service pricing?

##### [Design Principles](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-design-principles.html)

Unsurprisingly, less is generally more when it comes to computing — the fewer resources you utilize (instances, storage, transactions), *generally* the less your environmental impact. Unlike many *personal* usage decisions, however, there’s a benefit again to continually upgrading your infrastructure: Newer services, instance types, etc. are generally more resource-efficient than older implementations.

Really, most of this will be reflected in ordinary pricing. The only thing the sustainability options add is a potential bias towards upgrading more quickly, and a different/additional set of KPIs to track.

*Oh, and minimize the need to end-users to upgrade or use high-powered hardware.* It’d be nice if *more* companies thought of this bit.

##### [Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-bp.html)

###### [Region Selection](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-region-selection.html)

* How do you select regions to support your sustainability goals?

The gist here is to choose regions where energy is produced more sustainably, either because the grid in general is hooked into more sustainable energy sources, or because Amazon has built its own project. I wonder if this is listed in any obvious place when selecting a region to spin up a resource in from the AWS Console…

###### [User Behavior Patterns](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-user-behavior-patterns.html)

* How do you take advantage of user behavior patterns to support your sustainability goals?

That said, all the suggestions in this sections are also ones that can be made from a cost optimization or user experience perspective.

###### [Software and Architecture Patterns](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-software-architecture-patterns.html)

Once again: Batching and queuing is good (smooths out resource usage, and lets fewer resources operate at near higher utilization), requiring customers to upgrade their devices is bad. Also, continually re-analyze and re-optimize your infrastructure.

* How do you take advantage of software and architecture patterns to support your sustainability goals?

These are again all suggestions that could live in other sections — there’s not really anything *new* here, just additional justifications for existing best practices.

###### [Data Patterns](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-data-patterns.html)

* How do you take advantage of data access and usage patterns to support your sustainability goals?

Less data → more sustainable. To this I’d add “more secure” too (you can’t leak what you don’t have).

Also, slower data storage methods are generally more energy efficient, so offloading data to the slowest acceptable storage medium helps.

###### [Hardware Patterns](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-hardware-patterns.html)

* How do your hardware management and usage practices support your sustainability goals?

Interesting to note that specialized EC2 instances (for example, ML-optimized instances) are generally more energy efficient *for the given task* — not just faster — than general-purpose instances. Also, the further you operate down the EC → ECS/EKS → Lambda pipeline, the more AWS auto-optimizes and auto-upgrades back-end capacity to optimize for energy efficiency. (Of course, you also start to lose autonomy, especially with the ECS/EKS → Lambda shift…)

###### [Development and Deployment Patterns](https://docs.aws.amazon.com/wellarchitected/latest/framework/sus-development-deployment-patterns.html)

* How do your development and deployment processes support your sustainability goals?

Managed device farms for testing keeps coming up over the last few sections… I wonder if this is another AWS offering?

### [The Review Process](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-review-process.html)

> The review of architectures needs to be done in a consistent manner, with a blamefree approach that encourages diving deep. It should be a light weight process (hours not days) that is a conversation and not an audit.

🤔

Interesting terminology:

* **One-Way Doors:** Decisions that are difficult-to-impossible change.
* **Two-Way Doors:** Decisions that are easily reversible.

I tend to think of this personally as “keeping my options open”.

> Often, we find that reviews are the first time that a team truly understands what they have implemented.

!!!

Shorter section: Review early, review often.
