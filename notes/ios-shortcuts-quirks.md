# iOS Shortcuts Quirks

* **author**:: Nathan Acks
* **date**:: 2021-05-11

In my experience, the "Add to variable" action is unreliable for appending text to strings; it seems to work to *create* a variable, but not actually for appends. However, "Set to variable" seems to be reliable, so a work-around is to set a whole bunch of variables and then use a "Text" action at the end of the workflow to assemble them as desired.
