# The Poison Null Byte

Some languages use null bytes to know when a string terminates, rather than tracking the actual string length (it looks like PHP is one of these). If a null byte (generally? always? encoded as `%00`) is included in a string, then everything after that byte is dropped by the interpreter.

Because % characters are themselves special, null bytes need to be encoded in URLs as `%2500`.

Typically a null byte will either be inserted at the end of a string (to prevent a common suffix from being appended, which can sometimes allow us to exfiltrate files we wouldn't otherwise have access to) or before a “fake” file extensions (which can cause some file-type checks to pass, again allowing us to download files we'd otherwise be denied access to).

## References

* [TryHackMe - Complete Beginner](tryhackme-complete-beginner.md)
* [Common PHP attacks: Poison Null Byte](https://defendtheweb.net/article/common-php-attacks-poison-null-byte)

- - - -

👤 Nathan Acks
📅 October 8, 2021
