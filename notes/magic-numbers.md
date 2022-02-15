# Magic Numbers

Magic numbers comprise the first few bytes of a file (often, but not always, the first 4 bytes). Text files don't have magic number, so one trick you can do is just insert four ASCII characters in the front of your file and then use a hex editor to change them to an appropriate magic number.

The `hexeditor` app is a quick-and-easy hex editor, and `file` can give you a sense of whether you've effectively spoofed a file's magic number.

Note that this can be a lot trickier if you're not dealing with PHP, since many languages don't have PHP's concept of interpreted vs. non-interpreted bits. In these cases, you’ll need to intercept the upload request and remove the extra bytes, less you end up with an unexecutable reverse shell!

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 9, 2021
