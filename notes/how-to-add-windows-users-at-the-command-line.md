# How to Add Windows Users (at the Command Line)

**author**:: Nathan Acks  
**date**:: 2021-10-29

```powershell
net user $USERNAME $PASSWORD /add
net localgroup administrators $USERNAME /add
```

This requires SYSTEM privileges or an administrator account.

It's worth noting that users added via `net user` seem to bypass Windows' password policies…

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
