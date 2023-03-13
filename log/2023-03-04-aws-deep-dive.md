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
