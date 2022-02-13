# TryHackMe: Web Fundamentals

## Burp Suite: Other Modules

### Hashing

[Burp Suite](../notes/burp-suite.md) displays hashes in the "Hex" view by default; to convert them into the (hex) ASCII string you're used to, encode this output as "ASCII Hex".

### Sequence Overview

Sequencer is a tool for analyzing the entropy of a collection of tokens. Tokens can either be loaded in from a manual list, or "live" captured with the help of an example query imported from another module.

### Live Capture

It can take *a lot* of tokens to run a reasonable entropy analysis; generally you'll want something north of 10,000 examples (so, probably not something you can generate just by browsing around normally!).

Manual analysis can be conducted after the capture has either been stopped or paused. Alternately, checking the "Auto analyze" box will cause [Burp Suite](../notes/burp-suite.md) to run an analysis after every 2500 captures.

## Burp Suite: Extender

### The Extender Interface

The Extender tab allows [Burp Suite](../notes/burp-suite.md) modules to be loaded from from disk. Requests are passed through *all* modules, from top to bottom.

### The BApp Store

Modules provided by the [Burp Suite](../notes/burp-suite.md) App Store can be accessed and installed through the "BApp Store" tab. Extensions installed through this route can actually modify parts of the [Burp Suite](../notes/burp-suite.md) interface (adding new tabs, etc.).

- - - -

👤 Nathan Acks  
📅 January 10, 2022
