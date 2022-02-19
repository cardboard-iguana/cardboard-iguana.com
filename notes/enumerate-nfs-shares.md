# Enumerate NFS Shares

## NMAP

NFS shares can be enumerated by nmap during scanning:

```bash
nmap -v -sT --script nfs-ls,nfs-statfs,nfs-showmount \
     -p$PORT $IP
```

Normally `$PORT` is 111.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [Using “nmap”](nmap.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 5, 2021
