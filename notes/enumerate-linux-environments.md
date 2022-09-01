# Enumerate Linux Environments

author:: Nathan Acks  
date:: 2022-04-22

* [2022-04-20 - ITPro.TV: CompTIA Security+ (SY0-601) & TryHackMe: Jr. Penetration Tester](../log/2022-04-20-itprotv-comptia-security-plus-and-tryhackme-jr-penetration-tester.md)
* [How to Find Executables with SUID Capabilities](how-to-find-executables-with-suid-capabilities.md)
* [How to Use "find" with File Metadata](how-to-use-find-with-file-metadata.md)
* [Using "netstat"](netstat.md)
* [Using "ps"](ps.md)
* [Enumerate "sudo" Access](enumerate-sudo-access.md)

## Useful Commands

* `cat /etc/issue`
* `cat /etc/passwd`
* `cat /proc/version`
* `env`
* `find`
* `getcap` - find and list executable *capabilities*
* `history`
* `hostname`
* `id`
* `ifconfig`
* `ip route`
* `ls`
* `netstat -ano` - list all listening parts and established connections, no domain resolution
* `netstat -i` - list per interface statistics
* `netstat -l` - list *only* listening ports
* `netstat -p` - list protocol and service information (requires root to see everything)
* `netstat -s` - list protocol statistics
* `ps auxfww` - show process tree
* `ps auxww` - show lots and lots of process info
* `sudo -l`
* `uname -a`

## Useful Scripts

* [LinPeas](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS)
* [LinEnum](https://github.com/rebootuser/LinEnum)
* [LES (Linux Exploit Suggester)](https://github.com/mzet-/linux-exploit-suggester)
* [Linux Smart Enumeration](https://github.com/diego-treitos/linux-smart-enumeration)
* [Linux Priv Checker](https://github.com/linted/linuxprivchecker)
