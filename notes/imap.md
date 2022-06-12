# Internet Message Access Protocol (IMAP)

IMAP commands are much more complicated than POP3. Some examples:

|                  Command | Meaning              |
| ------------------------:|:-------------------- |
| `prefix LOGIN user pass` | Login user           | 
|     `prefix LIST "" "*"` | List folders         |
|   `prefix EXAMINE INBOX` | List emails in INBOX |
|          `prefix LOGOUT` | Close connection     |

Here `prefix` is a random prefix we provide to track server replies to various commands. IMAP accepts a lot of different user authentication methods; LOGIN is just the simplest (and least secure).

## References

* [2022-04-02 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 3, 2022
