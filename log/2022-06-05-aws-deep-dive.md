# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-06-05

It's been a while, hasn't it?

I'd originally intended to spend May wrapping up "supplemental" TryHackMe room's I'd been making note of while studying for the Security+ exam. But then I started a new job and wound up spending much of the time I had been using for my studies bringing myself up to speed instead.

The new job aligns much better with the direction I've been hoping to take my career, which is great. But it's also highlighting some real deficiencies in my knowledge of AWS. It's also really driven home that the exposure I've had to Burp Suite so far is not really adequate for real-world use cases.

So I'm going to put TryHackMe on (temporary!) hold, and spend some time beefing up on AWS and Burp Suite instead.

Fortunately, the new job has a great list of AWS-related videos, readings, course work, and hands-on "labs". Much (though not *all*) of this is public, which means that I can continue to use this space as my notebook most of the time. I'm still going to take *private* notes for non-public materials, but I'm afraid I can't share those in good conscience. This means that there are going to be more pauses than in previous sequences I hit non-public parts of my learning path.

Once I'm finished working through the AWS-related materials, I'm going to turn my attention to Burp Suite. There I'll be working my way through PortSwigger's Web Security Academy.

Once I'm done with both of these I'll turn back to the remaining TryHackMe "supplements", move on to a few odds-and-ends rooms focusing more on *defensive* security (it feels like I should have at least a passing knowledge of some of that), and then begin the process of working towards my Pentest+ certification!

