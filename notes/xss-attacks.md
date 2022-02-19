# XSS (Cross Site Scripting) Attacks

## Tips for Writing JavaScript

JavaScript accepts back-ticks as a type of quotation mark, so we actually have three different marks to work with (single quote, double quote, and back-tick).

It’s worth noting that `<script/>` tags are automatically interpreted as JavaScript these days, so there's no need to add `type="application/javascript"` anymore. *However*, recent web browsers don't seem to reliably execute `<script/>` tags inserted after document load. Using the `onmouseover` or `onclick` attribute seems to work reliably (the `onload` attribute does not, however), though is obviously less useful.

## Filter Evasion

### Bypass `<script/>` Tag Removal

Use `onmouseover`, `onclick`, etc.

### Bypass Simple Word Filtering

In general, you can break up strings to get around this.

```javascript
alert("H" + "ello")
```

The `eval()` function can be used to turn strings into function names if a function is filtered.

```javascript
eval("a" + "lert")("Hello")
```

It’s also possible (and safer, though if we’re breaking into things we probably care a lot less about safety) to use `window[]`.

```javascript
window["a" + "lert"]("Hello")
```

For really heavy filtering, use something nutso like JSFuck.

(Note that things like the JavaScript Obfuscator Tool won't always remove functions and strings, as they tend to be geared more towards thwarting script analysis than bypassing filters.)

Sometimes filters are applied in a case-sensitive fashion. While JavaScript *is* case-sensitive, URL schemes, HTML tag names, and HTML tag attributes are case-*insensitive* (so, `javascript:` is treated the same as `javaSCRIPT:`, `onclick` is treated the same as `ONCLICK`, etc.).

### Using Iframes

Typically XSS attacks work by injecting `<script/>` tags, but it's also possible to inject JavaScript using the `<iframe/>` tag by setting the `src` attribute to the `javacript:` pseudo-protocol. For example:

```html
<iframe src="javascript:alert('XSS');"/>
```

Note, however, that JavaScript loaded in an `<iframe/>` won’t have access to the parent page’s DOM.

## Attacks

### Accessing Browser Cookies

Cookies can be accessed in JavaScript via `document.cookie`.

### Keylogging

```html
<script type="text/javascript">
	let l = "";  
	document.onkeypress = function (e) {
		l += e.key;
		console.log(l);
	}
</script>
```

This only logs to the browser console though; a real keylogger would send this information to an external server or some-such.

### Port Scanning

[An example JavaScript port scanner (possibly broken).](https://github.com/aabeling/portscan)

### Website Defacement

You can access elements of the DOM using `document.getElementById("element-id")` or `document.querySelector("#element-id")`. The `querySelector()` method is a bit more flexible (you can use CSS-style selectors here) and should probably be preferred.

To get/set the content of an element, use the `innerHTML` method (to insert HTML directly into the DOM), or alternately `innerText` or `textContent` to set element text *only*.

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [TryHackMe: Cross-Site Scripting](tryhackme-cross-site-scripting.md)
* [Document.cookie](https://developer.mozilla.org/docs/Web/API/Document/cookie)
* [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
* [JSFuck](http://www.jsfuck.com/)
* [JavaScript Obfuscator Tool](https://obfuscator.io/)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 8, 2021
