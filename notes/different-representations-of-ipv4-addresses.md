# Different Representations of IPv4 Addresses

**author**:: Nathan Acks  
**date**:: 2022-03-19

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

* [TryHackMe: Web Fundamentals](tryhackme-web-fundamentals.md)
* [Qalculate!](https://qalculate.github.io/)

## Common IP Addresses

* localhost -> 127.0.0.1 -> 0x7F000001 -> 2130706433 (decimal)

169.254.169.254 is often used in to reference configuration data in cloud systems (just AWS?).

* 169.254.169.254 -> 0xA9FEA9FE -> 2852039166 (decimal)

The nip.io service can be used to provide a domain name for an arbitrary IP address.

* [nip.io](https://nip.io/)
