# MAC Addresses

MAC (“Media Access Control”) are unique 48-bit identifying numbers burned into network cards. They are typically represented as six octets each composed of two hexadecimal numbers (0 - f). The first three octets designate the network interface vendor while the last three constitute device serial number. On most operating systems octets are separated using colons, but Windows uses dashes instead.

|         | MAC Address       | Vendor Identifier | NIC Identifier |
| -------:|:-----------------:|:-----------------:|:--------------:| 
|    UNIX | a4:c3:f0:85:ac:2d |          a4:c3:f0 |       85:ac:2d |
| Windows | A4-C3-F0-85-AC-2D |          A4-C3-F0 |       85-AC-2D |

Some network cards and operating systems allow MAC addresses to be overridden (for example, this is used for Wi-Fi privacy, and can be done explicitly on UNIX systems using the macchanger tool).

## References

* [TryHackMe: Pre Security](tryhackme-pre-security.md)

- - - -

👤 Nathan Acks  
📅 September 14, 2021
