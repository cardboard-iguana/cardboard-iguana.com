# Different Representations of IPv4 Addresses

Localhost can be represented in a lot of different ways.

* `localhost`
* `127.0.0.1` (IPv4 address)
* `[::]` or `::` (IPv6 address)
* `2130706433` (IPv4 in decimal)
* `0x7f000001` (IPv4 in hexadecimal)

The last two of these are particularly interesting -- IPv4 addresses can be represented as plain numbers!

Decimal/Hexidecimal conversion for IPv4 addresses is relatively simple if you remember that we break IPv4 addresses up into 4 *octets*, where each octet is 8 binary digits. Thus

$$\begin{flalign}
127.0.0.1 & = (127 \times 2^{24}) + (0 \times 2^{16}) + (0 \times 2^8) + (1 \times 2^0) &\\
          & = 2130706432 + 0 + 0 + 1 &\\
		& = 2130706433
\end{flalign}$$

Converting to hexadecimal is trivial using the excellent [Qalculate!](https://qalculate.github.io/) tool.

```qalc
2130706433 to hex = 0x7F000001
```

## References

* [TryHackMe: Web Fundamentals](tryhackme-web-fundamentals.md)

- - - -

👤 Nathan Acks  
📅 January 24, 2022
