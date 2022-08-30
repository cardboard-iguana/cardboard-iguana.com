# OffSec Live: PEN-200

author:: Nathan Acks  
date:: 2022-08-05

Today on OffSec Live we'll be covering Linux privilege escalation.

REFERENCES:

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)

## File Permissions

* Oh, I hadn't noticed this before, but the \*NIX read/write/execute bits are represented in that order in the permission bitmask, which is why `r` is `4`, `w` is `2`, and `x` is `1`. (Or, an easier mnemonic might be "they're read in *descending* order".)
* When using symbolic permissions with `chmod`, leaving off the `ugo` bit will result in the permission being applied to all three categories. For more complex expressions, different permission changes can be separated with a comma (`,`) - for example, `chmod ug+x,o-w file.txt`.

## The SUID & SGID Bits

* Find SUID files: `find / -type f -perm -u=s -ls 2>/dev/null`
* Not sure if a binary is normally SUID? Compare the results of the above command with the same output on your local (Linux) box.
* The presence of the SUID/SGID bit only *allows* a program to elevate its privileges to match its user/group - a call to `setresuid()` and/or `setregid()` (or work-alikes) is still required to actually perform the (presumably legitimate) privilege escalation!

REFERENCES:

* [How to Use "find" With File Metadata](../notes/how-to-use-find-with-file-metadata.md)
* [GTFOBins](https://gtfobins.github.io/)

## Exploiting the SUID Bit

* In the output of the `id` command, the `euid` and `egid` are the *effective* user and group IDs.
* When exploiting binaries that call other binaries, look for places where the absolute path has not been used and then see if you can manipulate the PATH so that a binary *you* control is called instead!
