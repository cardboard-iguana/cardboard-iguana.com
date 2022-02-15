# TryHackMe: Complete Beginner

## Introduction to Windows

### Users and Groups Management

AD user management can be started by opening up the Server Manager and going to Tools > Active Directory Users and Computers (aka, dsa.msc).

Users (and groups!) live in OUs in Active Directory. Feels very much like Google Workspace (though I’m not sure if Google is aping AD, or if both are aping LDAP). Note that not everything in the Active Directory tree is an OU though!

There are a number of groups pre-populated under /Users in a fresh AD tree.

### Creating Your First GPO

The GPO snap-in can be started by opening up the Server Manager and going to Tools > Group Policy Management (aka, gpmc.msc).

OUs created in dsa.msc are also accessible here, though you can’t edit individual users or groups (just apply GPOs to OUs).

To set GPO policies, right-click on the GPO and select “Edit” (it doesn’t look like there’s a way to get to this otherwise). Then, navigate to the policy category, find the setting you want to configure, and double-click to edit. Policies are always “affirmative”, in the sense that they must be defined to apply. Since there’s no explicit “deny” within a policy, most come in pairs; for example, “Allow log on through Remote Desktop Services” and “Deny log on through Remote Desktop Services”.

Once created, GPOs must be linked to a domain or OU (or site) to apply. Linked GPOs will be listed underneath whatever they’re linked to.

To force a linked GPO to be applied now, use `gpoupdate /force` on the command line.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 15, 2021
