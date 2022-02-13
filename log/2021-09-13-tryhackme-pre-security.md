# TryHackMe: Pre Security

## Intro to LAN

### Introducing LAN Topologies

Some common network topologies:

* ”Star” topologies comprise the hierarchical branching networks most commonly seen today. It’s actually quite expensive relative to other topologies (because of the specialized hardware), and switches become a central point of failure, but its hierarchical nature makes it very scalable.
* “Bus” topologies hang all machines off of a single “backbone” cable. Data travels in both directions down the cable, and machines listen for packets meant for them — a design prone to contention. But they *are* cheap.
* “(Token) Ring” topologies are, well, big rings. Data flows in only one direction, which makes them very efficient, but any break severs the *two*-way connectivity of *every* machine. (I know that the phone networks are designed similarly to this, but use two rings running in opposite directions to work around this flaw.)

Key hardware terminology:

* “Hubs” are dumb devices that just repeat every packet they see in one port on every other port.
* “Switches” are a bit smarter, keeping track of which machines are connected to which port and making sure that packets get routed only to those ports where destination machines are reachable.
* “Routers” are switches that understand larger topologies — not just “which machine is connected to me?”, but also “which networks are connected to me?”

While switches don’t (necessarily) know about IP addresses, the correspondence here is fairly clear: Switches generally handle devices on the same subnet (since each device expects to be able to directly communicate with all subnet IPs), while routers bridge (provide the “gateway” to) different subnets. This starts to get a little muddled when dealing with things like VLANs, though if you think of a VLAN-aware switch as a stack of “virtual switches” it helps.

### A Primer on Subnetting

Subnetting is typically used to segment networks by function.

The “network address” of a subnet is the first IP address available in the subnet, and is used to identify the network.

### The ARP Protocol

The ARP (Address Resolution Protocol) protocol is used to associate IP addresses with MAC addresses. Devices use ARP to determine the machine that responds to a particular IP address. Doing this every time a packet needs to be sent would get costly both in terms of network bandwidth and compute power, so devices will cache MAC-to-IP relationships (physical-to-logical identifiers) for some time after initial discovery.

ARP uses a two-step exchange: The device looking for an IP address will broadcast an ARP request to the entire network looking for a machine that responds to a given IP address. Then *only* the machine with that IP address will send an ARP reply, however.

### The DHCP Protocol

“DHCP” stands for “Dynamic Host Configuration Protocol”.

DHCP uses a four-step exchange:

* The device sends a DHCP discover looking for a DHCP server.
* The server responds with a DHCP offer containing an available IP address.
* The device accepts this IP address by replying with a DHCP request.
* The server then acknowledges the request with a DHCP ACK, which includes how long the device may use the offered IP address before repeating this process.

## OSI Model

### What is the OSI Model?

OSI stands for “Open Systems Interconnection”; it is a seven-layer model that describes all parts of the network stack (though sometimes I’ve heard the user referred to as “layer 8”). The idea is that segmenting responsibilities by layer allows for more uniform network and device behavior.

* Layer 7: Application (highest)
* Layer 6: Presentation
* Layer 5: Session
* Layer 4: Transport
* Layer 3: Network
* Layer 2: Data link
* Layer 1: Physical (lowest)

Higher layers extend (“encapsulate”) lower layers.

### Layer 7: Application

The application layer determines how the user interacts with data. This is where, well, user-facing applications live.

More or less anything goes at the application layer.

### Layer 6: Presentation

The presentation layer is where data standards live. What does an email look like? How is HTTP structured? Etc.

In general, this is the layer where security features like SSL are layered on.

### Layer 5: Session

The session layer is responsible for actually connecting two machines and transmitting the data between them. Data is transmitted in a “session” — a successful connection between two systems.

This is the layer where packets live.

### Layer 4: Transport

The transport layer determines *how* data is sent in a session. This is where TCP and UDP (as protocols) live.

TCP stands for “Transmission Control Protocol”.

UDP stands for “User Datagram Protocol”. One of the key aspects of UDP is that the *application* layer gets to decide how quickly packets are sent in a given session. ARP and DHCP both operate over UDP.

### Layer 3: Network

This is the layer routers live at, and is where packets of data are assembled and disassembled.

Two key routing protocols:

* OSPF (Open Shortest Path First)
* RIP (Routing Information Protocol)

