# ITPro.TV: CompTIA Security+ (SY0-601)

## CompTIA Security+ Exam Cram

Today I’m going to be reading through chapters 17 (Secure Protocols) and 25 (Public Key Infrastructure) of the CompTIA Security+ Exam Cram.

### Secure Web Protocols

Remember: SSL/TLS is a *transport layer* security protocol (sitting between HTTP and TCP).

HTTPS was original developed by Netscape. TIL!

Apparently there’s an alternate standard called S-HTTP which was developed specifically for banking transactions. Based on Wikipedia’s summary, it looks like S-HTTP sent encrypted data (including an additional/alternative set of headers) in the request body, rather than wrapping the entire protocol in an encrypted channel (like HTTPS).

Exam Cram calls out Heartbleed explicitly, and notes that this vulnerability is closed in OpenSSL 1.0.1g and later.

HTTPS operates over stateful SSL connections.

TLSv1.0 succeeded SSLv3 in 1999. Note that TLS is *not* backwards-compatible with SSL.

TLS has two sub-protocols:

* The TLS Record Protocol is what establishes an encrypted tunnel using an agreed-upon cipher (or the NULL cypher, in which case the “encrypted” tunnel is just plaintext).
* The TLS Handshake Protocol is used for authentication and key exchange.

Types of DNS servers:

* Authoritative servers provide information about a specific domain.
* Caching/Recursive servers resolve queries and then cache them for additional speed. Recursive servers can point to other recursive servers, but ultimately will make queries to authoritative servers if needed.

DNSSEC is designed to provide an authentication layer for DNS to prevent cache poisoning. DNS responses are signed in DNSSEC, and the keys used to sign those responses are themselves signed in a hierarchical fashion that parallels the arrangement for authoritative servers. For example, in DNSSEC, the response for `www.example.com` will be signed by `example.com`, the key used by `example.com` will in turn be signed by `.com`, and the key used by `.com` will in turn be signed by one of the root servers.

One reason DNSSEC is important is because DNS is increasingly used as a PKI for example:

* DANE (DNS-based Authentication of Named Entities) enables X.509 certificates used in TLS to be validated using DNS.
* SSHFP (SSH fingerprint posting) puts host fingerprints in DNS (what a great idea!).
* DKIM

References:

