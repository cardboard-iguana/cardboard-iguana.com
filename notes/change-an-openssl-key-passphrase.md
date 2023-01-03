# Change an OpenSSL Key Passphrase

**author**:: Nathan Acks

To change a passphrase:

```bash
openssl rsa -des3 -in $OLD_KEY -out $NEW_KEY
```

To remove a passphrase:

```bash
openssl rsa -in $OLD_KEY -out $NEW_KEY
```

To check that a passphrase is correct:

```bash
openssl rsa -check -in $NEW_KEY
```
