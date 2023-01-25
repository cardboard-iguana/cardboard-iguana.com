# TryHackMe: Complete Beginner

* **author**:: Nathan Acks  
* **date**:: 2021-09-29

## Network Services

### Understanding SMB

Huh. Apparently you can share serial ports using SMB?!?

### Enumerating SMB

Typical NMAP portscan output for SMB:

```
PORT    STATE SERVICE      REASON
139/tcp open  netbios-ssn  syn-ack
445/tcp open  microsoft-ds syn-ack
```

### Exploiting SMB

```bash
smbclient //$IP/$SHARE -U $USER -p $PORT
```

The -p directive is only necessary if working over a non-standard port (e.g., *not* 445). The interface is reminiscent of old-school FTP clients.

Quick-n-dirty way to bypass a running SSH agent:

```bash
env -u SSH_AUTH_SOCK -u SSH_AGENT_PID \
	ssh -i $KEY_FILE ${USER}@${HOST}
```
