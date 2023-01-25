# Internet Message Access Protocol (IMAP)

* **author**:: Nathan Acks  
* **date**:: 2022-04-03

IMAP commands are much more complicated than POP3. Some examples:

* Login User - prefix LOGIN user pass
* Lost Folders - prefix LIST "" "\*"
* List Emails in INBOX - prefix EXAMINE INBOX
* Close Connection - prefix LOGOUT

Here `prefix` is a random prefix we provide to track server replies to various commands. IMAP accepts a lot of different user authentication methods; LOGIN is just the simplest (and least secure).

* [2022-04-02 — ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
