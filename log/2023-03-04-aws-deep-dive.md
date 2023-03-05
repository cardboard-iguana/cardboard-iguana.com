# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-03-04

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Prepare](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-prepare.html)

###### [Automate Testing and Rollback](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_auto_testing_and_rollback.html)

This section is about testing updated services/applications *after* deployment (and automating the rollback if these tests fail). The meta-point is to automate rollout testing for *every* stage of the development lifecycle, from individual (and potentially rapid) test builds to more “stable” alpha/beta/gamma deployments (and eventually into production).

###### [Ensure a Consistent Review of Operational Readiness](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_const_orr.html)

Basically, have a standardized launch checklist. And a standardized service/app review checklist. Amazon has a whole standardized process for these “[Operational Readiness Reviews](https://docs.aws.amazon.com/wellarchitected/latest/operational-readiness-reviews/wa-operational-readiness-reviews.html)”.

###### [Use Runbooks to Perform Procedures](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_use_runbooks.html)

More checklists! These are step-by-step lists breaking down how to do something. Automate (or partially automate) whenever possible.

(It feels like there’s a space here for “self documenting runbook automation”, kind of along the lines or [literate programming](https://en.wikipedia.org/wiki/Literate_programming).)

###### [Use Playbooks to Investigate Issues](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ready_to_support_use_playbooks.html)

Apparently the difference between a “runbook” and a “playbook” is that the former is about how to do something within or related to a particular service/application, while the latter is a slightly more open-ended document based around investigating issues or behaviors. (But not *too* open-ended though, as part of the goal of playbooks is automation as well.)

Given that the *process* of action and investigation seem isomorphic to each other (the difference is mostly in *why* you are doing the thing and the potential scope of what you’re looking at), I’m not sure why two different words are necessary…

It’s interesting that Amazon is specifically calling out the idea of using Python for automation and writing playbooks as [Jupyter](https://jupyter.org/) notebooks. So we really are borrowing a lot of ideas from literate programming here.

##### [Operate](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operate.html)

###### [Define Workload Metrics](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_workload_health_design_workload_metrics.html)

AWS divides metrics into two categories: Those that measure workload progress towards KPIs and those that measure workload health.

###### [Collect and Analyze Workload Metrics](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_workload_health_collect_analyze_workload_metrics.html)

Basically, metrics by themselves are seldom useful — what’s useful is understanding how given metrics evolve with time, or in conjunction with other metrics.

###### [Establish Workload Metrics Baselines](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_workload_health_workload_metric_baselines.html)

What is “normal”, anyway?

###### [Learn Expected Patterns of Activity for Workload](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_workload_health_learn_workload_usage_patterns.html)

What is “normal”, anyway? (Time series edition.)

###### [Alert When Workload Outcomes are at Risk](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_workload_health_workload_outcome_alerts.html)

Interesting automation tool: [Amazon CloudWatch Synthetics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html). Basically an AWS service that lets you automatically interact with a service/application that you’ve deployed in order to generate metric data points. The idea here is to be able to catch emerging problems without having to rely on the users themselves running into them (alone). This is also probably a useful tool for continuously probing areas of a service/application that are more seldomly used.

<!--

# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-03-05

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Operate](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operate.html)

###### [Identify Key Performance Indicators](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_operations_health_define_ops_kpis.html)

==xxx==

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
