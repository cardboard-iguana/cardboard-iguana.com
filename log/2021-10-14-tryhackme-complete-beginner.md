# TryHackMe: Complete Beginner

## Introduction to Windows

### Understanding the Authentication Process

Windows uses the protected Local Security Authority (LSA) subsystem to manage local logins and maintain local security policies.

On prem AD can use three different protocols for authentication: NTLM, LDAP, and Kerberos.

Azure AD, by contrast, supports SAML, OAuth 2.0, and OpenID Connect for authentication. It is also primarily concerned with user authentication (on prem AD also stores security policies for users and computers).

An easy way to remember what a “service provider” is in SAML: It provides a *service* to users (as opposed to the “identity provider”, which provides the user identity — a.k.a., authentication).

OAuth 2.0 is about providing applications access to data. OpenID Connect extends OAuth 2.0 to provide user authentication.

### Utility Tools

COMPUTER MANAGEMENT: The snap-in of snap-ins. Combines Task Scheduler, Event Viewer, Shared Folders (manage all system shared folders), Local Users and Computers (user and policy management), Performance Monitor, Disk Management, and Services & Applications (service management).

LOCAL SECURITY POLICY: Shoot yourself in the foot by disabling local admin on a computer that isn’t joined to AD!

DISK CLEANUP: Via disk properties.

REGISTRY EDITOR: Major hives:

* HKEY_CLASSES_ROOT
* HKEY_CURRENT_USER
* HKEY_LOCAL_MACHINE
* HKEY_USERS
* HKEY_CURRENT_CONFIG

COMMAND LINE: Meta-category: cmd.exe, PowerShell, Windows Terminal.

You can actually access the registry from PowerShell using the `cd` command: `cd HKLM:\` will take you to the HKEY_LOCAL_MACHINE hive, for instance.

### Types of Servers

“Domain Controllers” are just servers that handle authentication requests. The term is most commonly used in Windows networks, but technically any server that handles identity management is a domain controller.

* [Wikipedia: Domain controller](https://en.wikipedia.org/wiki/Domain_controller)
* [Wikipedia: Domain controller (Windows)](https://en.wikipedia.org/wiki/Domain_controller_%28Windows%29)

- - - -

👤 Nathan Acks
📅 October 14, 2021
