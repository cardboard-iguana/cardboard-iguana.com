# Extract the Webpage Title of a URL

```bash
python3 -c "import bs4, requests; print(bs4.BeautifulSoup(requests.get('$URL').text).title.text)"
```

This needs the python3-bs4 package on Debian-based distribution. Note that we use the .text method  instead of .content to ensure that we get back a unicode string (rather than just the raw bytes, which can and will get mangled by anything you pipe this into).

NOTE: This won’t work on webpages for sites like Twitter that set the `<title/>` using JavaScript after initial page load.

## References

* [How do I get a websites title using command line?](https://unix.stackexchange.com/a/563920)
* [Python Requests and Unicode](https://stackoverflow.com/a/12843406)
* [Requests Developer Interface: class requests.Response](https://docs.python-requests.org/en/latest/api/#requests.Response)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks
