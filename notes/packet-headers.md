# Packet Headers

author:: Nathan Acks  
date:: 2021-09-14

Important common TCP and UDP packet headers.

| Header                 | TCP | UDP | Description                                                                                                                                                             |
|:---------------------- |:---:|:---:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time to Live (TTL)     |  Y  |  Y  | How long a packet should live on the network before being discarded.                                                                                                    |
| Source port            |  Y  |  Y  | A random (unused) port chosen by the sender.                                                                                                                            |
| Destination port       |  Y  |  Y  | The port on the receiving end, which normally is determined by the application being used.                                                                              |
| Source address         |  Y  |  Y  | "From" IP address.                                                                                                                                                      |
| Destination address    |  Y  |  Y  | "To" IP address.                                                                                                                                                        |
| Sequence number        |  Y  |     | A random number that identifies a given connection.                                                                                                                     |
| Acknowledgement number |  Y  |     | Starts at the sequence number and then increases by one for each packet sent. Used to ensure that no data is lost, and that packets are reassembled in the right order. |
| Checksum               |  Y  |     | Integrity check.                                                                                                                                                        |
| Data                   |  Y  |  Y  | The, well, data.                                                                                                                                                        |
| Flag(s)                |  Y  |     | How the packet should be handled (SYN, ACK, FIN, RST, etc.).                                                                                                            |

* [TryHackMe: Pre Security](tryhackme-pre-security.md)
