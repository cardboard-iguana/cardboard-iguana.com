# AWS Deep Dive

**author**:: Nathan Acks  
**date**:: 2023-01-16

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

<!--

# AWS Deep Dive

**author**:: Nathan Acks  
**date**:: 2023-01-17

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Organization](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-organization.html)

###### [Evaluate External Customer Needs](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_priorities_ext_cust_needs.html)

==xxx==

###### Evaluate Internal Customer Needs

###### Evaluate Governance Requirements

###### Evaluate Compliance Requirements

###### Evaluate Tradeoffs

###### Manage Benefits and Risks

###### Resources Have Identified Owners

###### Processes and Procedures Have Identified Owners

###### Operations Activities Have Identified Owners Responsible for Their Performance

###### Team Members Know What They Are Responsible For

###### Mechanisms Exist to Identify Responsibility and Ownership

###### Mechanisms Exist to Request Additions, Changes, and Exceptions

###### Responsibilities Between Teams are Predefined or Negotiated

###### Executive Sponsorship

###### Team Members are Empowered to Take Action When Outcomes are at Risk

###### Escalation is Encouraged

###### Communications are Timely, Clear, and Actionable

###### Experimentation is Encouraged

###### Team Members are Enabled and Encouraged to Maintain and Grow Their Skill Sets

###### Resource Teams Appropriately

###### Diverse Opinions are Encouraged and Sought Within and Across Teams

##### Prepare

###### Implement Application Telemetry

###### Implement and Configure Workload Telemetry

###### Implement User Activity Telemetry

###### Implement Dependency Telemetry

###### Implement Transaction Traceability

###### User Version Control

###### Test and Validate Changes

###### Use Configuration Management Systems

###### Use Build and Deployment Management Systems

###### Perform Patch Management

###### Share Design Standards

###### Implement Practices to Improve Code Quality

###### Use Multiple Environments

###### Make Frequent, Small, Reversible Changes

###### Fully Automate Integration and Deployment

###### Plan for Unsuccessful Changes

###### Test and Validate Changes

###### Use Deployment Management Systems

###### Test Using Limited Deployments

###### Deploy Using Parallel Environments

###### Deploy Frequent, Small, Reversible Changes

###### Fully Automate Integration and Deployment

###### Automate Testing and Rollback

###### Ensure Personnel Capability

###### Ensure a Consistent Review of Operational Readiness

###### Use Runbooks to Perform Procedures

###### Use Playbooks to Investigate Issues

###### Make Informed Decisions to Deploy Systems and Changes

##### Operate

###### Identify Key Performance Indicators

###### Define Workload Metrics

###### Collect and Analyze Workload Metrics

###### Establish Workload Metrics Baselines

###### Learn Expected Patterns of Activity for Workload

###### Alert When Workload Outcomes are at Risk

###### Alert When Workload Anomalies are Detected

###### Validate the Achievement of Outcomes and the Effectiveness of KPIs and Metrics

###### Identify Key Performance Indicators

###### Define Operations Metrics

###### Collect and Analyze Operations Metrics

###### Establish Operation Metrics Baselines

###### Learn the Expected Patterns of Activity for Operations

###### Alert When Operations Outcomes are at Risk

###### Alert When Operations Anomalies are Detected

###### Validate the Achievement of Outcomes and the Effectiveness of KPIs and Metrics

###### Use a Process for Event, Incident, and Problem Management

###### Have a Process per Alert

###### Prioritize Operational Events Based on Business Impact

###### Define Escalation Paths

###### Enable Push Notifications

###### Communicate Status Through Dashboards

###### Automate Responses to Events

##### Evolve

###### Have a Process for Continuous Improvement

###### Perform Post-Incident Analysis

###### Implement Feedback Loops

###### Perform Knowledge Management

###### Define Drivers for Improvement

###### Validate Insights

###### Perform Operations Metrics Reviews

###### Document and Share Lessons Learned

###### Allocate Time to Make Improvements

#### Security

##### Security Foundations

###### Separate Workloads Using Accounts

###### Secure AWS Account

###### Identify and Validate Control Objectives

