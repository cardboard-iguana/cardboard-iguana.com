# ITPro.TV: CompTIA Security+ (SY0-601)

## CompTIA Security+ Exam Cram

Today it’s chapter 11 of the Exam Cram Security+, “Secure Application Development, Deployment, and Automation“.

### Application Environment

“Application environments” here just refers to the separate network/data environments often used in application development (dev/prod, testing/staging/production, etc.).

### Provisioning and Deprovisioning

* PROVISIONING: The creation or updating of some resource.
* DEPROVISIONING: The removal of some resource.

Most software provisioning is *still* self-service.

### Integrity Measurement

“Integrity measurement” is the process of using (normally signed) hashes to track the software and hardware state of a platform. This can be used to ensure that a given system is in a known state, or for device identity verification.

Windows integrity measurement uses the TPM to collect and verify measurements. However, the underly operating system (or device firmware) is still responsible for collecting these measurements and taking action based on TPM’s output.

Linux systems use the “Integrity Measurement Architecture” (IMA) kernel module. The IMA works by verifying loaded code against a list of known hashes, and can work in conjunction with the IMA.

TPMs typically collect information using the “Core Root of Trust for Measurement” (CRTM) process. In this process, the TPM hashes the bootloader before loading and stores that hash in a (secure?) “platform configuration register” (PCR). When the bootloader in turn loads a kernel, the hash of that is stored in a PCR as well, and so on and so forth as additional applications and libraries are loaded. When asked to attest to a device state, the TPM aggregates the contents of the PCRs, signs them with an “attestation identity key” (AIK), and passes them to the process that has requested the attestation. It is the responsibility of the process requesting attestation, not the TPM, to then verify that the machine state is good.

### Secure Coding Techniques

Exam Cram emphasizes that the Security+ exam is interested in the use of both manual source code analysis and automated testing as part of the secure software development process.

### Normalization

Normalization is the process of converting string data to its simplest possible form, ensuring that the underlying application code deals with only a single binary representation of a given user input. It is important to validate input *after* normalization in order to avoid malicious input that take advantage of Unicode’s variability.

### Stored Procedures

Stored procedures can be used to frustrate SQLi attacks; this works because an application can be provided access to the stored procedure *without* being provided access to the database directly. SQLi is still possible, however, if dynamic SQL is allowed within the stored procedures.

* [SQL Injection](../notes/sql-injection.md)

### Encryption, Obfuscation, and Camouflage

“Camouflage” is the process of embedding (realistic) fake code into a binary in order to frustrate attempts at reverse engineering. It is separate from “obfuscation”, which tries to deliberately make code harder to read.

“Camouflage” is most often used in compiled applications, while “obfuscation” is most often used in scripting.

### Code Reuse and Dead Code

Exam Cram emphasizes that dead code is still *functional*, just dormant. Code paths that are no longer accessibly during normal operations, etc.

### Server-Side vs. Client-Side Execution and Validation

* CLIENT-SIDE VALIDATION: Input validation that occurs on the “user” side, such as in the web browser (via JavaScript) or within a compiled application.
* SERVER-SIDE VALIDATION: Input validation that occurs on the server side (theoretically not accessible to the user).

Client-side validation is recommended from a user experience perspective, but server-side validation is necessary to achieve any real application security. Ideally, use both.

### Data Exposure

“Data exposure” occurs when sensitive information is transmitted or stored in unencrypted form (no matter how temporarily). Key concerns:

* Direct data exposure (for example, during upload)
* Weak cryptography
* Data exposure in the browser cache

### Proper Error Handling

Hadn’t thought of this before, but it makes sense: Encrypt session cookie data.

Further suggestions:

* Log detailed error messages on the back end, but display only minimal errors on the user-side
* Do not include comments in publicly visible (read: web application) code.

### Proper Input Validation

Common results of input validation failures:

* Buffer overflows
* Format string exploits
* Application denial of service

Exam Cram recommends that inputs always have sensible (fallback) defaults and length limits as a first-line defense.

### Automation and Scripting

SCAP (the “Security Content Automation Protocol”) was developed by NIST in order to standardize configuration validation. The EU has developed a similar system called COAS (“Configuration Assessment as a Service”) targeted at distributed environments.

Windows also has the “Security Configuration and Analysis” snap-in for this purpose.

### Secure DevOps

Huh. The concept of “infrastructure as a service” originated with SecDevOps.

CI/CD stands for “continuous integration / continuous *delivery*”.

“Continuous Integration (CI) server” and “build server” mean the same thing. Build servers generally also incorporate automated unit and application tests.

Exam Cram indicates that the Security+ exam can be somewhat pedantic in equating “identified” with “detected”. So, for example, an “incorrectly identified vulnerability” (a phrase that I read as ambiguous) should be read as a “false positive”.

### Scalability and Elasticity

* SCALABILITY: The ability to change the capacity/throughput of an application or system without impacting its performance. Vertical scalability is scalability within a singly application or system instance, while horizontal scalability is the ability to add or remove additional (existing!) systems or application instances to handle changes in demand.
* ELASTICITY: Is how *rapidly* a system or application can scale. The elasticity of a system or application is generally heavily dependent on the automation brought to bear on it. The term is most often applied to cloud environments, and is generally associated with cost optimization.

It’s generally best to think of scalability as operating over a fixed resource pool, while elasticity is about changing the size of the resource pool.

## ITPro.TV: CompTIA Security+ (SY0-601)

### Application Security

Two types of input validation:

* SYNTACTIC VALIDATION confirms that the input matches the expected length, type, format, etc.
* SEMANTIC VALIDATION confirms that the input is sensible in the current application context (for example, end dates must occur on or after start dates).

Input validation can be represented as a “schema” in many languages.

Blacklisting and whitelisting characters can be useful in string validation, though in general whitelisting is a little bit more reliable (or at least has less-bad failure modes).

Be careful with information leaks in HTTP headers.

* STATIC CODE ANALYSIS: Automated code scanning. Importantly, this happens when the code is *not* running, or even at the source code stage.
* DYNAMIC CODE ANALYSIS: Automated analysis of (and sometimes involving interaction with) *running* code. Includes unit tests, automated fuzzing, etc.
* MANUAL CODE ANALYSIS: A person actually reads the source code.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> March 15, 2022
