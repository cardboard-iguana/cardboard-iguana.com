# Hypertext Transfer Protocol (HTTP)

author:: Nathan Acks  
date:: 2022-03-13

## A Minimal HTTP Request

```http
GET / HTTP/1.1
host: something

```

(Note the blank line at the end.)

## Useful HTTP Headers

| Header          | Purpose / Notes                                                                                                     |
|:--------------- |:------------------------------------------------------------------------------------------------------------------- |
| Server          | Web server information (Apache, NGINX, etc.); useful for recon.                                                     |
| True-Client-IP  | Override the client IP address (direct connections to servers).                                                     |
| X-Forwarded-For | Override the client IP address (connections forwarded through proxies).                                             |
| X-Powered-By    | Added by some application engines to advertise themselves; useful for recon.                                        |
| Content-Type    | Probably needs to be manipulated for POST requests — for example, form data uses application/x-www-form-urlencoded. |
| Content-Length  | The length of the body in bytes (which is just characters for ASCII) for POST requests.                             |

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [TryHackMe: Jr. Penetration Tester](tryhackme-jr-penetration-tester.md)
* [Content-Length (MDN)](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Length)
* [2022-04-02 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-02-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
