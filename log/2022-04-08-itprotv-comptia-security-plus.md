# ITPro.TV: CompTIA Security+ (SY0-601)

## Non-Persistence Concepts

Ways of restoring OS failures:

* Returning to the “last known good” state (revert boot configuration, but no OS data/applications).
* Reverting to a previous “known state” (revert all configurations and operating system files).
* Reverting to a snapshot (most common in VMs; reverts all data on disk).

Note that Windows writes the “last known good” state during the first login after a boot. “Known state” in Windows refers to “system restore points”.

Interesting idea here: Using PXE boot to pull recovery/live images over the network for forensics/troubleshooting.

## Backup And Recovery

Archive bits are only used on Windows, OS/2, and Amiga.

* [Archvie bit (Wikipedia)](https://en.wikipedia.org/wiki/Archive_bit)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 8, 2022
