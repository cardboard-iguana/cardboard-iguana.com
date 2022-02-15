# TryHackMe: Complete Beginner (Supplements)

## MAL: Malware Introductory

### What Is the Purpose of Malware Analysis?

Three objectives of malware analysis:

* How is it spread?
* What are its IOCs?
* What does it do?

### Identifying if a Malware Attack Has Happened

Malware lifecycle:

* Delivery
* Execution
* Persistence (sometimes)
* Propagation (sometimes)

The last two of these stages are generally the noisiest. *Persistence* produces primarily (only?) *host-based* signatures, while *propagation* leads to more *network-based* signatures.

Malware is generally classed by how it *executes* (i.e., what it does).

### Static vs. Dynamic Analysis

The difference here basically boils down to: Did you run it?

Seems like it’s probably best to do dynamic analysis in a cloud VM or something. Though a lot of malware tries to detect if it’s running in a VM these days, so…

### Discussion of Provided Tools & Their Uses

Some malware can actually spread over RDP. Ack!

### Now Let’s See if the MD5 Checksums Have Been Analyzed Before

I hadn’t noticed this before, but you can submit a file hash to [VirusTotal](https://www.virustotal.com/) instead uploading a file or submitting a URL. Handy!

### Identifying if the Executables are Obfuscated / Packed

It seems like Windows executables have a [magic number](../notes/magic-numbers.md) of `4D 5A`.

### Introduction to Strings

[Microsoft Sysinternals](https://docs.microsoft.com/en-us/sysinternals/) has a `strings` command. Neat!

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 17, 2021
