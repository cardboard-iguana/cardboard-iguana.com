# How to Quickly Bypass “ssh-agent”

author:: Nathan Acks  
date:: 2021-10-02

```bash
env -u SSH_AUTH_SOCK -u SSH_AGENT_PID \
	ssh -i $KEY_FILE ${USER}@${HOST}
```
