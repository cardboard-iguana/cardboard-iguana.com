# Internet Message Access Protocol (IMAP)

author:: Nathan Acks  
date:: 2022-04-03

IMAP commands are much more complicated than POP3. Some examples:

|                  Command | Meaning              |
| ------------------------:|:-------------------- |
| `prefix LOGIN user pass` | Login user           | 
|     `prefix LIST "" "*"` | List folders         |
|   `prefix EXAMINE INBOX` | List emails in INBOX |
|          `prefix LOGOUT` | Close connection     |

Here `prefix` is a random prefix we provide to track server replies to various commands. IMAP accepts a lot of different user authentication methods; LOGIN is just the simplest (and least secure).

* [2022-04-02 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