* [Secure Hypertext Transfer Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Secure_Hypertext_Transfer_Protocol)
* [Heartbleed (Wikipedia)](https://en.wikipedia.org/wiki/Heartbleed)

### Internet Protocol Security (IPsec)

IPsec is a *network layer* encryption protocol, and is commonly used as a VPN solution. IPsec uses the Internet Key Exchange (IKE) protocol for, well, key exchange.

Two modes:

* Transport mode establishes point-to-point encrypted tunnels.
* Tunnel mode (IPsec’s default) is used to securely bridge two networks by establishing an encrypted tunnel between those networks’ gateways.

IPsec in tunneling mode uses two headers:

* The Authentication Header (AH, protocol field 51) authenticates the packet’s sender and provides integrity and nonrepudiation. Note that integrity guarantees do *not* cover all the other header fields, as it is possible for some of these to be (legitimately) changed by intermediate servers.
* The Encapsulating Security Payload (ESP, protocol field 50) *also* provides authentication services, and encrypts the data being transferred. ESP is designed to provide confidentiality, authentication, integrity, and anti-replay services, but these can be configured in a piecemeal fashion. In particular, enabling confidentiality *without* integrity protection and either ESP authentication *or* a separate AH leaves the ESP data vulnerable to substitution attacks (not sure why you’d do this…).

IPsec headers immediately follow the header fields in an IP datagram. ESP can be nested in AH, which simplifies firewall filtering if you only require confidentiality for *some* connections.

The IKE protocol is part of the larger Internet Security Association and Key Management Protocol (ISAKMP).

### Secure File Transfer Protocols

FTPS is to FTP what HTTPS is to HTTP (though there are additional complications since FTP is a two-channel protocol). FTPS uses port 990 for commands in *implicit* mode, and good old port 21 for commands in *explicit* mode.

SFTP is an entirely different beast — FTP-like functionality over SSH.

Note that FTPS, like FTP, requires multiple ports to function. This makes SFTP (which operates of port 22, like SSH) much easier to handle when configuring firewalls.

“Managed File Transfer” (MFT) services/applications allow FTP to be wrapped in a more secure protocol (HTTPS?) as well. These are popular in regulated industries.

### Secure Email Protocols

S/MIME leverages MIME to provide authentication, message confidentiality and integrity, and nonrepudiation. S/MIME uses the “Cryptographic Message Syntax” to ensure the security of the underlying keys. Best practices dictate that separate S/MIME certificates be used for signing vs. encryption so that the encryption key can be escrowed without damaging non-repudiation.

Important ports:

| Protocol      | Port |
|:------------- |:----:|
| POP3          | 110  |
| POP3S         | 995  |
| IMAP          | 143  |
| IMAPS         | 993  |
| SMTP          |  25  |
| SMTP+SSL      | 465  |
| SMTP+STARTTLS | 587  |

* [S/MIME (Wikipedia)](https://en.wikipedia.org/wiki/S/MIME)
* [Simple Mail Transfer Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)
* [Email encryption (Wikipedia)](https://en.wikipedia.org/wiki/Email_encryption)

### Secure Internet Protocols

By default SSH tunnels are actually encrypted using IDEA (the International Data Encryption Algorithm) with a 128-bit symmetric key cipher that is agreed upon during the initial authentication/negotiation. Blowfish (32- to 448-bit keys), DES, and 3DES are also available. (Note that DES, and I suppose by extension 3DES, is still export-controlled.)

### Lightweight Directory Access Protocol (LDAP)

There’s also LDAP-over-SSL (LDAPS), which again riffs off of HTTPS. As a total set of asides…

* LDAP servers are generally called “Directory System Agents” (DSAs), and are typically accessed on port 636. There is also a “Global Catalog” that’s generally on port 3269.
* Information in LDAP is encoded using a scheme called the “Basic Encoding Rules” (BER) and X.500 directories; while LDAP is defined in RFC 4522, BER and X.500 are both ISO standards.

At the very least, LDAPS should be used when authenticating with Active Directory Domain Services (AD DS).

* [Lightweight Directory Access Protocol (LDAP): The Binary Encoding Option (RFC 4522)](https://datatracker.ietf.org/doc/html/rfc4522)

### Secure Real-Time Transport Protocol (SRTP)

SRTP is *similar* to HTTPS in that keys must be exchanged before transmission begins, but is otherwise unlike HTTPS as it operates over UDP and applies the encryption to the protocol payload (rather than firing up an encrypted tunnel and then running an unencrypted protocol over it).

### Simple Network Management Protocol (SNMP)

SNMP is used to collect statistics from devices over TCP/IP, and is typically used for monitoring equipment health (finally, an explanation for *what* SNMP is actually *for*!).

Individual devices run SNMP agents, which then send data to a “management station”. Data is sent via UDP 161 (polling) and UDP 162 (notifications). In SNMPv3 can alternately be run over TCP.

The only security in SNMPv1 is the “community name” (which functions like a password). This is set to “public” by default, and is seldom changed.

SNMPv2 introduced message integrity via MD5, but was still plaintext.

SNMPv3 supports both AES and 3DES, and represents a major rearchitecting of SNMP. It is the first version of SNMP that supports all three legs of the CIA triad, and does not use the “community” string.

SNMPv3 can be divided into the SNMP engine proper and a number of “applications” that run on top of the engine. Parts of the SNMP engine:

* The Dispatcher handles message routing and generally supports multiple versions of the SNMP protocol.
* The Message Processing Subsystem handles message construction and parsing.
* The Security Subsystem provides encryption and security services.
* The Access Control Subsystem handles authentication.

Defined SNMP applications:

* The Command Generator initiates requests to devices and processes their responses.
* The Command Responder routes requests received by individual nodes.
* The Notification Receiver listens for notifications and generates responses if required
* The Notification Originator monitors the actual system and generates messages for other applications. 
* The Proxy Forwarder forwards messages between systems.

Other vendor and custom-built SNMP applications are also allowed.

### Using Network Address Allocation

The most basic security aspect of network design is the use of subnetting.

IP address classes:

| Class   | IP Range                    | Subnet Mask   |
|:------- |:--------------------------- |:------------- |
| Class A | 0.0.0.0 - 126.255.255.255   | 255.0.0.0     |
| Class B | 128.0.0.0 - 191.255.255.255 | 255.255.0.0   |
| Class C | 192.0.0.0 - 223.255.255.255 | 255.255.255.0 |

Common reserved network blocks:

| Class   | IP Range       | Notes                              |
|:------- |:-------------- |:---------------------------------- |
| Class A | 10.0.0.0/8     |                                    |
| Class A | 127.0.0.0/8    | Reserved for localhost             |
| Class B | 172.16.0.0/12  | a.k.a. 172.16.0.0 - 172.31.255.255 |
| Class C | 192.168.0.0/16 |                                    |

Note that, except for the Class A reservations, all of these use larger subnet masks than you would typically suspect. There are actually far more reserved blocks than just these four; Wikipedia has a good list.

CIDR (as in “CIDR subnet notation”) is “Classless InterDomain Routing”. This is the count of how many of the *most* significant bits are “masked” (held constant in the network).

IPv6 is a 128-bit address space (as opposed to the 32-bit address space of IPv4). IPv6 addresses are represented as eight groups of four hexadecimal digits (so each block represents 16 bits, exactly twice the size of an IPv4 block). The *largest* block consisting only of zeros can be replaced with `::` (i.e., you can only use this trick *once*), and leading zeros in a block can also be dropped.

IPv6 also introduces the concept of “variable length subnet masking” (VLSM), which specifies subnets as needed rather than for the entire network. However, CIDR notation continues to work as you’d expect, so 2001:db8::/32 represents the subnet 2001:0db8:0000:0000:0000:0000:0000:0000 – 2001:0db8:ffff:ffff:ffff:ffff:ffff:ffff.

The IPv6 equivalent of 127.0.0.1 is ::1; the rest of the 127.0.0.0/8 block is replaced with the concept of “link-local” addresses, which are self-assigned per network interface addresses in the reserved fe80::/10 subnet (RFCs 7217 and 8064 defines how link-local addresses are assigned).

In both IPv4 and IPv6, the first address in a subnet represents the network itself, and the last address is used to broadcast to all devices on the network. These two addresses are thus unavailable for hosts to use.

Exam Cram notes that the Security+ exam will likely have questions related to identifying incorrectly configured subnets.

* [Reserved IP addresses (Wikipedia)](https://en.wikipedia.org/wiki/Reserved_IP_addresses)
* [IPv6 (Wikipedia)](https://en.wikipedia.org/wiki/IPv6)
* [Recommendation on Stable IPv6 Interface Identifiers (RFC 8064)](https://datatracker.ietf.org/doc/html/rfc8064)
* [A Method for Generating Semantically Opaque Interface Identifiers with IPv6 Stateless Address Autoconfiguration (SLAAC) (RFC 7217)](https://datatracker.ietf.org/doc/html/rfc7217)

### Using Time Synchronization

NTP operates over UDP. Time servers operate on a DNS-like hierarchy. The secure version of NTP is NTS (Network Time Security), which uses TLS + a second standard called “Authenticated Encryption with Associated Data (AEAD, which is used to extend integrity and authenticity guarantees to unencrypted header data). NTS only recently was submitted for publication as a standard.

* [Authenticated Encryption (Wikipedia)](https://en.wikipedia.org/wiki/Authenticated_encryption)

### Using Subscription Services

New acronym: “Anything” as a Service (XaaS, which probably *actually* stands for “X as a Service”). An umbrella term for all of the \*aaS things.

### PKI Components

A PKI should ideally provide the following:

* Identity authentication
* Integrity verification
* Privacy assurance
* Access authorization
* Transaction authorization
* Nonrepudiation support

### Certificate Authorities (CAs)

A certificate authority (CA) is a trusted entity that issues certificates.

A registration authority (RA) sits between users and the CA, handling identity verification step.

Certificates issued by a CA are trusted in a transitive fashion, anchored in the CA’s “root certificate”. This allows CAs to themselves be arranged in a hierarchy.

### Certification Practice Statement

The certification practice statement (CPS) is the legal document outlining the identity of the CA, the types of certificates it issues, the requirements it has for issuing these certificates, the CA’s operating procedures (issuing, renewing, revoking), and the security controls used in the process.

Not to be confused with certificate *policies*, which are the rules describing how a certificate may be used.

### Trust Models

You could, of course, just have a single CA. Probably fine for a small or medium organization, but not a great idea in the real world.

More commonly, CAs are arranged in a hierarchy. CAs beneath the root CA in a hierarchy are called “intermediate CAs”. Because of their sensitivity, root CAs are normally entirely offline.

A variation of this is the “bridge CA model”, which uses hierarchies that are connected by cross-certifications with one or more “bridge CAs”. While a diagram of this *looks* like a hierarchical model, the difference is that the root CAs of the various hierarchies are using the bridge to trust each other, rather than obtaining their trust from the bridge. Thus a compromise of the bridge, while it would disconnect the various hierarchies, would *not* invalidate certificates issued by the actual root.

An alternative to a hierarchy is the “cross-certification model” — a.k.a., the “web of trust”. This model allows redundancy and a more realistic model of trust, but doesn’t scale well and is often difficult even for experts to work with.

* [Introduction to PKI Models](http://pkiglobe.org/pki_models.html)

### Key Escrow

This is when the private half of a public/private keypair is held by a third party (which may or may not be the issuing CA) in addition to the user the key is issued to.

Escrow agents are not only able to read data encrypted by the public half of this key but also — because encryption capabilities are symmetric — are able to sign messages on behalf of the key user (harming nonrepudiation).

Key escrow is common in corporate environments. This both enables corporate access to employee data and allows for new user certificates to be quickly regenerated in the event of a lost password.

### Digital Certificates

A “digital certificate” is a block of data used for identification purposes. Typically a certificate is signed by a CA’s private key, providing integrity and authenticity guarantees. Non-PGP certificates generally use the X.509v3 hierarchy, which contain the following (common) fields:

* Version Number: The X.509 version of the certificate.
* Serial Number: A unique serial number for the certificate, assigned by the CA.
* Signature Algorithm Identifier: The cryptographic algorithm used to sign the certificate.
* Issuer Name: The CA’s name.
* Period of Validity: Start and end dates for when the certificate should be considered valid, absent key compromises. Typically one year.
* Subject/Owner Name: The name of the entity being identified, typically either a domain name or an entity name in X.500 “distinguished name” (DN) format (which is basically a list of LDAP attributes).
* Subject/Owner Public Key: The public key of the entity being identified, along with associated cryptographic information (algorithm, etc.).
* Extensions: Additional requirements not supported by previous versions of the X.509 standard. Additional fields may restrict the use of the *private* key corresponding to the enclosed public key in certain ways or provide alternate domain names for servers.
* Signature Value: The actual signature of the (remainder of?) the certificate.

The inclusion of a public key within the certificate allows for encrypted communications to be safely bootstrapped (so, for example, the initial Diffie-Hellman key exchange can be encrypted in both directions). 

Exam Cram indicates that it is likely the Security+ exam will require recognizing the parts of an X.509 certificate.

* [Transport Layer Security (Wikipedia)](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [Public key certificate (Wikipedia)](https://en.wikipedia.org/wiki/Public_key_certificate)
* [Diffie-Hellman and Forward Secrecy](https://www.zwilnik.com/security-and-privacy/diffie-hellman-and-forward-secrecy/)
* [Diffie-Hellman key exchange (Wikipedia)](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
* [X.500 (Wikipedia)](https://en.m.wikipedia.org/wiki/X.500)
* [Lightweight Directory Access Protocol (Wikipedia)](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)

### Public and Private Key usage

The X.509 standard does not support multiple keys, so if different keys are used for different purposes then multiple certificates must be exchanged.

### Certificate Signing Requests

A certificate signing request (CSR) is just a structured request to a CA to generate a digital certificate, including the information required for that certificate (as well as anything else the CA requires). CSRs are signed by the private half of the included public key.

### Certificate Policies

The rules indicating how a certificate may be used. While the certificate policies are distinct from the certification practice statement (above), there can also be a lot of overlap (for example, renewal policies). The key here is that the certification practice statement describes the CA’s practices *as a whole*, which the certificate policies apply only to the certificate being issued.

### Certificate Types

For server TLS certificates:

* Domain Validation (DV): Only validate a domain and include no other information.
* Organizational Validation (OV): Verifies organizational details against government records.
* Extended Validation (EV): Requires a more comprehensive validation of the entity the certificate is issued to.

Browser used to treat these three types of certificates differently (for example, by displaying the business name in the URL bar for EV certificates), but this is no longer commonly done.

Other types of certificates:

* Wildcard: Applies to all subdomains of the registered domain (\*.example.com).
* SAN: Applies to both the registered domain and a list of “subject alternate names” (SANs). SANs can include IP addresses. Sometimes called a “unified communications” (UC) certificate.
* Code Signing: Used to digitally sign software (I’m pretty sure this certificate is also embedded in the signed binary or otherwise associated with the code).
* Self-Signed: A certificate that has been signed by the private half of the embedded public key.
* Email: A certificate specifically flagged for use with S/MIME.
* Root Signing: The certificate for a CA itself, such as those included with web browsers.
* User/Client: Identifies an individual. Typically used for certificate-based authentication.
* Machine/Computer: Identifies a particular machine. Typically used for peer-to-peer communications

References:

* [Verifying Windows binaries, without Windows](https://blog.trailofbits.com/2020/05/27/verifying-windows-binaries-without-windows/)

### Certificate Formats

Certificates can be binary of base64 encoded. Common formats:

| Format        | Encoding | Used In                | Extensions        |
|:------------- |:-------- |:---------------------- |:----------------- |
| DER           |  Binary  | Java                   | .der, .cers, .crt |
| PEM           |  Base64  | Linux, macOS           | .pem, .cer, .crt  |
| PFX (PKCS#12) |  Binary  | Windows                | .pfx, .p12        |
| P7B (PKCS#7)  |  Base64  | Windows, Apache Tomcat | .p7b, .p7c        |

PEM stands for “privacy enhanced mail”, and is the most common format. PEM files can actually contain multiple certificates and private keys, separated by BEGIN CERTIFICATE / END CERTIFICATE and BEGIN PRIVATE KEY / END PRIVATE KEY specifiers (each specifier is preceded and followed by `-----`). The .key extension is also sometimes used for PEM files, but only when the file contains a single private key.

The PKCS#7 key format looks superficially similar to PEM, but uses the BEGIN PKCS7 / END PKCS7 specifier (again preceded and followed by `-----`).

DER stands for “distinguished encoding rules”.

PFX stands for “personal information exchange”. Like PEM, multiple certificates and private keys can be stored in a single .p12 file.

### Certificate Revocation

Revocation occurs when a certificate is invalidated *before* its expiration date. Revocations can be communicated in one of two ways:

* A certificate revocation list (CRL) is basically a simple list of revoked certificates, and is used as part of client or server certificate validation. Because this is a simple file, it must be kept constantly updated.
* The Online Certificate Status Protocol (OCSP) allows certificate revocation to be checked against the CA in real time. However, clients generally fail OCSP open, which is why OCSP stapling (below) exists.

Certificates can also be “suspended”, which is a state that indicates it is under investigation for revocation. While a suspended certificate may remain in place, it is not valid for any uses.

### OCSP Stapling

OCSP stapling involves the *web server* providing OCSP validity information as part of the TLS handshake. To perform stapling, the web server does the following:

* The web server more-or-less makes an OCSP request for its *own* certificate.
* The CA responds with a standard OCSP response, including the certificate identifier, the certificate status, and a timestamp indicating how long the returned information is valid. All of this is signed by the CA.
* The web server appends the CA’s OCSP response to its own certificate when presenting it to the client.
* The client verifies the OCSP response as if it came from the CA itself (after checking the signature). If an invalid response is presented, the client performs its own OCSP request.

OCSP stapling tries to work around the problem of clients failing open when no OCSP response is returned, though the solution is incomplete (a malicious party that can potentially strip both the stapled OCSP response and block the client OCSP requests). It does resolve the privacy and load issues of the original OCSP implementation, however.

* [OCSP stapling (Wikipedia)](https://en.wikipedia.org/wiki/OCSP_stapling)
* [Transport Layer Security (TLS) Extensions: Extension Definitions (RFC 6066)](https://datatracker.ietf.org/doc/html/rfc6066)
* [X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP (RFC 6960)](https://datatracker.ietf.org/doc/html/rfc6960)

### Pinning

While Exam Cram’s assertion that certificate pinning exists to thwart man-in-the-middle attacks is *technically* true, I think it misses the broader picture of how weak the CA system has turned out to be in practice (if the CA system worked correctly, man-in-the-middle attacks on SSL connections would be *much* harder).

## ITPro.TV: CompTIA Security+ (SY0-601)

### Secure Protocols

The TLS handshake:

* The client sends a list of supported cipher suites + a random number.
* The server sends back the strongest cipher from the list the client provided that it supports, its own certificate, and a random number.
* The client uses the server’s public key to encrypt a shared secret derived from the exchanged random numbers and send it back to the server.

This encrypted shared secret then becomes the basis of the shared session key(s). (There are really two keys — an HMAC key which verifies the validity of the session key, and the session key itself.)

(When using ephemeral Diffie-Hellman to derive a rotating session key, we don’t actually encrypt anything with the server’s public key in the last step, nor do we use the two exchange random numbers. Instead, the server picks Diffie-Hellman parameters `p` and `g`, and sends those along with its own derived public key. Importantly, the server also *signs* this message, preventing it from being tampered with. The client then uses `p`, `g`, and its own secret to produce a public key, which it sends to the server. The encrypted connection established, the first thing that the client and server send are hashes of the initial handshake messages to verify the integrity of the initial negotiation… Though I think as of TLSv1.3 this hash exchange may be largely vestigial?)

Important ports:

| Protocol      | Port | Encrypted? |
|:------------- | ----:|:----------:|
| SSH           |   22 |      Y     |
| LDAP          |  389 |            |
| LDAPS         |  636 |      Y     |
| HTTP          |   80 |            |
| HTTPS         |  443 |      Y     |
| POP3          |  110 |            |
| POP3S         |  995 |      Y     |
| IMAP          |  143 |            |
| IMAPS         |  993 |      Y     |
| SMTP          |   25 |            |
| SMTP+SSL      |  465 |      Y     |
| SMTP+STARTTLS |  587 |      Y     |

(Dan Lowrie states that scp is considered deprecated now… Which surprisingly turns out to be true! Though there’s apparently a version of scp that’s actually sftp under the hood in development, so the end impact of this deprecation will probably be close to zero.)

SRTP: Secure Realtime Transport Protocol.

SNMP handles not just reporting, but also device configuration. Only SNMPv3 has encryption and authentication.

* [Diffie–Hellman key exchange (Wikipedia)](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
* [Transport Layer Security (Wikipedia)](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [HTTPS: The TLS Handshake Using Diffie-Hellman Ephemeral](https://thecybersecurityman.com/2018/04/25/https-the-tls-handshake-using-diffie-hellman-ephemeral/)
* [TLS Handshake (OSDev.org)](https://wiki.osdev.org/TLS_Handshake)
* [Deprecating scp](https://lwn.net/Articles/835962/)

### Keys

Cryptographic Service Provider: The algorithm used to generate an encryption key (AES, etc.).

Note that RSA defines both a *type* of public/private keypair *and* a key exchange algorithm. In fact, that key exchange algorithm was the standard in SSL/TLS up until TLSv1.3 (when all key exchange methods except those based on ephemeral Diffie-Hellman were removed) — it’s the algorithm that uses the two random numbers exchanged during the initial negotiation to generate a (symmetric) session key!

Key stretching is primarily used to increase the effective length of encryption passwords (that are then used to derive keys). Important key stretching algorithms:

* BCRYPT (uses Blowfish)
* PBKDF2

Both of these are about using salts + multiple hashing rounds.

The most popular key derivation protocol is probably ECDHE at this point, as it is both fast and secure (a seldom-seen combination!).

* [RSA (cryptosystem) (Wikipedia)](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29)

### PKI Concepts

OCSP: Online Certificate Status Protocol.

Active Directory’s PKI infrastructure is called “Active Directory Certificate Services”.

The “Online Responder” role forAD Certificate Services handles OCSP requests.

“Enterprise CAs” integrate with AD, while “Standard CAs” don’t.

Typically, root CAs have longer keys than subordinate CAs, which have longer keys than user/entity keys. Root CA keys also generally have *much* longer validity periods than intermediate CA or user/entity keys.

Root CA certificates are self-signed by default, though in a bridged PKI system they will also be signed by the bridge CA key.

### Certificates

Important types:

* Self-signed
* Machine certificates
* User certificates (mostly for authentication)
* Code signing
* Wildcard
* Domain validation (DV — the lowest level of domain validation, only verifies control over the domain)
* Organization validation (OV — validates the organization itself)
* Extended validation (EV — more extension organizational validation, kind of a scam)

Certificate formats:

| Format                                | Purpose                                                                          |
|:------------------------------------- |:-------------------------------------------------------------------------------- |
| Distinguished Encoding Rules (.der)   | Binary encoded, .cer if no private key                                           |
| Privacy Enhanced Mail (PEM)           | Base64 encoded, lots of extensions (.pem, .cer, .crt)                            |
| Public Key Cryptography Standard \#7  | Includes public key + certificate chain (.p7b)                                   |
| Public Key Cryptography Standard \#12 | Everything in PKCS#7 + private key and additional certificate information (.p12) |

PKCS#12 is generally used for backing up CAs, while PKCS#7 is used for normal key exchange. Both of these are (almost exclusively) used by Windows.

### IPSec

IPSec: Internet Protocol Security. Not really a single protocol — more a family of inter-related protocols.

IPSec is primarily used as a VPN solution (both site-to-site/gateway-to-gateway and client-to-gateway).

IPSec is built on a number of components, the most basic of which is the ”Security Association” (SA) — trust relationships between endpoints (could be client-to-client, client-to-gateway, or gateway-to-gateway).

(IKE) Phase 1 SA (“main mode”) doesn’t actually set up an IPSec connection, but instead negotiates a single encrypted *bidirectional* tunnel between the endpoints. The negotiation consists of:

* Diffie-Hellman exchange
* Client/Gateway authentication (PSK or certificates)
* Encryption method (DES, 3DES, or AES — probably only the last of these)
* Session duration

The phase 1 tunnel is then used to set up the (IKE) Phase 2 SA (“quick mode”), which establishes two *unidirectional* encrypted tunnels between the endpoints. In phase 2, the negotiation consists of:

* IPSec protocol (AH or ESP)
* Encapsulation method
* Authentication via hash exchange (typically MD5 or SHA1)
* Session duration
* Additional Diffie-Hellman exchange (if perfect forward secrecy is desired)

Note that the only data sent over the phase 1 connection is the configuration information necessary to set up phase 2 — all actually point-to-point communications happen via the phase 2 tunnels.

Every security association has an identifier (which is invalidated after the session is over), and packets are sequenced as well. This provides two layers of protection against replay attacks.

There are two IPSec ”protocols”:

* Authentication Header (AH, IP protocol identifier 51) provides authentication and integrity guarantees, but does *not* provide encryption.
* Encapsulating Security Payload (ESP, IP protocol identifier 50) provides authentication, integrity, *and* encryption.

These protocols can be used independently or together. The main reason to mix-and-match is if you are using encryption (which requires ESP) for only *some* connections on your network. Since AH is partially duplicative of ESP, by using both (and turning off the overlapping capabilities in ESP) you can ensure that all IPSec packets use AH with only a small increase in the overhead of packets using ESP. This allows for (modestly) simpler firewall rules.

There are also two IPSec encapsulation methods used by ESP:

* Transport mode is used for client-to-client and client-to-gateway connections. It preserves the original packet headers but encrypts the packet data.
* Tunnel mode is used between gateways. It encrypts the *entire* original packet, appending a *new* header.

The distinction makes sense when you consider that tunnel mode is joining two existing networks, while transport mode is joining two individual machines on the “same” network. You could imaging using tunneling mode in place of transport mode, but then the new header would be (functionally) the same as the original header; thus, there is no security benefit to encrypting the original header in this situation. The extra “translation” step between the gateways is why encrypting the entire original packet makes sense.

Additionally, IPSec tunnels are built using either PPTP (the point-to-point tunneling protocol) or L2TP (the layer 2 tunneling protocol). Note, however, that only L2TP is considered secure.

IKE occurs over the Internet Security Association and Key Management Protocol (ISAKMP), which is how its tagged in Wireshark.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 6, 2022
