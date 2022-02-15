# Find and Replace a Single Line in a Large Text File

To [display a single line](http://stackoverflow.com/a/2796347) from a large text file:

```bash
sed -n "${LINE_NUMBER}{p;q}" $FILENAME
```

The `p` command prints matching lines, and the `q` command causes sed to quit after the first match.

You can’t use `q` if you want to print a block of lines, so you’ll just need to `^C` after the output is printed so that sed doesn’t keep needlessly reading the file.

```bash
sed -n "${START_LINE},${END_LINE}p" $FILENAME
```

If you want to replace a single line, you can use [a similar trick](http://stackoverflow.com/a/11145362) (once you’ve identified the line number):

```bash
sed -i "${LINE_NUMBER}s/.*/${REPLACEMENT_TEXT}/" $FILENAME
```

It may be advisable to use single quote here, rather than double quotes + variable substitution, to prevent shell weirdness. Unfortunately, there’s really no way to tell when this command has finished (except to let it work through the whole file).

- - - -

<span aria-hidden="true">👤</span> Nathan Acks
