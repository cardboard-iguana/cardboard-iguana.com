# How to Quickly Bypass “ssh-agent”

```bash
env -u SSH_AUTH_SOCK -u SSH_AGENT_PID \
	ssh -i $KEY_FILE ${USER}@${HOST}
```

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 2, 2021
