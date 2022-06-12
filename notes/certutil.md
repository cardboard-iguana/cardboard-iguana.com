# Using “certutil”

## Calculating File Hashes

```powershell
CertUtil -hashfile $FILE_PATH $ALGORITHM
```

The algorithm can be excluded (in which case SHA1 is used).

## Enumerating AD CS Templates

AD CS is AD’s PKI, and is used on the back end for everything from provisioning disk encryption keys to user authentication. Certificate templates are a way to automate the certificate request process: Rather than an admin approving all CSRs manually, AD CS checks to see if a relevant “template” (which is really a template + associated settings + an access policy) exists that matches the supplied CSR and is configured to allow the requesting user to generate a certificate.

Enumerate all certificate templates from a domain-joined computer and domain-authenticated user:

```powershell
certutil -v -template
```

* We need to be able to actually request a certificate. This is indicated by an `Allow Enroll` or `Allow Full Control` permission that has been assigned to a group or user you have access to.
* The certificate needs to be usable for Kerberos authentication. This is true when the “Enhanced Key Usage” extension allows for “Client Authentication”.
* We need to be able to set the certificate’s “Subject Alternative Name”. This is indicated by `TemplatePropSubjectNameFlags` (a.k.a. `CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT`) being set to `1`.

(There are actually some other requirements — like fully automated certificate provisioning — but *by default* these are all satisfied.)

If a certificate has the following properties, then we can use it to create a certificate in the name of another user and then *forge* Kerberos tickets for that user with a tool like Rubeus.

## References

* [TryHackMe: MAL: Researching](tryhackme-mal-researching.md)
* [2022-05-10 - TryHackMe: Jr. Penetration Tester (Supplements)](../log/2022-05-10-tryhackme-jr-penetration-tester-supplements.md)
* [SpectreOps: Certified Pre-Owned](https://posts.specterops.io/certified-pre-owned-d95910965cd2)
* [Kerberos](kerberos.md)
* [Using Rubeus](rubeus.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> May 11, 2022
