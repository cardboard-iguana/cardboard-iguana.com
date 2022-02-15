# SQL Injection

* SQL injection is *most* common in PHP-based apps (though other languages are also vulnerable).
* The canonical SQL injection "test" is to input a single quote and see if that generates an error. Remember, though, that there are *three* different kinds of quotes you may need to test!
* When injecting code, you'll *often* want to end with a trailing "` -- `" (space-dash-dash-space) in order to *comment out* the remainder or the line you're injecting into. Generally "` --+`", "` --%20`", or "` -- -`" will be needed in practice to prevent the trailing space from being eaten. (Sometimes you don't even need the trailing comment, if the value you're injecting into is at the end of a statement...)
* You don't necessarily know *how* user inputs are going to be processed on the backend. Sometimes its one query. Sometimes it's multiple queries. This means that you sometimes need to inject SQL into *multiple* fields (particularly when trying to subvert a login).
* Similarly, sometimes a developer might get "clever" and try to error out on trailing comments. If you suspect that's happening, just add something after the trailing ` -- ` -- it's all a comment, after all!

## Types of SQLi

### Error-Based

Error-based SQLi retrieves data from the backend by abusing error messages. This obviously requires that error messages are shown to the end user, and is limited to information gathering.

### Boolean-Based

Boolean-based SQLi involves monitoring changes in responses to see if a query has executed or failed. The only reason you'd generally do this is if you're doing SQLi blind (where you don't get any output, or the output you do get isn't strongly coupled with the input query).

Obviously, this requires that either the HTTP response code or payload changes depending on the results of the injection... (Some frameworks try to make blind SQLi difficult by using redirects, but it's possible -- though a pain -- to get around this with [Burp Suite](burp-suite.md)).

One way this can be useful more generally is by using something like `AND (SELECT COUNT(*) FROM table_name) > 0` to probe for the existence/use of `table_name`.

### Union-Based

Union-based SQLi is basically just abusing the SQL UNION keyword.

To determine the number of columns in a table you'll need to use a sequence of UNION clauses until you run into and error.

* `' UNION SELECT NULL -- `
* `' UNION SELECT NULL, NULL -- `
* `' UNION SELECT NULL, NULL, NULL -- `
* ...and so on until there's an error...

A similar approach can be used to detect column types.

* `' UNION SELECT 'a', NULL, NULL -- `
* `' UNION SELECT NULL, 'a', NULL -- `
* `' UNION SELECT NULL, NULL, 'a' -- `
* ...and so on...

The generalization to other data types is straight-forward.

Useful MySQL keywords:

* `database()`
* `user()` and `current_user()`
* `version()` or `@@version`

It's worth checking out the [Jurassic Park](tryhackme-jurassic-park.md) CTF for an example of how to use union-based SQLi (it's a little hard to summarize).

## References

* [TryHackMe: Web Fundamentals](tryhackme-web-fundamentals.md)
* [TryHackMe: SQL Injection](tryhackme-sql-injection.md)
* [MySQL Subquery](https://www.mysqltutorial.org/mysql-subquery/)
* [TryHackMe: Game Zone](tryhackme-game-zone.md)
* [Jurassic Park](tryhackme-jurassic-park.md)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> January 30, 2022
