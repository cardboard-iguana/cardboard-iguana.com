# Different Representations of IPv4 Addresses

Localhost can be represented in a lot of different ways.

* `localhost`
* `127.0.0.1` (IPv4 address)
* `[::]` or `::` (IPv6 address)
* `2130706433` (IPv4 in decimal)
* `0x7f000001` (IPv4 in hexadecimal)

The last two of these are particularly interesting -- IPv4 addresses can be represented as plain numbers!

Decimal/Hexidecimal conversion for IPv4 addresses is relatively simple if you remember that we break IPv4 addresses up into 4 *octets*, where each octet is 8 binary digits. Thus

```
127.0.0.1 = (127 × 2²⁴) + (0 × 2¹⁶) + (0 × 2⁸) + (1 × 2⁰)
          = 2130706432 + 0 + 0 + 1
          = 2130706433
```

Converting to hexadecimal is trivial using the excellent Qalculate tool.

```qalc
2130706433 to hex = 0x7F000001
```

## Common IP Addresses

|              IP |    Decimal | Hexadecimal | Notes                                                      |
| ---------------:| ----------:| -----------:|:---------------------------------------------------------- |
| 127.0.0.1       | 2130706433 |  0x7F000001 | localhost                                                  |
| 169.254.169.254 | 2852039166 |  0xA9FEA9FE | Often used in to store configuration data in cloud systems |

The nip.io service can be used to provide a domain name for an arbitrary IP address.

## References

* [TryHackMe: Web Fundamentals](tryhackme-web-fundamentals.md)
* [Qalculate!](https://qalculate.github.io/)
* [nip.io](https://nip.io/)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 19, 2022
