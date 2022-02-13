# TryHackMe: Pre Security

## A Bit of Background on Linux

The first release of [Linux](https://en.wikipedia.org/wiki/Linux) was on September 17, 1991.

## General/Useful Utilities

Quick-n-dirty Python 3 web server:

```bash
python3 -m http.server
```

## Processes 101

Selected Linux process signals:

| Signal  | Description                                                        |
|:------- |:------------------------------------------------------------------ |
| SIGTERM | Kill the process, but allow it to do some cleanup tasks beforehand |
| SIGKILL | Kill the process - doesn’t do any cleanup after the fact           |
| SIGSTOP | Stop/suspend a process                                             |

- - - -

👤 Nathan Acks
📅 September 16, 2021