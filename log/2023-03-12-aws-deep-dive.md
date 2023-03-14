# AWS Deep Dive

* **author**:: Nathan Acks
* **date**:: 2023-03-12

## AWS Well-Architected Framework

### [Questions and Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/framework/appendix.html)

#### [Operational Excellence](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operational-excellence.html)

##### [Operate](https://docs.aws.amazon.com/wellarchitected/latest/framework/a-operate.html)

###### [Define Operations Metrics](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_operations_health_design_ops_metrics.html)

Obvious point: KPIs and health baselines are (desired) *targets*, while *metrics* are measurements of the actual system performance towards these.

###### [Alert When Operations Outcomes are at Risk](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_operations_health_ops_outcome_alerts.html)

> Alerts without a corresponding action can lead to alert fatigue.

This is good.

> When operations activities are at risk, alerts are sent to drive action. The alerts contain context on why an alert is being raised and point to a playbook to investigate or a runbook to mitigate. Where possible, runbooks are automated and notifications are sent.

Later on…

> Alerts without an action should be avoided.

This is *very* good.

A somewhat buried point later on: Alerts are most useful if they’re not only *resolved*, but also *analyzed* in a post mortem.

A final quote (this section is *very* quotable):

> Alerts should include a mechanism to flag them as a false-positive. This should lead to a review of the metric thresholds.

###### [Alert When Operations Anomalies are Detected](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_operations_health_ops_anomaly_alerts.html)

This section is once again making the point that baselines are not necessarily static — the expected behavior of a system can vary over the course of a day, week, month, and year. These variations are important to keep in mind when building out monitoring systems and alarms.

###### [Validate the Achievement of Outcomes and the Effectiveness of KPIs and Metrics](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_operations_health_biz_level_view_ops.html)

Apparently the point of this section is to keep your KPIs and operational health targets up-to-date?

###### [Have a Process per Alert](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_event_response_process_per_alert.html)

> Have a well-defined response (runbook or playbook), **with a specifically identified owner**, for any event for which you raise an alert.

Emphasis mine. The “single wringable neck” principle.

###### [Prioritize Operational Events Based on Business Impact](https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_event_response_prioritize_events.html)

On the one hand, I appreciate how turn-key AWS is trying to make everything (“have a priority for *all the things*!”). On the other hand, there’s very little latitude in this paradigm for individual judgement or initiative when responding to multiple failures. That’s probably the right approach for a large organization with multiple IT (related) teams… But it doesn’t feel like it will necessarily scale *down*.
