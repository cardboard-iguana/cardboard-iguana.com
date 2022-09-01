# Post Office Protocol 3 (POP3)

author:: Nathan Acks  
date:: 2022-04-03

POP3 commands:

| Command | Meaning                                                 |
| -------:|:------------------------------------------------------- |
|    USER | Username to use for authentication                      |
|    PASS | Password to use for authentication                      |
|    STAT | Mailbox statistics (`+OK $TOTAL_MSGS $MBOX_SIZE_BYTES`) |
|    LIST | List messages (`$MSG_NUMBER $MSG_SIZE_BYTES`)           |
|    RETR | Retrieve message `$MESSAGE_NUMBER`                      |
|    QUIT | Close connection                                        |

* [2022-04-02 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
