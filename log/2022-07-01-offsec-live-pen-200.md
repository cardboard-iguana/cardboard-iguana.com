# OffSec Live: PEN-200

author:: Nathan Acks  
date:: 2022-07-01

Today's session is more interactive/follow-along, which I'm not able to do because I'm not actually a PEN-200 student. But they're having *a lot* of technical problems, so many fewer notes than normal.

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [OffSecOfficial Twitch Channel](https://www.twitch.tv/offsecofficial)

# Reverse vs. Bind Shells

Another way of thinking of reverse vs. bind shells - who's serving the local shell? *That's* the system that's being attacked. Look at the *other* system: If that system is listening then it's a reverse shell, and if it's connecting out then it's a bind shell.

# Burp Suite

In the Burp Suite Intruder, you can use the "Recursive Grep" to extract the values from the *previous* request to use in the current request. Note that this is not compatible with using multiple threads.
