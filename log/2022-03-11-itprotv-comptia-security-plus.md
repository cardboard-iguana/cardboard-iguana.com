# ITPro.TV: CompTIA Security+ (SY0-601) #Draft

## CompTIA Security+ Exam Cram

Today I’ll be reading chapter 24 of the Exam Cram, “Authentication and Authorization Solutions”.

### Authentication

AUTHENTICATION MANAGEMENT: The management of user credentials across the entire user lifecycle.

### Unencrypted Plaintext Credentials

Wait, wut?!?

> In a Windows environment, failed logins record the plaintext password in the Security log.

I guess people must forget their *usernames* with relative frequency, as Exam Cram is suggesting that a failed login attempt followed by a successful one has a high probability of revealing the user’s password (at least in smaller/less busy environments).

### Filesystem Permissions

Exam Cram notes that the Security+ test’s main concern with insecure permissions is the violation of the principle of least access.

When enabling access audit logs:

* Failed access attempts help identify unauthorized access (attempts).
* Successful access attempts help identify improperly elevated/broad permissions.

The Windows `gpresult` utility calculates the effective group policy of a user or computer (essentially calculating the “sum” of the active group policies). The `accesschk` tool is similar, which shows the effective permissions a user or computer has to a particular object (these permissions are determined *in part* by the applied group policies).

Windows permissions:

| Permission           | Meaning for Folders                                                                                               | Meaning for Files                                                                                     |
|:-------------------- |:----------------------------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------- |
| Read                 | Permits viewing and listing of files and subfolders                                                               | Permits viewing or accessing of the file’s contents                                                   |
| Write                | Permits adding of files and subfolders                                                                            | Permits writing to a file                                                                             |
| Read & Execute       | Permits viewing and listing of files and subfolders as well as executing of files; inherited by files and folders | Permits viewing and accessing of the file’s contents as well as executing of the file                 |
| List Folder Contents | Permits viewing and listing of files and subfolders as well as executing of files; inherited by folders only      | N/A                                                                                                   |
| Modify               | Permits reading and writing of files and subfolders as well as executing of files; allows deletion of the folder  | Permits reading and writing of the file as well as executing of the file; allows deletion of the file |
| Full Control         | Permits reading, writing, changing, and deleting of files and subfolders                                          | Permits reading, writing, changing and deleting of the file                                           |

Windows “advanced permissions” are just bundles of the above.

| Advanced Permission            | Full Control | Modify | List Folder Contents | Read & Execute | Write | Read |
|:------------------------------ |:------------:|:------:|:--------------------:|:--------------:|:-----:|:----:|
| Traverse folder / execute file |       X      |    X   |           X          |        X       |       |      |
| List folder / read data        |       X      |    X   |           X          |        X       |       |      |
| Read attributes                |       X      |    X   |           X          |        X       |       |      |
| Read extended attributes       |       X      |    X   |           X          |        X       |       |      |
| Create files / write data      |       X      |    X   |                      |                |       |   X  |
| Create folders / append data   |       X      |    X   |                      |                |       |   X  |
| Write attributes               |       X      |    X   |                      |                |       |   X  |
| Write extended attributes      |       X      |    X   |                      |                |       |   X  |
| Delete subfolders and files    |       X      |        |                      |                |       |      |
| Delete                         |       X      |    X   |                      |                |       |      |
| Read permissions               |       X      |    X   |           X          |        X       |   X   |   X  |
| Change permissions             |       X      |        |                      |                |       |      |
| Take ownership                 |       X      |        |                      |                |       |      |

I suspect that there must be a bit more to advanced permissions than this, as otherwise there’s a lot of duplication here (either that, or Windows is supporting a lot of legacy permission bundles, which also wouldn’t surprise me). Also, all of these advanced permissions *include* the “full control” permission, which would seem to make them all equivalent to… “full control”?

When a user is part of two groups with different permissions to an object, the allow permission will only override inherited deny permissions (explicitly set deny permissions cannot be overridden; remember that Windows access handling is default-deny).

Okay, learned something new about Linux permissions I wasn’t expecting: If a user has *write* access to a directory, then they can write to any file they have at least *read* access to (!!!).

* [gpresult](https://docs.microsoft.com/windows-server/administration/windows-commands/gpresult)
* [AccessChk v6.14](https://docs.microsoft.com/sysinternals/downloads/accesschk)
* [Windows Permissions](../notes/windows-permissions.md)

### Access Violations

The Windows “Microsoft Operations Manager” (MOM) includes an “Audit Collection Service” (ACS) that collects various audit events into a single database. There are two preconfigured reports:

* The “Access Violation Account  Locked” report
* The “Access Violation Unsuccessful Login Attempts” report

### Authentication Protocols

PASSWORD AUTHENTICATION PROTOCOL (PAP): Username and password are sent to the server in plaintext. That’s it. Was used for PPP connections.

CHALLENGE HANDSHAKE AUTHENTICATION PROTOCOL (CHAP): Is a (slightly) more secure authentication protocol, again used in PPP connections. In a CHAP authentication handshake, the server (authenticator) sends the client a (random?) challenge to the client. The client then combined this with the user password and hashes the result (typically with MD5). The server can then compare this using the same process to determine is the client knows the correct user password. Reauthentication is randomly re-requested with new challenges. Requires both the client and server to know the user’s password in plaintext.

MICROSOFT CHAP (MS-CHAP): Is a Microsoft variant of CHAP. Both Exam Cram and Wikipedia are a bit light on details, but authentication (at least in MS-CHAPv2) is bidirectional and the algorithm appears to use NTLM hashes encrypted with DES. Both the v1 and v2 versions of this algorithm are considered broken, but v1 is *very* broken. The security of MS-CHAP can be improved by using the “extensible authentication protocol” (EAP) or the “protected extensible authentication protocol” (PEAP); the latter of these actually fires up an encrypted tunnel between the client and server before exchanging the authentication handshake.

* [Challenge-Handshake Authentication Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Challenge-Handshake_Authentication_Protocol)
* [MS-CHAP (Wikipedia)](https://en.m.wikipedia.org/wiki/MS-CHAP)
* [Windows Password Hashes](../notes/windows-password-hashes.md)

### 802.1X

802.1X is an IEEE standard for port-based access control on a network. It works by encapsulating EAP with some IEEE network protocol, and relies on a dedicated authentication server rather than having the system the client is connecting to handle the authentication.

### AAA Protocols and Services

==xxx==

### Access Control

==xxx==

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 11, 2022