###### Keep Up-to-Date With Security Threats

###### Keep Up-to-Date With Security Recommendations

###### Automate Testing and Validation of Security Controls in Pipelines

###### Identify and Prioritize Risks Using a Threat Model

###### Evaluate and Implement New Security Services and Features Regularly

##### Identity and Access Management

###### Use Strong Sign-In Mechanisms

###### Use Temporary Credentials

###### Store and Use Secrets Securely

###### Rely on a Centralized Identity Provider

###### Audit and Rotate Credentials Periodically

###### Leverage User Groups and Attributes

###### Define Access Requirements

###### Grant Least Privilege Access

###### Establish Emergency Access Process

###### Reduce Permissions Continuously

###### Define Permission Guardrails for Your Organization

###### Manage Access Based on Lifecycle

###### Analyze Public and Cross-Account Access

###### Share Resources Securely

##### Detection

######  Configure Service and Application Logging

###### Analyze Logs, Findings, and Metrics Centrally

###### Automate Response to Events

###### Implement Actionable Security Events

##### Infrastructure Protection

###### Create Network Layers

###### Control Traffic at All Layers

###### Automate Network Protection

###### Implement Inspection and Protection

###### Perform Vulnerability Management

###### Reduce Attack Surface

###### Implement Managed Services

###### Automate Compute Protection

###### Enable People to Perform Actions at a Distance

###### Validate Software Integrity

##### Data Protection

###### Identify the Data Within Your Workload

###### Define Data Protection Controls

###### Automate Identification and Classification

###### Define Data Lifecycle Management

###### Implement Secure Key Management

###### Enforce Encryption at Rest

###### Automate Data at Rest Protection

###### Enforce Access Control

###### Use Mechanisms to Keep people Away From Data

###### Implement Secure Key and Certificate Management

###### Enforce Encryption in Transit

###### Automate Detection of Unintended Data Access

###### Authenticate Network Communications

##### Incident Response

###### Identify Key Personnel and External Resource

###### Develop Incident Management Plans

###### Prepare Forensic Capabilities

###### Automate Containment Capability

###### Pre-Provision Access

###### Pre-Deploy Tools

###### Gun Game Days

#### Reliability

##### Foundations

###### Aware of Service Quotas and Constraints

###### Manage Service Quotas Across Accounts and Regions

###### Accommodate Fixed Service Quotas and Constraints Through Architecture

###### Monitor and Manage Quotas

###### Automate Quota Management

###### Ensure That a Sufficient Gap Exists Between the Current Quotas and the Maximum Usage to Accommodate Failover

###### Use Highly Available Network Connectivity for Your Workload Public Endpoints

###### Provision Redundant Connectivity Between Private Networks in the Cloud and On-Premises Environments

###### Ensure IP Subnet Allocation Accounts for Expansion and Availability

###### Prefer Hub-and-Spoke Topologies Over Many-to-Many Mesh

###### Enforce Non-Overlapping Private IP Address Ranges in All Private Address Spaces Where They are Connected

##### Workload Architecture

###### Choose How to Segment Your Workload

###### Build Services Focused on Specific Business Domains and Functionality

###### Provide Service Contracts per API

###### Identify Which Kind of Distributed System is Required

###### Implement Loosely Coupled Dependencies

###### Do Constant Work

###### Make All Responses Idempotent

###### Implement Graceful Degradation to Transform Applicable Hard Dependencies Into Soft Dependencies

###### Throttle Requests

###### Control and Limit Retry Calls

###### Fail Fast and Limit Queues

###### Set Client Timeouts

###### Make Services Stateless Where Possible

###### Implement Emergency Levers

##### Change Management

###### Monitor All Components for the Workload (Generation)

###### Define and Calculate Metrics (Aggregation)

###### Send Notifications (Real-Time Processing and Alarming)

###### Automate Responses (Real-Time Processing and Alarming)

###### Analytics

###### Conduct Reviews Regularly

###### Monitor End-to-End Tracing of Requests Through Your System

###### Use Automation When Obtaining or Scaling Resources

###### Obtain Resources Upon Detection of Impairment to a Workload

###### Obtain Resources Upon Detection That More Resources are Needed for a Workload

###### Load Test Your Workload

###### Use Runbooks for Standard Activities Such as Deployment

###### Integrate Functional Testing as Part of Your Deployment

###### Integrate Resiliency Testing as Part of Your Deployment

###### Deploy Using Immutable Infrastructure

###### Deploy Changes With Automation

##### Failure Management

###### Identify and Back Up All Data That Needs to be Backed Up, or Reproduce the Data From Sources

###### Secure and Encrypt Backups

###### Perform Data Backup Automatically

###### Perform Periodic Recovery of the Data to Verify Backup Integrity and Processes

###### Deploy the Workload to Multiple Locations

###### Select the Appropriate Locations for Your Multi-Location Deployment

###### Automate Recovery for Components Constrained to a Single Location

###### Use Bulkhead Architectures to Limit Scope of Impact

###### Monitor All Components of the Workload to Detect FailuRes

###### Fail Over to Healthy Resources

###### Automate Healing on All Layers

###### Rely on the Data Plane and Not the Control Plane During Recovery

###### Use Static Stability to Prevent Bimodal Behavior

###### Send Notifications When Events Impact Availability

###### Use Playbooks to Investigate Failures

###### Perform Post-Incident Analysis

###### Test Functional Requirements

###### Test Scaling and Performance Requirements

###### Test Resiliency Using Chaos Engineering

###### Conduct Game Days Regularly

###### Define Recovery Objectives for Downtime and Data Loss

###### Use Defined Recovery Strategies to Meet the Recovery Objectives

###### Test Disaster Recovery Implementation to Validate the Implementation

###### Manage Configuration Drift at the DR Site or Region

###### Automate Recovery

#### Performance Efficiency

##### Selection

###### Understand the Available Services and Resources

###### Define a Process for Architectural Choices

###### Factor Cost Requirements Into Decisions

###### Use Policies or Reference Architectures

###### Use Guidance From Your Cloud Provider or an Appropriate Partner

###### Benchmark Existing Workloads

###### Load Test Your Workload

###### Evaluate the Available Compute Options

###### Understand the Available Compute Configuration Options

###### Collect Compute-Related Metrics

###### Determine the Required Configuration by Right-Sizing

###### Use the Available Elasticity of Resources

###### Re-Evaluate Compute Needs Based on Metrics

###### Understand Storage Characteristics and Requirements

###### Evaluate Available Configuration Options

###### Make Decisions Based on Access Patterns and Metrics

###### Understand Data Characteristics

###### Evaluate the Available Options

###### Collect and Record Database Performance Metrics

###### Choose Data Storage Based on Access Patterns

###### Optimize Data Storage Based on Access Patterns and Metrics

###### Understand How Networking Impacts Performance

###### Evaluate Available Networking Features

###### Choose Appropriately Sized Dedicated Connectivity or VPN for Hybrid Workloads

###### Leverage Load-Balancing and Encryption Offloading

###### Choose Network Protocols to Improve Performance

###### Choose Your Workload’s Location Based on Network Requirements

###### Optimize Network Configuration Based on Metrics

##### Review

###### Stay Up-to-Date on New Resources and Services

###### Define a Process to Improve Workload Performance

###### Evolve Workload Performance Over Time

##### Monitoring

###### Record Performance-Related Metrics

###### Analyze Metrics When Events or Incidents Occur

###### Establish Key Performance Indicators (KPIs) to Measure Workload Performance

###### Use Monitoring to Generate Alarm-Based Notification

###### Review Metrics at Regular Intervals

###### Monitor and Alarm Proactively

##### Tradeoffs

###### Understand the Areas Where performance is Most Critical

###### Learn About Design Patterns and Services

###### Identify How Tradeoffs Impact Customers and Efficiency

###### Measure the Impact of Performance Improvements

###### Use Various Performance-Related Strategies

#### Cost Optimization

##### Practice Cloud Financial Management

###### Establish a Cost Optimization Function

###### Establish a Partnership Between Finance and Technology

###### Establish Cloud Budgets and Forecasts

###### Implement Cost Awareness in Your Organizational Processes

