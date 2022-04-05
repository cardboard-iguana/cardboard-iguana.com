# ITPro.TV: CompTIA Security+ (SY0-601)

## Virtualization

Type I hypervisors (bare metal) are most common in business applications. And Qubes. Cloud systems are obviously all based around Type I hypervisors.

Type II hypervisors are just specialized applications. VirtualBox, etc. Fine for individuals, but not as efficient… And certainly not scalable!

Virtual (guest) networking is accomplished using a switch virtualized within the hypervisor. Virtual networking can be fully isolated, VM-to-host, or VM-to-LAN (which obviously also includes the host).

Major cloud container providers:

* Docker Hub
* Oracle Cloud Infrastructure Compute
* Canonical LXD
* Amazon Elastic Container Service

## Cloud Concepts

Cloud Computing: Delivery of computing services over the internet.

Cloud Service Provider: Organization providing cloud computing services.

Tenant: A single customer or multiple customers within a cloud provider’s network.

Elasticity: The ability of (additional) resources to be assigned (to a tenant) without service interruption.

Scaling Out: Adding more instances to service.

Scaling Up: Adding more resources (compute, RAM, etc.) to an instance.

(Confusingly, the opposite of both “scaling out” and “scaling up” tends to be called “scaling down”.)

## Cloud Services

“Traditional” cloud services:

* Software as a Service (SaaS): Applications provided on cloud infrastructure.
* Platform as a Service (PaaS): Runtime environment provided on cloud infrastructure. (Glitch, but also Quickbase.)
* Infrastructure as a Service (IaaS): Organization providing cloud computing services.

“Anything as a Service” (XaaS):

* Containers as a Service (CaaS)
* Code as a Service (CaaS)
* Storage as a Service (STaaS)
* Desktop as a Service (DaaS)
* Security as a Service (SECaaS)
* Database as a Service (DBaaS)

## Cloud Models

* Public: Azure, AWS, GCP, et al.
* Private: Cloud infrastructure that is used, managed, operated, and owned by a single organization. Basically on-prem++. Some times used to refer to (physical + logical) portions of public cloud infrastructure that are dedicated to a single customer.
* Community: Like a private cloud, but shared by multiple organizations within a single industry (i.e., more specialized / smaller customer base than a public cloud).
* Hybrid: Infrastructure that spans multiple cloud models (and/or on-prem).

“Transit gateways” provide inter-cloud and cloud-to-on-prem connections in hybrid situations.

## Computing Types

Cloud vs. Edge vs. “Fog” computing.

(“Fog” computing is really about enabling edge-like computing for ultra-low power IoT devices. Such devices generally require some more powerful local system — the “IoT gateway” — to handle processing and data storage tasks. This system, in turn, may periodically communicate with either cloud-based systems or more distributed systems known as “fog nodes”.)

It’s really all about latency.

There’s also the matter of “human” cloud services — managed service providers (MSPs).

Security MSPs go by their own moniker — MSSPs (“managed *security* service providers”).

On a completely random note, ITPro.TV’s also going to cover software-defined networking (SDN). ITPro.TV seems to be defining software-defined networking as API-driven and abstracted network management. Three layers:

* Application Layer: Applications using, or providing management panes on to, the network.
* Control Layer: The “SDN controller”, which orchestrates the underlying infrastructure.
* Infrastructure Layer: This is what we normally work with.

Application/Controller communication is called the “northbound API”; this is less standardized but generally involves REST APIs.

Controller/Infrastructure communication is called the “southbound API”, and is generally implemented using OpenFlow.

## Cloud Security Controls

Networking controls:

* Public Subnets: Think of these as DMZs. They are connected to the broader internet by way of “secure web gateways”, which provide firewall/proxy-like DNS filtering and IDS/IDP services (though low-level traffic filtering is handled by security groups).
* Private Subnets: Virtual networks for which public connections are not allowed. The VPC endpoint provides firewall/proxy-like controls between private and public subnets.

Other:

* Security Groups: Virtual firewalls, but only of the stateful sort. Sometimes protocol/application aware. Note that most next-gen firewall capabilities (IDS/IDP, etc.) really live within “secure web gateways” and “VPC endpoints”.

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> April 4, 2022
