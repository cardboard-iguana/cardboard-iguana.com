# ARP Protocol

The ARP protocol links [OSI](osi-model.md) layers 2 and 3 by mapping IP addresses to MAC addresses. ARP packet message headers contain two operation codes: REQUEST (1) and REPLY (2).

Basically, an ARP request will broadcast “to” a particular IP address but using the “broadcast” MAC address (00:00:00:00:00:00), and the computer with that IP address will then reply in a non-broadcast fashion (since this requires that both the MAC address and IP address be filled in, such a direct reply provides the desired information by way of its very existence).

## ARP Scanning

Scanning a network with ARP rather than ICMP is one method of keeping a lower profile, as ARP requests are less likely to be monitored.

It's fairly easy to set up such a scanner using the [Scapy module](https://scapy.net/):

```python
#!/usr/bin/env python3

# Scans the given IP range on the given network using ARP
# rather than ICMP to help bypass potential alerting.

from scapy.all import *

interface = "eth0"
ip_range = "10.10.X.X/24"
broadcastMac = "ff:ff:ff:ff:ff:ff"

packet = Ether(dst = broadcastMac) / ARP(pdst = ip_range)

ans, unans = srp(packet, timeout = 2, iface = interface, inter = 0.1)

for send, receive in ans:
	print(receive.sprintf(r"%Ether.src% - %ARP.psrc%"))
```

Note that the `r` here isn't a mistake -- rather it specifies a "[raw string](https://whatisanything.com/how-do-you-write-an-f-string-in-python/#What_does_R_mean_Python)" (the use of which, incidentally, requires Python 3.6+).

## References

* [TryHackMe - Wireshark 101](tryhackme-wireshark-101.md)
* [TryHackMe - Python for Pentesters](tryhackme-python-for-pentesters.md)

- - - -

👤 Nathan Acks
📅 February 1, 2022