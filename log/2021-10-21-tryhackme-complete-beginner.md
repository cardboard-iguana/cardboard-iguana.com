# TryHackMe: Complete Beginner

* **author**:: Nathan Acks  
* **date**:: 2021-10-21

## Blue

### Recon

The `--script vuln` flag can be used with nmap to detect many (potential) vulnerabilities.

Note that if you `use` a Metasploit payload module and then switch to an exploit module, the exploit will pick up on the configured payload. You can also set a payload directly with `set PAYLOAD`.

### Find Flags!

The Windows system root is symbolically represented as %SYSTEMROOT%; it's normally C:/Windows. (But it turns out that for the first flag, TryHackMe *actually* means C:/.)

The Windows SAM database (passwords) is stored in %SYSTEMROOT%/System32/config. Note that Meterpreter is case-sensitive, event though the Windows filesystem is not!
