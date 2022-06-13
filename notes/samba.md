# SAMBA (a.k.a. CIFS) Protocol

author:: Nathan Acks  
date:: 2022-04-25

## Default Shares

Default SMB shares (which you generally can’t connect to):

* IPC$
* ADMIN$
* C$

## Associated Protocols

* DCERPC is Windows Server‘s RPC connection protocol.
* DRSUAPI is Windows’ implementation of the “Directory Replication Service” protocol, which is used to keep domain controllers in sync.

## References

* [TryHackMe: Wireshark 101](tryhackme-wireshark-101.md)
* [DCE/RPC (Wikipedia)](https://en.wikipedia.org/wiki/DCE/RPC)
* [DRSUAPI](https://wiki.samba.org/index.php/DRSUAPI)
* [Alice with Siddicky (Student Mentor) (YouTube)](https://www.youtube.com/watch?v=Zma6Mk5bEI8)
