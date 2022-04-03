# File Transfer Protocol (FTP)

FTP commands:

| Command | Meaning                                                 |
| -------:|:------------------------------------------------------- |
|    USER | Specify the username for the account logging on.        | 
|    PASS | Specify the password for the account logging on.        |
|    STAT | Provide connection/server information.                  |
|    SYST | Provide system “type” information.                      |
|    PASV | Switch to passive mode.                                 |
|    TYPE | Switch between ASCII (A) and binary (I) transfer modes. |

Note that you cannot receive files using FTP with telnet/netcat, as file transfers are conducted over a separate channel (either a channel originating from port 20 on the server for “active” mode or a random port above 1023 on the client for “passive” mode).

## FTPS

FTPS (FTP over SSL) uses port 990 by default. Mostly supplanted by SFTP.

## References

* [2022-04-02 ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 3, 2022
