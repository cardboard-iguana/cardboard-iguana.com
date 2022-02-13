# Get an SSL Certificate from a Real Registrar

NOTE: Now that [Let’s Encrypt](https://letsencrypt.org/) exists, the below information is a lot less useful…

Generate a unique site key:

```bash
openssl genrsa -out ${SITE}.key 4096
```

Generate a certificate signing request:

```bash
openssl req -new -config ./${SITE}.cnf -key ${SITE}.key -out $SITE.csr
```

- - - -

👤 Nathan Acks
