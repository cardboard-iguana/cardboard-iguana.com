# How to Add Windows Users (at the Command Line)

```powershell
net user $USERNAME $PASSWORD /add
net localgroup administrators $USERNAME /add
```

This requires SYSTEM privileges or an administrator account.

It’s worth noting that users added via `net user` seem to bypass Windows’ password policies…

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 29, 2021
