# Using Nikto

author:: Nathan Acks  
date:: 2022-03-19

Nikto is a web application vulnerability scanner.

```bash
nikto -Format txt -host $URL \
      -output $OUTPUT_FILE_WITH_EXTENSION
```

It can be used for basic web enumeration as well.

Getting help

```bash
nikto -h            # Short help
nikto -H            # Long help (all commands)
nikto -list-plugins # List plugins
```

## References

* [TryHackMe: CC: Pen Testing](tryhackme-cc-pen-testing.md)
* [Tools'R'us](tryhackme-tools-r-us.md)
* [web enumeration](https://pentesting.one2bla.me/enumeration/web-enumeration)