* [2022-05-10 - TryHackMe: Jr. Penetration Tester (Supplements)](2022-05-10-tryhackme-jr-penetration-tester-supplements.md)
* [CompTIA Security+ ce Certification for Nathan Acks](https://www.credly.com/badges/0d86c824-a853-4d77-9c5a-7f510f63fe78/)
* [2021-09-11 - Context Setting](2021-09-11-context-setting.md)
* [Amazon Web Services](https://aws.amazon.com/)
* [PortSwigger: Burp Suite](https://portswigger.net/burp)
* [PortSwigger: Web Security Academy](https://portswigger.net/web-security/learning-path)

# AWS Essentials

I'll be starting off by watching through the "AWS Essentials" YouTube playlist put together by the Linux Academy.

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

## Project Omega!

This is apparently the framing device for the entire series. Pretty skippable.

* [AWS Essentials: Project Omega! (YouTube)](https://youtu.be/CGFrYNDpzUM)

## AWS Free Tier

Core AWS services:

* EC2
* EBS
* S3
* RDF/DynamoDB
* Elastic Load Balancing
* SNS
* Lambda

These all have some kind of free version.
* [AWS Essentials: AWS Free Tier (YouTube)](https://youtu.be/8p1bTTV6ATE)

## Create an AWS Account

Wow, AWS is using *voice calls* for account authentication! (At least they're automated...)

* [AWS Essentials: Create an AWS Account (YouTube)](https://youtu.be/_siSwgpVQNc)

## How to Navigate the AWS Console

You can switch between regions in AWS using a simple drop-down in the AWS Console's header.

* [AWS Essentials: How to Navigate the AWS Console (YouTube)](https://youtu.be/A43m4TDFCUM)

## What is IAM?

The first user in an AWS account is the "root" user, and has the sort of privileges this name implies.

While the root user gets permission to *everything*, subsequent users receive no permissions beyond what's required to log in - any additional capabilities must be added in the IAM interface.

* [AWS Essentials: What is IAM? (YouTube)](https://youtu.be/4ngYrnJb7F8)

## IAM Initial Setup and Configuration

After initially creating the root account, the first thing you should do is work through all of the "Security Status" items in the IAM console.

Amazon MFA is *always* TOTP-based (when AWS refers to a "hardware key fob", it means an RSA-style device, not a Yubikey).

For obvious reasons, the first thing you should probably do is create an additional (admin) user, and then generally *avoid* using the root user. Admin users are defined by having the `AdministratorAccess` policy attached.

* [AWS Essentials: IAM Initial Setup and Configuration (YouTube)](https://youtu.be/W_eu0rJN0yU)

## IAM Roles

Services (really, objects in a service) in AWS can't be assigned policies directly, but *can* be assigned *roles*.

In general, roles are used to package policies for *service objects*, while groups are used to package policies for *users*. (That said, roles *can* be assigned to users as well; they're quite flexible.)

* [AWS Essentials: IAM Roles (YouTube)](https://youtu.be/7sYE6J1_CsQ)
* [Assume the Worst: Enumerating AWS Roles through 'AssumeRole'](https://rhinosecuritylabs.com/aws/assume-worst-aws-assume-role-enumeration/)

## AWS Global Infrastructure

VPC (Virtual Private Cloud)  is the backbone of AWS's offerings.

"Regions" are groupings of AWS resources that are concentrated in a given location (AWS data centers are not spread out uniformly).

"Regions" are in turn made up of "availability zone", which are *geographically isolated* clusters of resources.

Every data center is assigned to *only* one availability zone; the purpose of availability zones is to provide redundancy within a region.

* [AWS Essentials: AWS Global Infrastructure (YouTube)](https://youtu.be/J_Kh1gZaMd4)

## What is a VPC?

VPC settings can be changed in the AWS console under Networking > VPC.

Basically, this is logical partition of AWS. Importantly, this partitioning includes its own logical network layer. So you can *kind of* think of a VPC as a virtual network in AWS.

Note that a "default" VPC is created along with a new AWS account, but *additional* VPCs can be created as needed.

The VPC "internet gateway" is roughly equivalent to a modem in a home or SMB, while VPC "route tables" function like an actual router. VPC NACLs roughly fill the role of a (very simple, stateless) firewall.

* [AWS Essentials: What is a VPC? (YouTube)](https://youtu.be/7XnpdZF_COA)

## Internet Gateways (IGWs)

Basically: The part of a VPC that provides the actual connection to the internet. It's automatically scaled by Amazon as needed, so there's little that needs to be configured here.

Really, all a IGW is providing is a *route* from the attached VPC to the internet. There can only be *one* IGW attached to a VPC at any given time. (Amazon also won't allow a IGW to be detached if there are any live resources like EC2 or RDS instances in the VPC.)

* [AWS Essentials: Internet Gateways (IGWs) (YouTube)](https://youtu.be/pAOrBxZ7584)

## Route Tables (RTs)

The Route Table is presented (almost) as a literal route table (think of the Linux `route` command). So, no surprises here.

There can be *multiple* RTs per VPC. Similar to IGWs, however, RTs can only be deleted if they have no dependencies (active routes).

* [AWS Essentials: Route Tables (RTs) (YouTube)](https://youtu.be/GrfOsWUVCfg)

## Network Access Control Lists (NACLs)

Think: Stateless firewall.

NACLs can be applied to one or more subnets in a VPC, and multiple NACLs are allowed in a VPC.

All NACLs end with a default DENY. *However*, the *default* NACL created with the default VPC has an "ALLOW ALL" rule ahead of this.

NACL rules are evaluated from lowest-to-highest rule number. Fortunately, the AWS console will automatically arrange rules in the order you'd expect (top-to-bottom).

Note that additional network security controls ("security groups") can be applied to AWS resources like EC2 instances, etc. But NACLs are the only *subnet* level protection that's available.

* [AWS Essentials: Network Access Control Lists (NACLs) (YouTube)](https://youtu.be/vJzHn24TNQE)

## Subnets

VPC subnets are limited to particular availability zones; by default, one subnet is created per availability zone for the region a VPC is created in.

Resources *must* be provisioned within a subnet. Since subnets cannot span availability zones, subnets are the level that AWS resources begin to correspond to physical computing structures in data centers.

Subnets can be "public" (internet routable) or "private" (*not* internet routable), which is determined by the associated route table. Note that every subnets *must* be associated with a route table.

* [AWS Essentials: Subnets (YouTube)](https://youtu.be/KNT463WSjjY)

## Availability Zones (VPC Specific)

The point of availability zones within a VPC is to allow redundancy to be engineered via mirrored subnets + resources.

* [AWS Essentials: Availability Zones (VPC Specific) (YouTube)](https://youtu.be/ET_CSqdGsYg)

## S3 Basics

Objects = Files

Buckets are limited to particular regions; data is automatically replicated across availability zones within that region.

* [AWS Essentials: S3 Basics (YouTube)](https://youtu.be/f9hXcxHnQuE)

## Buckets & Objects

Bucket names are *globally* unique.

* [AWS Essentials: Buckets & Objects (YouTube)](https://youtu.be/skJosIhDNF0)

## Storage Classes

Storage classes in S3 (standard, glacier, etc.) can be defined *per object*. Classes:

* Standard (the default; most available and durable)
* Reduced Redundancy Storage (less expensive, less durable)
* Infrequent Access (even less expensive, as durable as standard but low availability)
* Glacier (very cheap, very durable, but can take *several hours* to become availability.

"Durability" is defined as the probability that a file will *not* be lost or corrupted in a given year.

"Availability" is defined as the probability that a file *will* be (immediately) available when requested in a given year.

Storage class can be set during upload, by using the object lifecycle tool, or just by editing in the AWS console (note that Glacier cannot be chosen in this way). Changing the storage type of a folder will change the storage class of all contained objects but will *not* effect subsequent uploads.

Reduced Redundancy Storage is actually recommended for backup (!), though Glacier is intended for actual *archival* usage.

* [AWS Essentials: Storage Classes (YouTube)](https://youtu.be/DFfgYapmu9s)
