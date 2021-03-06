# OffSec Live: PEN-200

author:: Nathan Acks  
date:: 2022-07-08

## Common Failure Modes

Common early failure modes with information gathering:

* Failing to focus on exploring machines and networks and jumping into hacking too soon. Your *first* priority (and the *majority* of time you’ll spend in an engagement) is to understand the machine/network you’re in!
* Avoid rabbit holes. Basically, be wary of the sunk cost fallacy / tunnel vision.
* Making assumptions about how things are supposed to work.

The big lesson here is to be careful and methodical about your time. The recommendation here is to use time boxing for tasks to both avoid rabbit holes and make sure you spend enough time on information gathering.

Another suggestion: Create (and update) a network map *by hand* to keep track of where you are in the information gathering & attack process.

## Active Information Gathering

* `filecap`: Check the privileges attached to a file in Linux.
* Use nmap’s `--open` flag to only report back machines with open ports (use in conjunction with `-p`).
* `uniq` in Linux is like `sort -u`, except that it doesn’t sort (it just removes duplicates).
* When performing enumeration with nmap, it’s best to apply vulnerability scanning scripts incrementally. For example, if SMB user enumeration fails, most of the other SMB vulnerability scanning scripts will themselves be non-functional. Proceeding incrementally may take long for wide-open hosts, but will actually *save* time in (more) realistic scenarios where some security has been applied.
* Use nmap’s `--script-help` flag to pull a given script’s documentation header.
* Use nmap’s `-iL` flag to pull a list of IPs to scan from a file.

## References

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [OffSecOfficial Twitch Channel](https://www.twitch.tv/offsecofficial)
* [Using “nmap”](../notes/nmap.md)
