# TryHackMe: Complete Beginner (Supplements)

## Wireshark 101

### Filtering Captures

[Wireshark](../notes/kerbrute.md) filters are generally pretty straight forward boolean operations (`and` / `&&`, `ne` / `!=`, etc.). These operate on objects that are generally written as protocol.property. For example: `ip.src`, `ip.dst`, and `ip.addr` (where `ip.addr = ip.src ∪ ip.dst` for a given IP address).

Protocol filters an also use a service name as shorthand. For example, `tcp.port == 22` and `ssh` have the same filter meaning, as do `udp.port == 53` and `dns`.

NOTE: [Wireshark](../notes/kerbrute.md) is very picky about everything being *lower* case, but will also helpfully offer to auto-complete your input and will indicate a correctly formed query by highlighting the search bar green.

### Packet Dissection

[Wireshark](../notes/kerbrute.md) breaks down packets into 5 - 7 layers that kinda-sorta-not-exactly correspond to the [OSI Model](../notes/osi-model.md).

* Frame (OSI physical layer)
* Source (OSI data link layer)
* IP (OSI network layer)
* Protocol (OSI transport layer)
* Protocol errors and reassembly information (optional)
* Application (OSI session, presentation, and application layers)
* Application data (optional, breaks down the actual application data in some cases)

### ARP Traffic

The ARP protocol links [OSI](../notes/osi-model.md) layers 2 and 3 by mapping IP addresses to MAC addresses. ARP packet message headers contain two operation codes: REQUEST (1) and REPLY (2).

Basically, an ARP request will broadcast “to” a particular IP address but using the “broadcast” MAC address (00:00:00:00:00:00), and the computer with that IP address will then reply in a non-broadcast fashion (since this requires that both the MAC address and IP address be filled in, such a direct reply provides the desired information by way of its very existence).

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 22, 2021
