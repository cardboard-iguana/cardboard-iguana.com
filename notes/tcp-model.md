# TCP Model

* Layer 4: Application (highest)
* Layer 3: Transport
* Layer 2: Internet
* Layer 1: Network interface (lowest)

*Roughly*, the TCP Model encapsulates the OSI Model.

```
+--------------+-------------------+
| OSI LAYER    | TCP/IP LAYER      |
+--------------+-------------------+
| Application  |                   |
+--------------+                   |
| Presentation | Application       |
+--------------+                   |
| Session      |                   |
+--------------+-------------------+
| Transport    | Transport         |
+--------------+-------------------+
| Network      | Internet          |
+--------------+-------------------+
| Data Link    |                   |
+--------------+ Network Interface |
| Physical     |                   |
+--------------+-------------------+
```

## References

* [TryHackMe: Pre Security](tryhackme-pre-security.md)
* [OSI Model](osi-model.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> September 14, 2021
