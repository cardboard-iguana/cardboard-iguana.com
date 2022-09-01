# Get-WinEvent

author:: Nathan Acks  
date:: 2021-09-25

Get-WinEvent is a PowerShell command for working with Windows event logs.

```powershell
# Get help on Get-WinEvent (calls out to Microsoft).
#
Get-Help Get-WinEvent

# Filter event log output using the Where-Object command. This
# apparently pipes the entire output to the Where-Object command, which
# then scans for the appropriate field. So a bit inefficient for large
# logs.
#
Get-WinEvent -LogName Application | Where-Object {
	$_.ProviderName -Match 'WLMS'
}

# To match event IDs with Where-Object, use the slightly different form
# `Where-Object Id -eq  100`, etc.

# Use the -FilterHashtable flag. This causes the filtering to be done
# during the call made by Get-WinEvent, and has a more straight-forward
# syntax too. However, it only works when called against the system
# event log; Where-Object needs to be used when specifying an archived
# log via -Path.
#
# Note that hashes can be specified with newlines instead of semicolons
# as well, which can make scripts A LOT more readable!
#
Get-WinEvent -FilterHashtable @{
	LogName = 'Application';
	ProviderName = 'WLMS'
}

# To display all information about an event, pipe the output of
# Get-WinEvent to `Format-List -Property *`
```

* [TryHackMe: Windows Event Logs](tryhackme-windows-event-logs.md)
* [Get-WinEvent](https://docs.microsoft.com/powershell/module/microsoft.powershell.diagnostics/get-winevent)
* [Using PowerShell](powershell.md)
* [Windows Event Logs](windows-event-logs.md).

## FilterHashtable Keys

| Key Name     | Value Data Type | Wildcards Allowed? |
|:------------ |:--------------- |:------------------:|
| LogName      | String          |          Y         |
| ProviderName | String          |          Y         |
| Path         | String          |          N         |
| Keywords     | Long            |          N         |
| ID           | Int32           |          N         |
| Level        | Int32           |          N         |
| StartTime    | DateTime        |          N         |
| EndTime      | DateTime        |          N         |
| UserID       | SID             |          N         |
| Data         | String          |          N         |
| [NamedData]  | String          |          N         |

Event Viewer displays *most* of these values in the "General" when viewing an individual log entry, though note that Keywords is translated to a string.

* [Creating Get-WinEvent queries with FilterHashtable](https://docs.microsoft.com/powershell/scripting/samples/Creating-Get-WinEvent-queries-with-FilterHashtable)

### Keywords

| Name             | Value             |
|:---------------- | -----------------:|
| AuditFailure     |  4503599627370496 |
| AuditSuccess     |  9007199254740992 |
| CorrelationHint2 | 18014398509481984 |
| EventLogClassic  | 36028797018963968 |
| Sqm              |  2251799813685248 |
| WdiDiagnostic    |  1125899906842624 |
| WdiContext       |   562949953421312 |
| ResponseTime     |   281474976710656 |
| None             |                 0 |

### Levels

| Name          | Value |
|:------------- |:-----:|
| Verbose       |   5   |
| Informational |   4   |
| Warning       |   3   |
| Error         |   2   |
| Critical      |   1   |
| LogAlways     |   0   |