The network layer is (mostly) the one that uses IP addresses; typically it is in this layer that data is handed off from the computer to the larger network.

### Layer 2: Data Link

The data link layer translates the logical (IP) addresses of the network layer into physical (MAC) addresses. If data needs to be re-arranged to deal with physical limitations of the network, it happens here (so this is where things like MTUs come into play).

Because switches (generally) only care about MAC addresses, they live in this layer.

### Layer 1: Physical

This is where actual physical cabling lives — the layer of atoms and electricity.

I suppose that a hub would be a layer 1 device, since it’s just shuffling actual (electrical) packets.

## Packets & Frames

### What are Packets and Frames?

Packet and frames are more-or-less the same idea, but at two different layers (transport and data link, respectively) of the OSI model. To expand upon the definition above, the network is the OSI layer with the responsibility of turning packets into frames (and vice versa). Alternately, packets *encapsulate* frames.

In general, we can think of a *frame* as the actual data, which is encapsulated by IP addressing information.

### TCP/IP

A four-layer alternative to OSI!

* Layer 4: Application (highest)
* Layer 3: Transport
* Layer 2: Internet
* Layer 1: Network interface (lowest)

Same approach to encapsulation as OSI.

Key TCP headers:

| Header                 | Description                                                                                                                                                             |
|:---------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time to Live (TTL)     | How long a packet should live on the network before being discarded.                                                                                                    |
| Source port            | A random (unused) port chosen by the sender.                                                                                                                            |
| Destination port       | The port on the receiving end, which normally is determined by the application being used.                                                                              |
| Source address         | “From” IP address.                                                                                                                                                      |
| Destination address    | “To” IP address.                                                                                                                                                        |
| Sequence number        | A random number that identifies a given connection.                                                                                                                     |
| Acknowledgement number | Starts at the sequence number and then increases by one for each packet sent. Used to ensure that no data is lost, and that packets are reassembled in the right order. |
| Checksum               | Integrity check.                                                                                                                                                        |
| Data                   | The, well, data.                                                                                                                                                        |
| Flag(s)                | How the packet should be handled (SYN, ACK, FIN, RST, etc.).                                                                                                            |

Key TCP flags:

* SYN: Initialize connection.
* SYN/ACK: Acknowledge connection initialization (not an *actual* flag, but rather [a SYN flag + an ACK flag](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure)).
* ACK: Acknowledge packet receipt.
* DATA: Actual connection data ([not sure if this is *actually* a flag](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure)).
* FIN: End connection.
* RST: Error.

TCP’s “three way handshake” opens a connection by establishing a random sequence number.

* Client sends SYN with an initial sequence number (ISN).
* Server sends a SYN/ACK — its own ISN as well as the client ISN + 1.
* The client sends an ACK of the server ISN + 1.

(Unfortunately, it’s still a little unclear to me how to think about the progression of sequence and acknowledgement numbers over the course of an entire connection. I did a little more searching around, but the other examples I’ve found are even more abbreviated and/or obtuse.)

Closing the connection uses a “four way handshake”:

* Client FIN
* Server ACK
* Server FIN
* Client ACK

### UDP/IP

UDP is *stateless*. It shares a few headers with TCP:

| Header               | Description                                                                                                                                                             |
|:-------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time to Live (TTL)   | How long a packet should live on the network before being discarded.                                                                                                    |
| Source port          | A random (unused) port chosen by the sender.                                                                                                                            |
| Destination port     | The port on the receiving end, which normally is determined by the application being used.                                                                              |
| Source address       | “From” IP address.                                                                                                                                                      |
| Destination address  | “To” IP address.                                                                                                                                                        |
| Data                 | The, well, data.                                                                                                                                                        |

Since there are no handshakes in UDP, data transmission is fairly simple:

* Client request
* Server response (and response and response and…)

The connection ends when the server stops sending data or the client stops listening. In practice this means that the application layer does need to layer on *some* kind of client/server messaging system, but UDP does not concern itself with these details.

### Ports 101

Ports identify applications (or services provided by an application). There are 2¹⁶ possible ports numbered 0 - 65535.

Ports 0 - 1023 are “common ports” (I’ve typically heard this block called “reserved” or “system”; [Wikipedia](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) calls them “well-known”).

- - - -

👤 Nathan Acks
📅 September 13, 2021
