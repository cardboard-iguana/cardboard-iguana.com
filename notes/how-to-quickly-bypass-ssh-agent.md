# How to Quickly Bypass “ssh-agent”

```bash
env -u SSH_AUTH_SOCK -u SSH_AGENT_PID ssh -i $KEY_FILE ${USER}@${HOST}
```

- - - -

👤 Nathan Acks
📅 October 2, 2021
