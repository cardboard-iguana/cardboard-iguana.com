# Quick-n-Dirty Python Web Server

Serve files out of the current directory over HTTP using Python 3:

```bash
python3 -m http.server $PORT
```

The default $PORT is 8080.

```Useful python3 http.server flags
--bind ADDRESS, -b ADDRESS
        Specify alternate bind address [default: all interfaces]
--directory DIRECTORY, -d DIRECTORY
        Specify alternative directory [default: current directory]
```

## References

* [How to make a simple HTTP server using python?](https://spoofing.medium.com/how-to-make-a-simple-http-server-using-python-ea35f0b741a4)

- - - -

👤 Nathan Acks
📅 September 16, 2021
