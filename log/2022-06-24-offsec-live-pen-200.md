# OffSec Live: PEN-200

author:: Nathan Acks  
date:: 2022-06-24

While I don’t think I’m quite ready yet to take a crack at the OSCP, Offensive Security’s free streaming classes (“OffSec Live”) seem like too good of a deal to pass up. I wasn’t able to catch the first because I was traveling, but I’ll be watching (and taking notes on) as many other sections as I can moving forward.

REFERENCES:

* [PEN-200](https://www.offensive-security.com/pwk-oscp/)
* [OffSec Live](https://www.offensive-security.com/offsec/offsec-live/)
* [OffSec Live FAQ](https://help.offensive-security.com/hc/en-us/articles/6702904332564-OffSec-Live-FAQ)
* [OffSecOfficial Twitch Channel](https://www.twitch.tv/offsecofficial)

## Terminal Best Practices

(I hopped on a few minutes late, unfortunately…)

### File Descriptors

* STDIN = 0
* STDOUT = 1
* STDERR = 2

I always forget that redirects work both ways:

```bash
# Redirect dmesg to an external file.
#
dmesg > boot.log

# Push boot.log into cat, and output with line numbers.
#
cat -n < boot.log
```

This, incidentally, makes the “heredoc” syntax a little more explicable — it’s basically “appending” text to the `<` redirect.

```bash
# “Heredoc”, which I always forget about.
#
cat -n << EOF
Line A
Line B
Line C
EOF

# Also, redirect “heredoc” into a file.
#
cat << EOF > file.txt
Line A
Line B
Line C
EOF
```

Handy shortcut to clear the current terminal screen: `CTRL+K`.

`CTRL+SHIFT+D` will (horizontally) split the default terminal in Kali Linux; `CTRL+SHIFT+R` will split the default terminal vertically. Use `CTRL+SHIFT+E` to close a pane. That said, the separation between the created panes is much less clear than with Tmux.

Handy command: `watch` will periodically run a program (specify the interval with `-n`) and display the output in the terminal.

The extended regexp function with `grep` (`-E`) does *not* require the use of parentheses if you’re looking for a single “or” (for example, `grep -E "kali|root" /etc/passwd`).

Another trick: `cut` supports *negative* numbers to count fields from the right, rather than the left.