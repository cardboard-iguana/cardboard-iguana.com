# Enumerate NFS Shares

## NMAP

NFS shares can be enumerated by [nmap](nmap.md) during scanning:

```bash
nmap -v -sT --script nfs-ls,nfs-statfs,nfs-showmount -p$PORT $IP
```

Normally `$PORT` is 111.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

👤 Nathan Acks  
📅 November 5, 2021
