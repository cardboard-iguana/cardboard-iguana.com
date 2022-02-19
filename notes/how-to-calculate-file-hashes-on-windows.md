# How to Calculate File Hashes on Windows

```powershell
# Using CertUtil
#
CertUtil -hashfile $FILE_PATH $ALGORITHM

# Using Get-FileHash
#
Get-FileHash -Algorithm $ALGORITHM $FILE_PATH
```

In both cases, the algorithm can be excluded (in which case SHA1 is used for CertUtil and SHA-256 is used for Get-FileHash). *Lots* of different hashing algorithms are supported — run `help Get-FileHash`, etc. to see a list.

## References

* [TryHackMe: MAL: Researching](tryhackme-mal-researching.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 25, 2021
