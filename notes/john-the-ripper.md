# Using John the Ripper

author:: Nathan Acks  
date:: 2021-10-13

```bash
john --format=$HASH_FORMAT \
     --wordlist=$WORDLIST $PASSWORD_HASH_FILE
```

Using the `--format` option is recommended, as many different hash formats have the same basic appearance, which make's john's attempt to guess the hash format without this information somewhat unreliable. John can only crack one type of hash at a time - no mixing-and-matching of hash formats. Use `--list=formats` to see available formats.

John the Ripper can accept the output of hashdump from Metasploit (use `--format=NT`).

NOTE: John the Ripper records cracked hash:password tuples in `~/.john/john.pot`, and then references this file to avoid cracking known hashes. It *doesn't* output these passwords again (instead simply declaring "[n]o password hashes left to crack"), so if you get no output then you'll want to just grep for your hash in john.pot.

* [Kali Hashcat and John the Ripper Crack Windows Password hashdump](https://pentesthacker.com/2020/12/27/kali-hashcat-and-john-the-ripper-crack-windows-password-hashdump/)
* [Using Metasploit](metasploit.md)

## Single Crack Mode

John's "single crack mode" (`--single`) is just about exploiting bad password practice - basing passwords off of the username, or details of the operating system. It can be used over "unshadowed" UNIX-style passwords (in which case it will exploit not only the username, but data from other GECOS fields), or on single hashes (in which case the hash must be written as USERNAME:HASH so that john has something to go off of).

Obviously, a wordlist is not required in single crack mode.

## Custom Rules

People typically add "complexity" to a password by appending or prepending the required numbers and symbols (capital letters generally live on either the beginning or end of the password).

John's rules can be used to construct additional permutations of a wordlist to cover these cases. The rule syntax isn't really covered in the TryHackMe room, but seems to be just close enough to regexes to be annoying. Examples can be found in /etc/john/john.conf; the comments make for interesting reading.

## Helper Applications

`hash-identifier` will indicate what hash types match the data in `$PASSWORD_HASH_FILE`. Use this + information about the province of the hashes to choose a likely format. Also useful in conjunction with Hashcat. (Note that the hash names used by `hash-identifier` do *not* correspond to those used by John the Ripper.)

`unshadow` transforms `/etc/passwd` + `/etc/shadow` files (or matching subsets of these files) into a format john understands (note that `--format` is not generally necessary when having john crack the output on unshadow, as UNIX password hashes already specify their type).

`zip2john` extracts information from encrypted zip files in a format suitable for john to ingest.

`rar2john` extracts information from encrypted rar files in a format suitable for john to ingest.

`python2 /usr/share/john/ssh2john.py` extracts information from encrypted SSH key files in a format suitable for john to ingest. Note that john is susceptible to false positives when cracking ssh keys, and will thus try the entire provided wordlist (just in case!).

* [Using Hashcat](hashcat.md)
* [Linux (and BSD) Password Hashes](linux-and-bsd-password-hashes.md)
