# TCP Protocol

author:: Nathan Acks  
date:: 2022-04-03

## Flags

* URG — Process the current TCP packet immediately. Directs the receiving system to examine the “urgent pointer” field.
* ACK — Acknowledgement. Directs the receiving system to examine the “acknowledgement number” field.
* PSH — Push. Elevate the priority of the packet’s data, but does not otherwise change rules around packet processing.
* RST — Reset. Terminates the connection forcefully.
* SYN — Synchronize. Used during the initial three-way handshake to set a shared (starting) sequence number.
* FIN — Finish. Indicates that the connection may be dropped gracefully.

## Acknowledgement Number

The TCP “acknowledgment number” contains the *next* sequence number that the sender is expecting to receive (so basically senders determine the next sequence number). This is 0 in the case of RST packets.

## References

* [TryHackMe: Wireshark 101](tryhackme-wireshark-101.md)
* [Transmission Control Protocol (RFC 793)](https://datatracker.ietf.org/doc/html/rfc793.html)
* [TCP Model](tcp-model.md)
* [2022-04-02 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
