# Gemini Compatible Markdown

Gemini uses a syntax that is *almost* a subset of [CommonMark](https://spec.commonmark.org/current/).

Be aware that Gemini treats all line breaks literally and clients are expected to wrap text. Line breaks are also rendered literally. So, one paragraph = one line!

## Allowed Formatting Elements

### Headings

Gemini allows H1 – H3 (`#` – `###`) headings.

Unlike HTML, Gemini *specifically allows* multiple H1 tags, as headings are treated purely as an outlining tool. This should probably be avoided in cases where a document might be rendered in both HTML and Gemini, as semantic HTML expects only a single H1 per content block.

In some cases, the first H1 tag in Gemini is treated as the page header (if it is not preceded by any other text with the exception of empty lines) and the following H2 is treated as a sub header (again, if there is no other intervening text except for blank lines).

### Strong/Emphasis & Inline Code

Gemini doesn’t explicitly support any formatting tags *within* a line. However, the convention of using single stars (\*) to denote emphasis and back-ticks (\`) to quote code is well established and can be used even in a “plain text” line without looking weird.

Instead of using two stars (\*\*) to denote bolded text, it’s probably better to use UPPER CASE for documents destined for Gemini.

Note that Markdown requires that these characters be escaped, so text destined for Gemini will probably need to be processed to remove back-slashed escapes (\\).

### Lists

Only *unordered* lists are permitted in Gemini, and no indentation is allowed. Lists *must* use star characters (\*) as their leaders.

### Quotes

Quote blocks cannot be nested in Gemini, and all interior formatting is preserved as-is. This means that in practice, quote blocks also can’t contain lists, code blocks, etc.

### “Code” Blocks

Gemini allows code blocks. Because these are specifically geared towards ASCII-art, the code block type in Gemini (normally `bash` or `html` or some-such in Markdown) is used by clients as “alt text”. Since the type isn’t rendered when converting Markdown to HTML either (though some engines use it as a “hint” for how to render this text), it’s safe to use this convention in plain Markdown documents as well, so long as you *don’t* need to designate a code type.

## Links & Images

Gemini doesn’t support Markdown links or images, though tools like [`md2gmn`](https://github.com/tdemin/gmnhg#md2gmn) can handle the conversion into Gemini’s format.

```Gemini link structure
=>[<whitespace>]<URL>[<whitespace><USER-FRIENDLY LINK NAME>]
```

That said! I’ve yet to run into a Markdown-to-Gemini converter that handles links in a completely sensible way. It may be best to write all links in a Markdown document destined for Gemini as reference links with sensible page titles and then convert these to Gemini format using a custom script. Ideally we’d want to convert something like this:

```markdown
This is a sentence with [two][1] [links][2] in it.

[1]: https://necopinus.xyz "necopinus.xyz"
[2]: https://cardboard-iguana.com "Cardboard Iguana Security"

![This is some image alt-text](../02779186c69ce442260bd67d3bd11b3e.webp)
```

To something like this:

```gemini
This is a sentence with two [1] links [2] in it.

=> https://necopinus.xyz [1]: necopinus.xyz
=> https://cardboard-iguana.com [2]: Cardboard Iguana Security

=> ../02779186c69ce442260bd67d3bd11b3e.webp 🖼️ This is some image alt-text
```

## References

* [Project Gemini Speculative Specification](gemini://gemini.circumlunar.space/docs/specification.gmi)

- - - -

👤 Nathan Acks  
📅 February 12, 2022
