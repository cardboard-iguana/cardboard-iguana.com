# OffSec Live: PEN-200

author:: Nathan Acks  
date:: 2022-07-27

OffSec Live has apparently moved to Zoom. 😕

(It's definitely a smoother experience as a viewer, but the chat is more limited and I miss being able to throw it up on the TV.)

# Local File Inclusion (LFI)

While you *can* try to estimate how many directories you need to ascend (`../` leaders), keep in mind that ascending at `/` *doesn't* result in an error and instead just returns `/`. So the fastest strategy here is just to add a *bunch* of `../` leaders, since if we overshoot things will still work.

Rather than *replacing* image uploads with PHP files we want to include, you can often get more mileage by *prepending* the code you want to execute to the image file. This will generally still work for LFI, but will also bypass some server-side filtering.

Keep in mind that `-e` and `-c` are generally disabled in stock versions of netcat.

# Remote File Inclusion (RFI)

RFI doesn't work on newer versions of PHP (at least out-of-the-box), as the configuration directives `allow_url_open` and `allow_url_include` need to be enabled. But sometimes people still turn these on...

If RFI is possible, it works basically like LFI (except that you're pulling your code from a remote server, rather than something you upload).

Remember to encode your URL variables!

Be careful when serving up files for RFI so that your machine doesn't process the file for you! (Otherwise, for example, you can try to serve up a PHP file, have it get processed by your *local* web server, and wind up with a reverse shell on your own box!) One way around this is to use a webserver that won't process the file you're trying to serve - Python to serve up PHP code, etc.

A shout-out here to using ngrok to get a public IP.

* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [Join OffSec Live](https://learn.offensive-security.com/offsec-live-webinars)
* [Reverse Shell Generator](https://www.revshells.com/)
* [Using "netcat"](../notes/netcat.md)
* [ngrok](https://ngrok.com/)