###### Report and Notify on Cost Optimization

###### Monitor Cost Proactively

###### Keep Up-to-Date With New Service Releases

#### Expenditure and Usage Awareness

###### Develop Policies Based on Your Organization Requirements

###### Implement Goals and Targets

###### Implement an Account Structure

###### Implement Groups and Roles

###### Implement Cost Controls

###### Track Project Lifecycle

###### Configure Detailed Information Sources

###### Identify Cost Attribution Categories

###### Establish Organization Metrics

###### Configure Billing and Cost Management Tools

###### Add Organization Information to Cost and Usage

###### Allocate Costs Based on Workload Metrics

###### Track Resources Over Their Lifetime

###### Implement a Decommissioning Process

###### Decommission Resources

###### Decommission Resources Automatically

##### Cost-Effective Resources

###### Identify Organization Requirements for Cost

###### Analyze All Components of the Workload

###### Perform a Thorough Analysis of Each Component

###### Select Software With Cost-Effective Licensing

###### Select Components of This Workload to optimize Cost in Line With Organization Priorities

###### Perform Cost Analyssi for Different Usage Over Time

###### Perform Cost Modeling

###### Select Resource Type, Size, and Number Based on Data

###### Select Resource Type, Size, and Number Automatically Based on Metrics

###### Perform Pricing Model Analysis

###### Implement Regions Based on Cost

###### Select Third-Party Agreements With Cost-Efficient Terms

###### Implement Pricing Models for All Components of This Workload

###### Perform Pricing Model Analysis at the Master Account Level

###### Perform Data Transfer Modeling

###### Select Components to Optimize Data Transfer Cost

###### Implement Services to Reduce Data Transfer Costs

##### Manage Demand and Supply Resources

###### Perform an Analysis on the Workload Demand

###### Implement a Buffer or Throttle to Manage Demand

###### Supply Resources Dynamically

##### Optimize Over Time

###### Develop a Workload Review Process

###### Review and Analyze This Workload Regularly

#### Sustainability

##### Region Selection

###### Choose Regions Near Amazon Renewable Energy Projects and Regions Where the Grid Has a Published Carbon Intensity That is Lower Than Other Locations (or Regions)

##### Use Behavior Patterns

###### Scale Infrastructure With user Load

###### Align SLAs With Sustainability Goals

###### Stop the Creation and Maintenance of Unused Assets

###### Optimize Geographic Placement of Workloads for User Locations

###### Optimize Team Member Resources for Activities Performed

##### Software and Architecture Patterns

###### Optimize Software and Architecture for Asynchronous and Scheduled Jobs

###### Remove or Refactor Workload Components With Loe or No Use

###### Optimize Areas of Code That Consume the Most Time or Resources

###### Optimize Impact on Customer Devices and Equipment

###### Use Software Patterns and Architectures That Best Support Data Access and Storage Patterns

##### Data Patterns

###### Implement a Data Classification Policy

###### Use Technologies That Support Data Access and Storage Patterns

###### Use Lifecycle Policies to Delete Unnecessary Data

###### Minimize Over-Provisioning in Block Storage

###### Remove Unneeded or Redundant Data

###### Use Shared File Systems or Object Storage to Access Common Data

###### Minimize Data Movement Across Networks

###### Back Up Data Only When Difficult to Recreate

##### Hardware Patterns

###### Use the Minimum Amount of Hardware to Meet Your Needs

###### Use Instance Types With the Least Impact

###### Use Managed Services

###### Optimize Your Use of GPUs

##### Development and Deployment Process

###### Adopt Methods That Can Rapidly Introduce Sustainability Improvements

###### Keep Your Workload Up-to-Date

###### Increase Utilization of Build Environments

###### Use Managed Device Farms for Testing

## [Signing AWS API Requests](https://docs.aws.amazon.com/general/latest/gr/signing-aws-api-requests.html)

### [Elements of an AWS API Request Signature](https://docs.aws.amazon.com/general/latest/gr/signing-elements.html)

### [Create a Signed AWS API Request](https://docs.aws.amazon.com/general/latest/gr/create-signed-request.html)

-->
