# Using "net"

* **author**:: Nathan Acks
* **date**:: 2022-08-24

The Windows `net` command is an older (but still useful) CLI multitool.

* `net users` - enumerate all local users
* `net user $USER` - retrieve information about the *local* user `$USER`
* `net users /domain` - enumerate domain users
* `net user $USER /domain` - retrieve information about the *domain* user `$USER`
* `net localgroup` - enumerate local groups
* `net localgroup $GROUP` - show members of local group `$GROUP` (try with `administrators`!)
* `net group /domain` - enumerate domain groups
* `net group $GROUP /domain` - show members (users only!) of domain group `$GROUP` (try with `Domain Admins`!)

Note that Windows allows for duplicate domain and local users; this is why users get prefixed by the domain or local machine name. Comparing the output of `whoami` and `hostname` will reveal if you're logged in with a local or domain account.

Remember that `net group $GROUP /domain` doesn't show which *domain* groups are members of `$GROUP`, and thus will miss domain admins whose membership is controlled by a nested group. The only way to retrieve a full list of users in a domain group is to use PowerShell.

* [2022-08-24 — OffSec Live: PEN-200 & AWS Deep Dive](../log/2022-08-24-offsec-live-pen-200-and-aws-deep-dive.md)
* [Using PowerShell](powershell.md)
* [Equivalent Windows and \*NIX Commands](equivalent-windows-and-nix-commands.md)
