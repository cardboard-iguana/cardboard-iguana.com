# TryHackMe: Web Fundamentals

## Avengers Blog

### SQL Injection

Three things to remember when attempting SQLi:

* When injecting code, you'll *often* want to end with a trailing "` --`" (space-dash-dash) in order to *comment out* the remainder or the line you're injecting into.
* Remember that the canonical SQL injection "test" is "`' or 1 = 1 --'`"  (close out the user data input, insert condition that's always true, and comment out the rest of the command). But, of course sometimes there might be a quoting difference, and sometimes you might want a *false* statement (`and 1 = 0`), and sometimes commenting out the remainder of the statement will break things...
* You don't necessarily know *how* user inputs are going to be processed on the backend. Sometimes its one query. Sometimes it's multiple queries. This means that you sometimes need to inject SQL into *multiple* fields (particularly when trying to subvert a login).

- - - -

👤 Nathan Acks
📅 January 26, 2022
