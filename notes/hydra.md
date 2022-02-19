# Using Hydra

Hydra can actually brute-force remote services, though I have some skepticism about how useful this is in practice.

```bash
hydra -t 4 -l $USER_NAME -P $WORDLIST \
      -f -vV $TARGET_IP_ADDRESS $SERVICE
```

Here $SERVICE is “ssh”, “ftp”, etc. Note that "http" is not used directly; instead use "http-get", "http-put", etc.

If you don't have a particular user login, you can use -L instead of -l and supply a wordlist. There's a similar symmetry for passwords (-p/-P).

The -f flag tells Hydra to stop after the first successful match. Useful if you are just trying to brute-force a single username!

The -t flag specifies the number of threads (parallel connection attempts) that Hydra should make at any one time.

## Attacking API Endpoints Using JSON

Hydra can be used to attack API endpoints that accept JSON (though apparently there can be some problems with the headers that are passed along):

```bash
hydra -vV -f -l $USERNAME -P $PASSWORDLIST \
	$HOST http-post-form \
	$ENDPOINT:"$TEMPLATE":F="$INVALID":H="Content-Type\: application/json"
```

The `$TEMPLATE` is basically the JSON request body with the special placeholders `^USER^` and `^PASS^` (colons escaped). `$INVALID` is a string that will appear for login *failures* (note that this string *cannot* contain a colon, but fortunately is a substring match). The `H` parameter at the end allows us to override specific headers (necessary because otherwise Hydra sends a Content-Type of application/x-www-form-urlencoded).

## References

* [Basic Pentesting](tryhackme-basic-pentesting.md)
* [Defeating HTTP Basic Auth with Hydra](http://tylerrockwell.github.io/defeating-basic-auth-with-hydra/)
* [Multiple Ways To Exploiting HTTP Authentication](https://www.hackingarticles.in/multiple-ways-to-exploiting-http-authentication/)
* [Hydra bruteforce and JSON](https://security.stackexchange.com/questions/57839/hydra-bruteforce-and-json)
* [Bruteforce - Using Hydra with JSON](https://security.stackexchange.com/questions/203501/bruteforce-using-hydra-with-json)
* [TryHackMe: hackernote](tryhackme-hackernote.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> January 30, 2022
