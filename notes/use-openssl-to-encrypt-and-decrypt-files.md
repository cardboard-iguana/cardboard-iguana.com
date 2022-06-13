# Use OpenSSL to Encrypt and Decrypt Files

author:: Nathan Acks

To encrypt a file:

```bash
openssl rsa -in $FILE -aes256 -out $CRYPTOFILE
```

To decrypt a file:

```bash
openssl rsa -in $CRYPTOFILE -out $FILE
```
