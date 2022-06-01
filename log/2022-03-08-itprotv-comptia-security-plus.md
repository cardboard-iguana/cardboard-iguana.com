# ITPro.TV: CompTIA Security+ (SY0-601)

## CompTIA Security+ Exam Cram

Today I’ll be reading chapter 23 of the Exam Cram, “Identity and Account Management Controls”.

I’m tempted to say that this chapter is largely “common sense”, but I suspect that’s more of a consequence of it speaking to a core function of my current job than anything else.

### Account Types

Exam Cram notes that Windows includes sudo/su like “run as” functionality (beyond the usual Shift + Right Click “Run as Administrator”), but doesn’t elaborate on this potentially useful tool. Fortunately, it’s not hard to find out that the utility itself is called `runas`:

```powershell
runas /user:$USERNAME $EXECUTABLE
```

Note that `$USERNAME` can also be specified as `$DOMAIN\$USERNAME` for domain-joined machines. The `$EXECUTABLE` is treated normally (as if not prefixed by the `runas` command); thus, a full or relative path is only necessary when `$EXECUTABLE` is not already in the Windows path.

* [Windows: Run as Different User](https://www.shellhacks.com/windows-run-as-different-user/)
* [Windows runas command syntax and examples](https://www.windows-commandline.com/windows-runas-command-prompt/)

### Onboarding and Offboarding

And identity providers (IdP) is an organization or system responsible for managing and authenticating user identities.

### Access Auditing and Reviews

“Access recertification” is just a formal access review that explicitly cross-references current corporate policies and relevant compliance requirements.

Exam Cram recommends that access to high-risk applications be reviewed quarterly, and all applications/groups should have their access reviewed yearly. Part of this review should also include identifying a “single wringable neck” for each application, as well as data classification for the application.

### Time of Day and Location Restrictions

Time of day login restrictions are handled under Windows using the Kerberos group policy “Enforce User Login Restrictions”. In particular, “Automatically Log Off users” controls whether or not users can remain logged in “after hours”.

Location-based restriction vocabulary:

* Geofencing: Triggering an action when a device enters or leaves a defined geographic area.
* Geolocation: Determining the geographic (coordinate-based) location of a device.
* Geotagging: Metadata added to something based on its geographic location.

References:

* [Kerberos](../notes/kerberos.md)

### Logical Access Controls

USER-BASED ACCESS CONTROL assigns permissions directly to individual users. Fine-grained, but time-consuming to manage and doesn’t scale well.

GROUP-BASED ACCESS CONTROL (also called role-based access control) assigns permissions based on groups which users are then assigned *to*. Coarse-grained, but *way* easier to managed.

Exam Cram states that all systems handle permissions in groups cumulatively, but treat deny directives as absolute (such that a denial in one group cannot be overridden by access provided by another). The authors have clearly not used groups in Google Workspace (whose only concept of “deny” is to turn a feature off or set it to a more restricted value, *both* of which will be overridden if the user is in a group with more liberal permissions). That said, Exam Cram indicates that this convention for group-based access controls may be featured on the Security+ exam, so I guess exam-takers need to just forget about Google.

### Account Policy Enforcement

Exam Cram emphasizes that ideally all accounts and credentials should be set to automatically expire and then explicitly renewed, rather than relying only on the deprovisioning process.

In Active Directory, domain-level policies are always enforced, but OU-level policies are only enforced for local logins.

### Account Lockout

Windows ”Account Lockout Policy” notes:

* The “Account lockout duration” setting determines how long an account is locked out after the the threshold number of incorrect attempts is reached. Can range from 1 - 99999 minutes; 0 means the account is locked until an administrator intervenes.
* The “Account lockout threshold” setting determined the number of incorrect login attempts before lockout occurs. Can range from 1 - 999; 0 disables account lockouts. Typically set in the 3 - 5 range.
* The “Reset account lockout counter after” setting determines how long after the last unsuccessful login the counter is reset to 0. Can range from 1 to the value of “Account lockout duration”. (IIRC, a successful login also resets the counter.)

### Password Age and History / Password Length and Rotation

Windows “Password Policy” notes:

* The “Maximum password age” setting determines when a password expires. Can be set in the range of 1 - 999 days, or 0 to disable expiration. Typically set in the 30 - 90 day range
* The “Minimum password age” setting determines how often a password can be changed. Can be set in the range 0 to one day less than the “Maximum password age” (unless “Maximum password age” is 0).
* The “Enforce password history” setting controls how many previously used password hashes are stored. Passwords that match a stored hash cannot be used.
* The “Minimum password length” setting does exactly what you’d think it does. Can be 1 - 14 characters (I’m pretty sure that it’s 1 - 16 now, as Microsoft 365 supports 16 character passwords); setting this to 0 allows for empty passwords to be used (!!!).

Exam Cram states that the “Minimum password age” setting is used to limit the amount of time that a breached password can be used, but I’m pretty sure they mean “Maximum password age” here. Even Microsoft’s own documentation states that the purpose of “Minimum password age” is to make password re-use impractical.

If Exam Cram’s practice questions are any guide, the Security+ exam considers “passphrases” just to be really long passwords.

* [Minimum password age (Microsoft Documentation)](https://docs.microsoft.com/windows/security/threat-protection/security-policy-settings/minimum-password-age)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 8, 2022
