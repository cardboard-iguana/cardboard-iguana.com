# Using “basenc”

```bash
# Encode $STRING to base64.
#
echo "$STRING" | basenc --base64

# Encode $STRING to URL-safe base64.
#
echo "$STRING" | basenc --base64url

# Dencode $BASE64_STRING from base64.
#
echo "$BASE64_STRING" | basenc -d --base64

# Dencode $BASE64_STRING from URL-safe base64.
#
echo "$BASE64_STRING" | basenc -d --base64url
```

The advantage of `basenc` over `base64` is that `basenc` supports URL-safe base64-encoding/decoding out of the box, which I’ve otherwise found is a pain to work with.

## References

* [TryHackMe: Jr. Penetration Tester](tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 2, 2022
