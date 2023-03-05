# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-01-28

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Prepare](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-prepare.html)

###### [Perform Patch Management](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_dev_integ_patch_mgmt.html)

> It is preferable to have immutable infrastructures and deploy workloads in verified known good states.

Funny that I’m reading this at the same time I’ve begun to experiment with [NixOS](https://nixos.org/) on the side…

> Patches should only be applied if they support an operational or business outcome.

This seems like an ill-posed sentence… I’m sure the argument here is that maintaining application security and integrity *is* an “operational or business outcome”, but I strongly suspect that a lot of people are going to read this as “don’t patch things that aren’t *directly* related to a *measured* operational or business outcome.”

###### [Use Multiple Environments](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_dev_integ_multi_env.html)

![I don’t always test my code. But when I do, I test in production.](assets/most-interesting-man-testing-in-production.webp)

###### [Make Frequent, Small, Reversible Changes](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_dev_integ_freq_sm_rev_chg.html)

This section harkens back to [Amazon’s conception of “one-way doors” and “two-way doors”](https://aws.amazon.com/executive-insights/content/how-amazon-defines-and-operationalizes-a-day-1-culture/#Keys_to_decision_making_at_speed). Small, reversible changes are “two-way doors”, and are thus generally preferred for reasons of business (and engineering!) agility.

###### [Deploy Using Parallel Environments](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_deploy_to_parallel_env.html)

This isn’t just about deploying into a parallel environment and then cutting over when ready: It’s also about using partial cut-overs to test the new environment, and about keeping the old environment around after cut-over in order to enable faster roll-backs.
