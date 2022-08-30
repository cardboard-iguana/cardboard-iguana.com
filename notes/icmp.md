# ICMP Protocol

author:: Nathan Acks  
date:: 2022-03-30

ICMP headers are 8 bytes; the first 4 bytes have a fixed meaning, while the meaning of the last 4 bytes varies depending on the type of request specified in the first 4 bytes.

ICMP traffic "types" correspond to the kind of packet being sent (though different ICMP services can have multiple types):

* 0 - Ping reply
* 8 - Ping request

Ping packets typically just include either random data or all zeros.

## References

* [TryHackMe: Wireshark 101](tryhackme-wireshark-101.md)
* [RFC 792](https://datatracker.ietf.org/doc/html/rfc792)
* [Internet Control Message Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)
* [2022-03-30 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-03-30-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
