# Enumerate NFS Shares

author:: Nathan Acks  
date:: 2021-11-05

NFS shares can be enumerated by nmap during scanning:

```bash
nmap -v -sT --script nfs-ls,nfs-statfs,nfs-showmount \
     -p$PORT $IP
```

Normally `$PORT` is 111.

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [Using "nmap"](nmap.md)
