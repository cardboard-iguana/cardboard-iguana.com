# Loop Over File Names With Spaces in Bash

```bash
while IFS= read -d '' -r FILE; do
	# Do stuff with $FILE
done < <(find $DIR -type f -print0)
```

The advantage this has over other approaches is that it doesn’t create a subshell, so you can use variables set within the loop elsewhere.

Note that we need to temporarily override IFS because our list is null-separated (`-print0`), and that a space between the `-d` and the `''` (an empty string, which Bash interprets as the null character) is *required*.

## References

* [Looping through find output in Bash where file name contains white spaces](https://stackoverflow.com/a/23748641)

- - - -

👤 Nathan Acks
