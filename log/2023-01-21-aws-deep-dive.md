# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-01-21

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Organization](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-organization.html)

###### [Evaluate External Customer Needs](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_priorities_ext_cust_needs.html)

Interesting “common anti-pattern”:

> You are developing a new feature but have not engaged your customers to find out if it is desired, if desired in what form, and without experimentation to validate the need and method of delivery.

This happens a surprising amount. It’s pretty obvious that *Amazon* does this with some frequency, though not perhaps as much as, say, Microsoft or Google.

###### [Evaluate Internal Customer Needs](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_priorities_int_cust_needs.html)

See above.

###### [Resources Have Identified Owners](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ops_model_def_resource_owners.html)

A big emphasis of this section is integrating ownership information directly with the infrastructure itself using AWS’s key/value tagging.

###### [Processes and Procedures Have Identified Owners](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ops_model_def_proc_owners.html)

AWS tags can be used here as well, so long as the process under consideration is embodied by a discrete Lambda function or similar system. For the most part, however, process and procedure ownership will need to be documented in some centralized fashion.

###### [Operations Activities Have Identified Owners Responsible for Their Performance](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_ops_model_def_activity_owners.html)

“Ownership” in this case is more “who’s responsible for *doing* a thing”, as opposed to “who’s responsible *for* the thing”.

###### [Communications are Timely, Clear, and Actionable](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_org_culture_effective_comms.html)

Apparently AWS offers two tools for helping track and automate maintenance (both recurring and one-off) and general change windows: “AWS Systems Manager Change Calendar” and “AWS Systems Manager Maintenance Windows”.

###### [Experimentation is Encouraged](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_org_culture_team_enc_experiment.html)

This section is basically an extended argument for institutionalizing something like Google’s famous “20% time” as a way both to expand/improve the business *and* identify areas that may have looked useful to explore but actually *aren’t* (“successful experiments with undesired outcomes”).
