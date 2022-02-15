# TryHackMe: Complete Beginner

## Active Directory Basics

### Introduction

Active Directory proper encompasses not only user and machine management (which are handled by the domain controller), but also all of the other services that are necessary to allow an organization’s computers to act in unison from the users’ perspective. This includes file servers, etc.

Domains are arranged into forests.

### Physical Active Directory

What makes a domain controller? The presence of Active Directory Domain Services (AD DS) + promotion to a domain controller in the forest. Functions:

* Manages the actual AD DS data store.
* Handles user authentication and authorization.
* Pushes AD DS updates out to other domain controllers (replication).
* Provides an overhead view of domain resources for admins.

The AD data store lives in %SystemRoot%/NTDS. The key file is the NTDS.dit database, which actually holds all of the AD domain data + user password hashes (NThashes and, if it’s an older domain, LMhashes).

### The Forest

Computers + users in an Active Directory environment are arranged into domains, which are grouped into hierarchical trees, which are then contained within a forest. Note that it’s possible for users and computers to not live in a domain, and domains to not live in a tree… But *everything* lives in the forest.

* TREE: A hierarchical collection of domains.
* DOMAIN: A grouping of AD objects and OUs.
* ORGANIZATIONAL UNITS: Containers for objects and other OUs.
* TRUSTS: A permission that allows users to from one domain to access objects in another.
* OBJECTS: Users, groups, printers, computers, and file shares.
* DOMAIN SERVICES: DNS, DHCP, etc.
* DOMAIN SCHEMA: Rules for object creation.

### Users & Groups

AD DS defines two default users: Administrator and Guest.

By default, there are four types of users (more can be defined):

* DOMAIN ADMINS: Manage the entire domain. The only permission level with access to domain controllers.
* SERVICE ACCOUNTS: Used for automation and provide permissions for services. Can also be domain admins (though it’s probably not a good idea in most cases).
* LOCAL ADMINISTRATORS: Users with administrative rights but *no* domain controller access.
* DOMAIN USERS: Everyone else. Technically these folks can *also* be local administrators.

Types of groups:

* SECURITY GROUPS: Used for handling bulk permissions.
* DISTRIBUTION GROUPS: Email lists.

Default security groups:

* DOMAIN CONTROLLERS: All domain controllers (machines?).
* DOMAIN GUESTS: All guests.
* DOMAIN USERS: All users.
* DOMAIN COMPUTERS: All computers (workstations or servers).
* DOMAIN ADMINS: All domain admins.
* ENTERPRISE ADMINS: Admins authorized to make forest-wide changes.
* SCHEMA ADMINS: All schema admins (so, admins who can define AD objects).
* DNS ADMINS: Admins with access to DNS management.
* DNS UPDATE PROXY: DNS clients with permission to perform updates on behalf of other clients (DHCP servers, etc.).
* ALLOWED RODC PASSWORD REPLICATION GROUP: Users who can have their credentials replicated to read-only AD DS servers.
* DENIED RODC PASSWORD REPLICATION GROUP: Users whose credentials must remain on the domain controller.
* GROUP POLICY CREATOR OWNERS: Admins who can manage GPOs.
* PROTECTED USERS: High-value users with additional authentication protections.
* CERT PUBLISHERS: Admins (computers?) allowed to publish certificates in the directory.
* READ-ONLY DOMAIN CONTROLLERS: Domain-joined AD DS servers that are not domain controllers.
* ENTERPRISE READ-ONLY DOMAIN CONTROLLERS: AD DS servers that are not domain controllers and not joined to a domain.
* KEY ADMINS: Admins able to manage protected objects within a domain.
* ENTERPRISE KEY ADMINS:  Admins able to manage protected objects across the entire forest.
* CLONEABLE DOMAIN CONTROLLERS: Domain controllers that may be cloned.
* RAS AND IAS SERVERS: Servers allowed to access remote properties of users.

Microsoft’s [Active Directory Security Groups](https://docs.microsoft.com/en-us/windows/security/identity-protection/access-control/active-directory-security-groups) documentation is a little clearer than TryHackMe’s brief overview.

A little.

### Trusts & Policies

Trusts define the *permissions* an object in a domain has w.r.t. other objects in the domain, across domains, and between forests. Trusts can be “directional” (objects in domain A can access some set of objects in domain B) or “transitive” (objects in domain A can access a set of objects *as if* they were in domain B).

Essentially GPOs applied to an entire domain.

### Active Directory Domain Services & Authentication

AD DS controls domain management, security certificates, LDAP, etc. Default services:

* LDAP
* Certificate services (public key management)
* DNS

LLMNT and NBT-NS are apparently services that provide a similar function to DNS.

AD uses Kerberos (uses “tickets” to authenticate users and provide authorization to access domain resources) and NTLM (user authentication only challenge/response protocol) for authentication. Kerberos is used for granting access across the domain, while NTLM is the default protocol used by individual Windows machines.

### Active Directory in the Cloud

Azure AD is typically designed to sit *between* users/computers and an on prem-Active Directory. To a certain extent this is a case of “there’s an extra step here somewhere”, but using that extra step has a couple of advantages:

* It allows AD trust relationships to be extended to website and web applications.
* Because Azure AD is more locked down than a typical directory and is centrally controlled by Microsoft, it makes attacking the on-prem AD much harder.

Equivalencies between Azure AD and on-prem AD:

| On-Prem AD        | Azure AD              |
|:----------------- |:----------------------|
| LDAP              | Rest APIs (?)         |
| NTLM / Kerberos   | Oauth / SAML / OpenID |
| Domains / Forests | Tenants               |
| Trusts            | Guests                |

Azure AD does *not* use an OU structure, instead adopting a flat set of users. (I assume that permissioning must then be handled entirely through groups…)

### Hands-On Lab

TryHackMe is using a set of PowerShell extensions called [PowerView](https://github.com/PowerShellMafia/PowerSploit/blob/master/Recon/PowerView.ps1) here. It doesn’t look like PowerView is maintained anymore though, and I’m curious how applicable all of this is anymore — I remember reading somewhere that PowerShellMafia’s work was largely protected against these days.

It looks like PowerShell needs to be run with execution protections bypassed in order to load PowerView. Fortunately, you can do this by running PowerShell from cmd.exe with a simple flag:

```bat
powershell -ep bypass
```

Example PowerView commands:

```powershell
# Get all OS versions on the domain
#
Get-NetComputer -fulldata | select operatingsystem

# Get all users on the domain
#
Get-NetUser | select cn

# Get all groups on the domain
#
Get-NetGroup
```

There’s also a [PowerView tips & tricks cheat sheet](https://gist.github.com/HarmJ0y/184f9822b195c52dd50c379ed3117993).

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 16, 2021
