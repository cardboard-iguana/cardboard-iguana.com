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

Use the [Get-WinEvent](get-winevent.md) cmdlet.

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

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 14, 2021
