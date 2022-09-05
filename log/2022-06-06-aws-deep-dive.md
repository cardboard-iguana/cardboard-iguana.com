# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-06-06

# AWS Essentials

More notes today from Linux Academy's "AWS Essentials" YouTube playlist.

* [AWS Essentials (YouTube)](https://youtube.com/playlist?list=PLv2a_5pNAko0Mijc6mnv04xeOut443Wnk)

## Object Lifecycles

[AWS Essentials: Object Lifecycles (YouTube)](https://youtu.be/B-z9hNj3Fw4)

An "object lifecycle" is a set of rules in S3 that migrate objects between storage classes (or even delete them!) based on the age of an object.

## Permissions

[AWS Essentials: Permissions (YouTube)](https://youtu.be/X7vfDa1ygeo)

Permissions granted to (non-admin) users (at the individual/group level) or resources (at the individual/role level) only apply to *using* a service in AWS. Permissioning for object create in a given service is still handled at the object level.

For example, giving a group full access to S3 *doesn't* give the members of that group access to any of the buckets created in S3 by other users in the account - *that* access must be applied at the bucket level.

Note that making a bucket public is *not* enough to make its contents viewable outside of the AWS account - there still needs to be a permission grant to "everyone" that makes the object/folder/etc. downloadable. (My take-away from this is that making an S3 bucket public is essentially changing the definition of "everyone" from "everyone in the current AWS account" to "*everyone* everyone".)

## Object Versioning

[AWS Essentials: Object Versioning (YouTube)](https://youtu.be/I-OW9Kr2NGs)

Note that suspending versioning *doesn't* delete old versions - it simply stops the creation of new object versions in that bucket. (And yes - once you've *enabled* versioning for a bucket, you cannot disable it. Versioning can only be "suspended".)

Be aware that new object versions do *not* inherit the original version's storage class - that's set per object (even per versioned object).

## EC2 Basics

[AWS Essentials: EC2 Basics (YouTube)](https://youtu.be/dO1X7QG_4xw)

EC2 = Elastic Compute Cloud

In addition to "on-demand" and "reserved" instances, Amazon also has "spot" instances that are sold using an auction-like mechanism. The "spot" price fluctuates based on how much capacity is currently unused in EC2. When the spot price is at or below your "bid", you *automatically* get a spot instance configured and provisioned (at the cost is your bid). When the spot price *exceeds* your bid, your instance is *automatically* terminated and re-allocated to users with a higher bid. So spot instances *can* be cheap, but access is unreliable (and becomes more so during peak usage periods).

## Amazon Machine Images (AMIs)

[AWS Essentials: Amazon Machine Images (AMIs) (YouTube)](https://youtu.be/B7M31vywgs4)

An AMI is basically just a templated VM with some configuration knobs. (Mostly these knobs are about "pre-installing" applications and setting up desired configurations. In practice, this translates to kicking off scripts during the AMI's first run that *actually* install and configure things for you.)
