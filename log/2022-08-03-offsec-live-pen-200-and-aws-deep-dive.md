# OffSec Live: PEN-200 & AWS Deep Dive

author:: Nathan Acks  
date:: 2022-08-03

The semi-regular Wednesday twofer: OffSec Live in the morning and the “Monitoring and Analytics” portion of the “AWS Cloud Practitioner Essentials” course in the evening.

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)
* [AWS Cloud Practitioner Essentials](https://www.aws.training/learningobject/curriculum?id=27076)

## OffSec Live: SQL Injection

* Remember that when trying to bypass logins with SQL injection, it’s a good idea to use `limit 1` to ensure that the code gets back the expected number of results!
* In MySQL, you can use `concat()` to return values from multiple columns in a single output field. Since `concat()` accepts hexadecimal values for ASCII characters, we can use `0x3a` (`:`) to make field separation obvious.
* Sometimes you can chain queries as part of SQL injection. This isn’t useful for *retrieving* input, but if the database is badly secured you can use this to *modify* the backend database (obviously requires the application to be using the same user/permissions for both reads and writes). Use the `sleep()` function to test if this vulnerability impacts the system you’re attacking.

REFERENCES:

* [SQL Injection](../notes/sql-injection.md)

### MySQL Reverse Shells

* It’s really hard to get a reverse shell in PostgrSQL. But MySQL and MariaDB are more exploitable.
* You can “upload” reverse shells using MySQL using `INTO OUTFILE`: `'<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/html/cmd.php'` (the path may require some brute-forcing or additional reconnaissance; sometimes you can force an error to return a potentially writeable path). This can then be leveraged into a reverse shell.

REFERENCES:

* [Exploiting MySQL](../notes/exploiting-mysql.md)

## Monitoring and Analytics

### CloudWatch

* CloudWatch is primarily about log *monitoring* — *metrics* are extracted from logs, which can be watched by *alarms* that trigger certain actions (like sending messages to SNS) when triggered.
* CloudWatch can ingest data from on-prem systems, in addition to services/system in AWS.

### CloudTrail

* CloudTrail is AWS’s (API) logging engine.
* Logs are stored in S3.
* Events are logged with 15 minutes.
* CloudTrail has its *own* alarm/automation system, called “CloudTrail Insights”.
* You might thing of CloudTrail as being more concerned about account *activity*, and CloudWatch as being more focused on service/resource *performance*.

### Trusted Advisor

* This seems to be a more general version of AWS Inspector — Trusted Advisor is more about your *entire* AWS account, while AWS Inspector is geared more towards individual systems.
* Trusted Advisor can detect S3 buckets with open access permissions. (It’s starting to sound a bit like Scout Suite.)

REFERENCES:

* [nccgroup / ScoutSuite](https://github.com/nccgroup/ScoutSuite)
