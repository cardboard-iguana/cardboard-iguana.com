# Simple Mail Transfer Protocol (SMTP)

* **author**:: Nathan Acks
* **date**:: 2022-04-03

A set of commands to send an email:

```smtp
HELO somehostname
MAIL FROM:fromaddress@host1.tld
RCPT TO:toaddress@host2.tld
DATA
To: "To Address" <toaddress@host2.tld>
From: "From Address" <fromaddress@host1.tld>
Subject: An Email
This is content.

Here is another line.
.
QUIT
```

Note that `MAIL FROM` / `From` and `RCPT TO` / `To` are not actually required to match, though failure to fill in the `MAIL FROM` / `RCPT TO` commands *may* result in the message being rejected. The commands above are *not* case-sensitive, and the message ends with a `.` on a single line.

* [2022-04-02 — ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
* [In SMTP, must the RCPT TO: and TO: match?](https://stackoverflow.com/questions/10822190/in-smtp-must-the-rcpt-to-and-to-match)
