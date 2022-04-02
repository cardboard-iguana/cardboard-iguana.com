# ITPro.TV: CompTIA Security+ (SY0-601)

## CompTIA Security+ Exam Cram

Today I’ll be covering Chapter 14 of the Security+ Exam Cram, “Embedded and Specialized Systems”. I should really have read this before [March 27th](2022-03-27-itprotv-comptia-security-plus.md).

### Embedded Systems

> “The best protections for maintaining embedded device security include requiring software and hardware vendors to provide evidence that the software has no security weaknesses…”

Bwah ha ha ha ha ha!

### SoC and RTOS

Interesting term here: “Intellectual Property (IP) block”, a SoC “module” that is acquired from a third-party vendor. Kind of like a software library, but for circuits. The implication (which Exam Cram doesn’t state but seems to imply) is that IP blocks have defined interfaces but otherwise operate as “black boxes” on a SoC. This reminds me a bit of how cellular modems often have their own processors and run their own operating systems (perhaps because these are “IP blocks”?).

FPGA = Field Programmable Gate Array

If I gather correctly, the difference between a CPU and an FPGA is that a CPU has a fixed architecture that can run multiple applications, while an FPGA has a programmable architecture that only runs *one* application (at a time). So, they’re *almost* mirror images of each other. CPUs are going to be more flexible, but FPGAs *can* be made faster for a given application (because the architecture can be programmed in a fashion that’s optimized for that application).

* [FPGA vs. CPU – What is the difference](https://hardwarebee.com/fpga-vs-cpu-difference/)

### SCADA and ICS

SCADA = Supervisory Control and Data Acquisition

SCADA is part of the broad category of ICS (Industrial Control Systems); part of its job is to provide a human interface to industrial processes, but it can also just be concerned with internal data collection or automation. SCADA is not so much a “standard” in the IT-sense of the word as a “standardized way of handling and displaying information and connections between industrial systems”, which may be highly eccentric and proprietary under the hood.

ICS systems are generally touchy, and as such standard “hands-on” security practices often don’t work well. *Physical* external and internal segmentation and one-way data flows are the primary security mechanisms used for ICS.

* [SCADA (Wikipedia)](https://en.wikipedia.org/wiki/SCADA)

### Smart Devices and IoT

The Exam Cram apparently considers the Roomba the first widely-used home automation system!

How to find out if home automation is vulnerable to public attack? The Exam Cram recommends Shodan!

Another mention of “Zigbee” as a home automation tool. Apparently this actually is an IEEE standard for the creation of “wireless personal area networks” (WPANs) — think Bluetooth, but shorter range, lower data rate, and lower power.

* [Shodan](https://www.shodan.io/)
* [Zigbee (Wikipedia)](https://en.wikipedia.org/wiki/Zigbee)

### Multifunction Devices

“Multifunction devices” are somewhat confusingly abbreviated as MFDs. Basically, this is a fancy name for printer/copier/scanner/fax units.

### Special-Purpose Devices

The Exam Cram defines “special-purpose devices” as single-processor, industry-specific devices that are designed for only a single function (which often means running a single, embedded, program).

### Medical Devices

While the potential for medical device hacks generate a lot of (very real and justified!) concern, the statistics provided by the Exam Cram indicate that < 0.5% of medical devices are actually publicly discoverable on the internet.

### Vehicles

Apparently, internal device communications within automobiles is all plaintext, which is a problem when systems connected to the vehicle CAN (controller area network) are then connected to the internet as a whole.

### Resource Constraints

This section reminds me of a trilemma I coined during a discussion with other members of the Yak Collective:

> NECOPINUS' TRILEMMA: For any computational system, there is a trade-off between the integrity of the system's computations, the speed at which these computations can be made, and the energy used by the system while making those computations.

I later posted that to Twitter, and came up with a pithier corollary:

> Secure, fast, inexpensive: Pick two.

So it goes.

* [The Yak Collective](https://yakcollective.org)
* [Necopinus’ Trilemma (Twitter)](https://twitter.com/necopinus/status/1488201961144913923)
* [Corollary to Necopinus’ Trilemma (Twitter)](https://twitter.com/necopinus/status/1488201962394767360)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 1, 2022
