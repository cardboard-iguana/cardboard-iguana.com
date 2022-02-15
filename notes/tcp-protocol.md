# TCP Protocol

The TCP “acknowledgment number” contains the *next* sequence number that the sender is expecting to receive (so basically senders determine the next sequence number). This is 0 in the case of RST packets (and other errors?).

## References

* [TryHackMe: Wireshark 101](tryhackme-wireshark-101.md)
* [RFC 793](https://datatracker.ietf.org/doc/html/rfc793)
* [TCP Model](tcp-model.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 28, 2021
