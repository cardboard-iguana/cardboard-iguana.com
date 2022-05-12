# Using PowerShell

## Access the Registry Through PowerShell

You can actually access the registry from PowerShell using the `cd` command: `cd HKLM:\` will take you to the HKEY_LOCAL_MACHINE hive, for instance.

Major hives:

* HKEY_CLASSES_ROOT
* HKEY_CURRENT_USER
* HKEY_LOCAL_MACHINE
* HKEY_USERS
* HKEY_CURRENT_CONFIG

## Accessing Windows Logs

Use the Get-WinEvent cmdlet.

## Download a File

```powershell
Invoke-WebRequest -Uri $URL_OF_FILE -OutFile $FILE_ON_DISK
```

## Manipulating Services

* `Get-Service` — list all services, or drill down on a particular service.
* `Start-Service -Name $SERVICE`/`sc start $SERVICE` — start $SERVICE.
* `Stop-Service -Name $SERVICE`/`sc stop $SERVICE` — stop $SERVICE.

## Run PowerShell from cmd.exe

```bat
powershell -c "$COMMAND"
```

## Calculating File Hashes

```powershell
Get-FileHash -Algorithm $ALGORITHM $FILE_PATH
```

The algorithm can be excluded (in which case SHA-256 is used). *Lots* of different hashing algorithms are supported — run `help Get-FileHash` to see a list.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [Get-WinEvent](get-winevent.md)
* [TryHackMe: MAL: Researching](tryhackme-mal-researching.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 25, 2021
