# ITPro.TV: CompTIA Security+ (SY0-601)

## CompTIA Security+ Exam Cram

It actually took me a couple of days to work through chapter 24 of the Exam Cram, “Authentication and Authorization Solutions”. Lots of little details here.

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

Recall that “AAA” stands for “authentication, authorization, and accounting”.

RADIUS stands for “Remote Authentication Dial-In User Service”, which should give you a sense of when it was designed. RADIUS works primarily over UDP (though TCP implementations are possible); users present their credentials directly to a resource, which then passes them to the RADIUS server (passwords are transformed using MD5 + a salt shared by the resource and RADIUS server). (Note that Exam Cram implies that credentials are presented directly to the RADIUS server, but all of the other resources I can find indicate that this is *not* the case.) The RADIUS server may authenticate and authorize the user immediately, reject them immediately, or request an additional challenge (which will be handled directly by the RADIUS server, and *not* the requesting resource). Once the user is authenticated and authorized, the resource may send periodic accounting messages to the RADIUS server to indicate the user’s usage.

RADIUS servers can forward credentials to other servers for verification. The users that a given RADIUS server is responsible for are its “realm”, and the realm of a login request can be prepended to the username using `\` (“prefix notation”, which then looks like AD domains) or appended using `@` (“postfix notation”, which looks like an email address). Both notations can be combined to allow for user accounts in two realms.

TACACS+ is the “Terminal Access Controller Access Control System Plus” is a Cisco standard dating from 1993. It uses TCP 49; while the design details differ (in particular, TACACS+ completely encrypts user information, while RADIUS only protects the password), the general authentication/authorization/auditing flow is similar to RADIUS.

TACACS+ cleanly separates out the authentication and authorization  stages, which allows alternate authentication mechanisms to be more easily used than RADIUS (Exam Cram implies that authentication could be handled entirely by the resource). Because of this, it can also be used to authorize actions at a much finer level — typically individual commands, rather than RADIUS’s coarser resource-based approach.

* [RADIUS (Wikipedia)](https://en.wikipedia.org/wiki/RADIUS)
* [RADIUS Authentication, Authorization, and Accounting (Microsoft Documentation)](https://docs.microsoft.com/windows/win32/nps/ias-radius-authentication-and-accounting)
* [TACACS+ (Wikipedia)](https://en.wikipedia.org/wiki/TACACS)

### Federated Services

Federated services typically use token-based authentication, where the user authenticates with with a central server once and then receives a token that can provide access to further resources. Tokens can be scoped in time, space (which resources they’re valid for), or both.

### SAML

SAML (“Security Assertion Markup Language”) provides authentication (user identity), attribute (user metadata), and authorization (user permissions) attestation in a single XML bundle. SAML terminology:

* PRINCIPAL: The user seeking authentication.
* IDENTITY PROVIDER: The system providing authentication services. A.k.a. the “IdP”.
* SERVICE PROVIDER: The system that uses the IdP’s response to take action on behalf of the principal.

SAML flow:

* The user requests access to a resource.
* The resource issues an authentication request, redirecting the user to the IdP.
* The IdP authenticates the user and redirects them back to the resource.
* *Separately*, the IdP sends an authentication response to the resource.
* The resource validates the authentication response and allows/denies access to the user.

Note that (single) sign-on is *initiated* by the service provider; the IdP is only used for authentication.

SAML authentication responses assert the validity of a user’s identity, rather than confirming successful authentication directly. SAML requests need to be scoped in time to prevent replay attacks.

Note that both OAuth 2.0 and OpenID Connect (below) *can* use SAML for user authentication/authorization.

### OAuth 2.0

OAuth (“Open Authorization”) is primarily used for API-level authorization. Terminology:

* RESOURCE OWNER: The entity that has permission to access a particular resource; typically the user.
* OAUTH PROVIDER: The system hosting the resource.
* OAUTH CONSUMER: The system which wishes to have access to the resource.
* AUTHORIZATION SERVER: The system that provides the token to the consumer on behalf of the user. Often the same system as the resource server.
* RESOURCE SERVER: A.k.a. the OAuth provider.
* CLIENT: A.k.a. the OAuth consumer.

While SAML is about authorizing user access to a particular resource, OAuth is about authorizing two systems to talk to each other on behalf of a user.

Types of “grants” in OAuth 2.0:

* AUTHORIZATION CODE: Server/server authentication/authorization flow. The IdP provides an authorization code to the requesting server, which then exchanges it with the resource server for a (scoped) access token (which generally must be periodically refreshed).
* IMPLICIT: Client/server flow. There is no authorization code here; rather an access token is granted immediately upon authentication/authorization (this collapses the authorization/resource server distinction).
* PASSWORD CREDENTIALS: Client/server flow where the client directly presents credentials on the user’s behalf. Discouraged.
* CLIENT CREDENTIALS: Internal flow where an application requests access to its own resources. Used for fronted/backend splits, or as part of one of the previous flows. Similar to the “password credentials” flow, except that it uses a single, scoped token.

OAuth 2.0 uses JSON rather than SAML’s XML, and is overall a simpler protocol. Partly, this is due to the fact that OAuth only deals with authorization; authentication is handled by having the user log into the provider before issuing a token. In order to prevent session-based attacks, if a user isn’t already logged into the provider, they should be logged out after authorization is complete.

* [OAuth (Wikipedia)](https://en.wikipedia.org/wiki/OAuth)

### OpenID Connect

Besides an explicit login, authentication can also be layered on to OAuth 2.0 using OpenID Connect, which extends the OAuth 2.0 authorization process to include an authentication step. Generic OpenID Connect flow:

* The user client requests authentication from the OpenID provider.
* The provider authenticates the user, checks authorization, and then responds with *both* an “ID token” and an access token.
* The client can then use these tokens to request additional information about the user from a UserInfo endpoint.

There are three specific variants of the generic OpenID Connect flow:

* AUTHORIZATION CODE: This is equivalent to the OAuth 2.0 authorization code flow, in that an authorization code is first returned which can then be exchanged for an ID token + access token from a separate “token server”. This is the preferred authentication/authorization flow.
* IMPLICIT: This is equivalent to the OAuth 2.0 implicit flow; both ID and access tokens are returned immediately from the same server.
* HYBRID: Splits the process, so that one token is returned by the authorization server while the other is returned by the “token server”.

OpenID Connect ID tokens are JSON web tokens; the payload of these tokens contains assertions about the user’s authentication (and can also include additional user information, though this is now discouraged), the integrity of which is guaranteed by a cryptographic signature. They are used *only* to verify a successful login (preventing a situation where a local attacker on a mobile device can inject false login information), and as such often expire after a very short time.

Access tokens in OpenID Connect are exactly the same as the API tokens issued in OAuth 2.0. To prevent (local) interception attacks, both OpenID Connect and OAuth 2.0 clients can layer in a “code verification” flow (PKCE, “Proof Key for Code Exchange”), in which the client sends the server a hashed (per-client/connection) secret during the initial authentication/authorization, and then subsequently sends the original code when using the returned authorization code. OpenID Connect + PKCE tightly binds the returned ID and access tokens to a particular client instance, but is only applicable to the “authorization code” and “hybrid” flows.

In short, in OpenID Connect the access token provides long lived or renewable API authorization while the ID token provide short-lived proof of authentication. These two tokens together are equivalent to a SAML assertion, but can be handled without having to deal with XML, SOAP, etc.

* [JSON Web Token Attacks](../notes/json-web-token-attacks.md)
* [OpenID (Wikipedia)](https://en.wikipedia.org/wiki/OpenID)
* [OpenID Connect Flows](https://www.scottbrady91.com/openid-connect/openid-connect-flows)
* [Authorization Request (OAuth Documentation)](https://www.oauth.com/oauth2-servers/pkce/authorization-request/)
* [Proof Key for Code Exchange by OAuth Public Clients](https://ldapwiki.com/wiki/Proof%20Key%20for%20Code%20Exchange%20by%20OAuth%20Public%20Clients)
* [The Authorization Response (OAuth Documentation)](https://www.oauth.com/oauth2-servers/authorization/the-authorization-response/)
* [Authorization Code Flow with Proof Key for Code Exchange (PKCE) (Auth0 Documentation)](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce)
* [ID Tokens (OAuth Documentation)](https://www.oauth.com/oauth2-servers/openid-connect/id-tokens/)
* [ID Token and Access Token: What's the Difference?](https://auth0.com/blog/id-token-access-token-what-is-the-difference/)
* [PKCE flow of OpenID Connect](https://medium.com/swlh/pkce-flow-of-openid-connect-9b10ddbabd66)
* [JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens (RFC 9068)](https://datatracker.ietf.org/doc/html/rfc9068)
* [Auth Code Flow pt. 1 (OneLogin OpenID Connect API Reference)](https://developers.onelogin.com/openid-connect/api/authorization-code)
* [Auth Code Flow pt. 2 (OneLogin OpenID Connect API Reference)](https://developers.onelogin.com/openid-connect/api/authorization-code-grant)
* [Understanding identity tokens](https://www.scottbrady91.com/openid-connect/identity-tokens)

### Shibboleth

Shibboleth is an open source federated SAML implementation. It layers on the concept of a (optional) “discovery service” that is used to determine a user’s IdP across organizational boundaries. Apparently tricky to configure.

### Kerberos

Kerberos uses symmetric keys for protocol encryption. Kerberos uses TCP/UDP 88, though UDP is preferred except for large tickets; UDP (?) 749 is used for administrative access.

Kerberos differs from protocols previously discussed in that the client initially sends authentication information directly to the KDC (“key distribution center”) server, rather than working through the actual resource server. A quick sketch of the Kerberos authentication process:

* The client begins by contacting the “certificate authority” (CA… but *not* the same kind of CA as in PKI).
* The CA provides a session key containing the issuing timestamp and expiration timestamp (typically 8 hours in the future) + information regarding user authorization. The first of these is encrypted with the client’s key, but the second of these is encrypted with a long-term secret known only to the KDC. The encrypted bit that the client *can’t* read is the “ticket granting ticket” (TGT).
* The client submits the TGT to the “ticket granting server” (TGS), which decrypts it, verifies access, and then returns an actual service ticket (containing issued at and expires at timestamps) encrypted with the key of the *service* the client wishes to access. Again, the client cannot read the service ticket, but can read a separate message containing a key that will be used to communicate with the service (this key is contained within the service ticket as well).
* The client sends the service the service ticket (which it can’t read) and an additional message encrypted with the service key provided by the TGS (that the service *initially* can’t read).
* The service decrypts the service ticket, uses the information there to decrypt the client message, and then compares the client’s attested ID with the client ID in the service ticket, as well as the provided timestamps. If everything checks out, the service responds back with the same timestamp that the client provided in its message, encrypted with the TGS service key (which it now knows). Exam Cram notes that this timestamp information returned by the service is provided by the KDC, though I haven’t run into that wrinkle in my previous readings about the Kerberos authentication process.
* The client verifies the timestamp returned by the service, confirming that the service knows the correct session key.
* Client and service are now authenticated to each other.

A more detailed sketch is provided in my notes in “A Hacker’s Notes”.

The idea with Kerberos is to have a short enough ticket validity lifespan that cryptographic attacks are infeasible, and the entire process doesn’t require any direct exchange of passwords. The extensive use of timestamps effectively prevent replay attacks (Exam Cram notes the importance of time synchronization between all systems in an environment using Kerberos).

Unfortunately, the most common Kerberos implementation is Active Directory, which uses NTLM hashes as its secrets and allows for stored “pre-autheticated” tickets that bypass the KDC. This allows for serious side-channel attacks. Kerberos 5 tries to mitigate these attacks by having client and service authenticate each other with challenge codes (“mutual authentication”), but this only prevents on-the-wire MITM attacks, not attacks that harvest tickets from client machine directly (like Rubeus and Mimikatz).

* [Kerberos](../notes/kerberos.md)
* [Windows Password Hashes](../notes/windows-password-hashes.md)
* [Using Rubeus](../notes/rubeus.md)
* [Using Mimikatz](../notes/mimikatz.md)

### Access Control

ACCESS CONTROL: The process by which resources are made available only to those entities that should have access (and access is denied to all others).

Types of access controls:

* MANDATORY ACCESS CONTROL (MAC): Entities and objects are labeled in some way (for example, “public”, “secret”, “top secret”, etc.), and access is only granted with the labels match. Sometimes called “multilevel access control”, since in theory multiple labels can be applied.
* DISCRETIONARY ACCESS CONTROL (DAC): Has object owners assign access rights on an ad hoc basis based (but only for their objects). This is the model used in, for example, Google Drive.
* RULE-BASED ACCESS CONTROL (RBAC): Entities are dynamically assigned access based upon rules defined by either the object owner or systems administrator. Typically these rules specify things like time of day, user location, etc. Think of Google Workspace’s “Context-Aware Access”.
* ROLE-BASED ACCESS CONTROL (RBAC): *Also* known as RBAC, this involves assigning access based upon entity membership in a group/role. Google Workspace admins are managed in this way, and groups can be used to provide similar functionality at the user level. Role-based access control is easier to manage than rule-based or discretionary access control, but doesn’t offer the flexibility of rule-based controls.
* ATTRIBUTE-BASED ACCESS CONTROL (ABAC): This is a specific access control definition used within the US federal government. It  is similar to rule-based access control in that it defines a set of attributes that an entity must match in order to access an object in an XML-derived format (the “Extensible Access Control Markup Language”, or XACML). However, the list of attributes can be quite detailed, which allows ABAC to also enforce DAC and MAC models.

If I read all of this right, ABAC is a *way* of implementing access control, rather than a *type* of access control.

Note that the “Trusted Computer System Evaluation Criteria” (TCSEC) specification (a.k.a., the “Orange Book”) only defines the use of MAC and DAC.

* [Control access to apps based on user & device context (Google Workspace Admin Documentation)](https://support.google.com/a/answer/9275380)

### Privileged Access Management

PAM systems are access control systems with the following properties:

* Privileged account discovery
* Access governance
* Auditing
* Task automation management

PAM solutions are primarily concerned with machine, application, and administrative accounts.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 12, 2022
