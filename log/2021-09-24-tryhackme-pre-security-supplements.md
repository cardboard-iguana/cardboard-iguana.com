# TryHackMe: Pre Security (Supplements)

## Core Windows Processes

### wininit.exe

The “Windows Initialization Process”. Launches:

* Service Control Manager (services.exe)
* Local Security Authority (lsass.exe)
* Credential Guard and Key Guard (lsaiso.exe)

The last of these in only run if “Credential Guard” is turned on.

All of these are system processes that live in session 0.

### wininit.exe > services.exe

The “Service Control Manager”, well, manages all services.

Service information lives in HKLM/System/CurrentControlSet/Services.

The Service Control Manager can be interacted with via the user-side utility sc.exe, or via the Services snap in services.msc.

The Service Control Manager is also responsible for loading (user-mode?) device drivers.

### wininit.exe > services.exe > svchost.exe

Most built-in Windows services are actually DLLs that are hosted by the “Service Host”, svchost.exe. For services spawned in this way, svchost.exe loads the DLL specified in the ServiceDLL key of HKLM/SYSTEM/CurrentControlSet/Services/${SERVICE_NAME}/Parameters.

On versions of Windows prior to Windows 10, as well as on Windows 10 with less than 3.5 GB of memory, multiple services are run by a single instance of svchost.exe. If Windows 10 has more than 3.5 GB of memory, however, it implements strong process isolation with each svchost.exe process hosting only a single service.

Services started with the same “key identifier” (-k switch) will share the same svchost.exe process; every copy of svchost.exe started by services.exe will use the -k parameter.

### lsass.exe

The “Local Security Authority Subsystem Service” (lsass.exe) is in charge of enforcing system security policies:

* Verifies the user logging in;
* Handles password changes;
* Creates access tokens (for domain-joined machines using SAM, AD, and NETLOGON);
* Writes the Windows security log.

Authentication packages available to lsass.exe are specified in HKLM/System/CurrentControlSet/Control/Lsa.

This is the process targeted by mimikatz.

### winlogon.exe

The user-side counterpart for wininit.exe is winlogon.exe. Responsibilities:

* User logins (the login window?);
* Loading the user profile;
* The secure user prompt (Ctrl+Alt+Delete and presumably UAC prompts);
* Screen locking.

Loading the user profile on logon is handled by pushing the contents of NTUSER.DAT into HKCU (so NTUSER.DAT must be a registry file) and spawning the userinit.exe service (which handles spawning the user’s shell, and I’m guessing other user startup services, before self-terminating).

### explorer.exe

The user’s shell is typically the Windows Explorer, which renders the desktop and task bar as well as providing the actual file explorer.

The user shell is defined in HKLM/Software/Microsoft/Windows NT/CurrentVersion/Winlogon/Shell.

- - - -

👤 Nathan Acks  
📅 September 24, 2021
