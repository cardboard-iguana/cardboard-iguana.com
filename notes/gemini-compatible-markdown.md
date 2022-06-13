# Gemini Compatible Markdown

author:: Nathan Acks  
date:: 2022-02-16

Gemini uses a syntax that is *almost* a subset of CommonMark.

Be aware that Gemini treats all line breaks literally and clients are expected to wrap text. Line breaks are also rendered literally. So, one paragraph = one line!

## Allowed Formatting Elements

The trick with Gemini formatting is to remember that the protocol is *line* oriented, so all formatting (including linking) is applied to the entire block. Inline formatting isn’t supported, but can be used to the extent that raw markdown is easily readable.

### Headings

Gemini allows H1 – H3 (`#` – `###`) headings.

Unlike HTML, Gemini *specifically allows* multiple H1 tags, as headings are treated purely as an outlining tool. This should probably be avoided in cases where a document might be rendered in both HTML and Gemini, as semantic HTML expects only a single H1 per content block.

In some cases, the first H1 tag in Gemini is treated as the page header (if it is not preceded by any other text with the exception of empty lines) and the following H2 is treated as a sub header (again, if there is no other intervening text except for blank lines).

### Strong/Emphasis & Inline Code

Gemini doesn’t explicitly support any formatting tags *within* a line. However, the convention of using single stars (\*) to denote emphasis and back-ticks (\`) to quote code is well established and can be used even in a “plain text” line without looking weird.

Instead of using two stars (\*\*) to denote bolded text, it’s probably better to use UPPER CASE for documents destined for Gemini.

Since Markdown requires that these characters be escaped, so text destined for Gemini will need to be processed to remove back-slashed escapes (\). Note that md2gmi can handle this automatically.

### Lists

Only *unordered* lists are permitted in Gemini, and no indentation is allowed. Lists *must* use star characters (\*) as their leaders.

### Quotes

Quote blocks cannot be nested in Gemini, and all interior formatting is preserved as-is. This means that in practice, quote blocks also can’t contain lists, code blocks, etc.

### “Code” Blocks

Gemini allows code blocks. In Gemini the code block type (normally something like `bash` or `html` in Markdown) is used by clients as “alt text”. Unfortunately, many Markdown processors (including Jekyll) don’t handle arbitrary strings in the code block type gracefully, so we need to stick with Markdown’s conventions here.

### “Code” Block Width

Getting the width of code blocks right is a bit tricky. As of February 16, 2022, here’s the maximum width of a line in a code block in Obsidian using the Minimal theme before wrapping occurs under a variety of circumstances:

| Test Case                                | Max Line Width |
|:---------------------------------------- | :-------------:|
| Desktop ½ width with sidebar             |       57       |
| Desktop without sidebar                  |       69       |
| iPad Pro horizontal                      |       62       |
| iPad Pro vertical with sidebar           |       49       |
| iPad Pro vertical without sidebar        |       62       |
| iPad Pro slide-over                      |       34       |
| iPhone 11 Pro vertical                   |       34       |
| iPhone 11 Pro horizontal without sidebar |       62       |

This all actually suggests that 57 – 62 characters is a reasonable target for wrapping (I kind of wish it was 72, but *c’est la vie*).

### Tables

The md2gmn utility handles tables by converting them into code blocks, which works for my purposes.

## Links & Images

Gemini doesn’t support Markdown links or images, though tools like md2gmn can handle the conversion into Gemini’s format.

```
=>[<whitespace>]<URL>[<whitespace><USER-FRIENDLY LINK NAME>]
```

I’ve yet to run into a Markdown-to-Gemini converter that handles inline links in a completely sensible way. That said, md2gmn does a good job *if and only if* links are presented as unordered lists or on singleton lines. Note that when using this convention, *no* non-link characters (except perhaps for the leading `* ` in unordered lists) may be used. This means that presenting links in unordered lists is probably the best option.

As an example, suppose we have the following markdown:

```markdown
This is a sentence.

* [necopinus.xyz](https://necopinus.xyz)
* [Cardboard Iguana Security](https://cardboard-iguana.com)

An image follows.

![This is some image alt-text](../02779186c69ce442260bd67d3bd11b3e.webp)
```

Then md2gmn will output:

```gemini
This is a sentence.

=> https://necopinus.xyz necopinus.xyz
=> https://cardboard-iguana.com Cardboard Iguana Security

An image follows.

=> ../02779186c69ce442260bd67d3bd11b3e.webp This is some image alt-text
```

Incidentally, this gives good guidance as to how to write image alt-text — alt-text should be thought of as the *linked text* for the image.

## References

* [Project Gemini Speculative Specification](gemini://gemini.circumlunar.space/docs/specification.gmi)
* [CommonMark Spec](https://spec.commonmark.org/current/)
* [tdemin / gmnhg](https://github.com/tdemin/gmnhg)
* [Jekyll](https://jekyllrb.com/)
* [Obsidian](https://obsidian.md)
* [kepano / obsidian-minimal](https://github.com/kepano/obsidian-minimal)
