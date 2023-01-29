# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-01-26

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Organization](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-organization.html)

###### [Team Members are Enabled and Encouraged to Maintain and Grow Their Skill Sets](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_org_culture_team_enc_learn.html)

> Cross train to promote knowledge transfer and reduce the risk of significant impact when you lose skilled and experienced team members with institutional knowledge.

Repeat after me: Irreplaceable employees are a *liability*.

##### [Prepare](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-prepare.html)

###### [Implement Application Telemetry](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_telemetry_application_telemetry.html)

**Metrics:** Datapoints that describe an application’s *state* at a given moment in time.

**Logs:** A record of an application’s activities and their outcomes.

Key questions telemetry should answer:

* Is the application healthy?
* Is the application achieving business outcomes?
