# OPSEC in Theory and Practice

author:: Nathan Acks  
date:: 2021-04-04

An overview of OPSEC history and practice produced by The Grugq.

The course is presented as self-paced, but seems to be just recordings of a set of live presentations. Occasionally there's mentions of movies or other supplemental activities that aren't included in the course site, so I think the fact that I watched/read the material well after its initial release means that I missed some "extracurricular" portions of the sequence.

* [OPSEC in Theory and Practice](https://learn.opsec.institute/courses/opsec-in-theory-and-practice)
* [The Grugq (Twitter)](https://twitter.com/thegrugq)

# How to Use This Course

This is just a quick introduction to the online course software. If you've ever taken an online course (or, I dunno, used the web?), this is all 100% obvious.

(Though it turns out that lessons *autoplay*, but start in a *muted* state!)

# OPSEC Theory

This seems to be a recording of an actual course.

## OPSEC Ideas

Oftentimes, military and intelligence agencies use "OPSEC" and "security" interchangeably. Basically, it's about protecting secrets.

You can think of OPSEC as having two basic branches: Counterintelligence, actual military information security, and state security (military information security, but for state secrets).

State/military/intelligence OPSEC has become increasingly formalized over time.

The intelligence community has always had to deal with counterintelligence, as this is the logical counterpart to their own intelligence mission.

Military intelligence has lagged a lot though. There were a lot of advancements in military counterintelligence during World War II, but much of that institutional knowledge was subsequently lost in the West, until it was reformalized as "OPSEC" by a Vietnam War era program called PURPLE DRAGON. The PURPLE DRAGON framework is the basis of the first part of this course.

Intelligence tradecraft has much higher security requirements than military intelligence. In the military, it's about not saying things, but intelligence operatives actually need believable cover stories.

Historic criminal classes have developed similar counterintelligence-style rules to the intelligence community, though these have been less formalized.

Despite all of the formalization over time, the actual "rules" of OPSEC have remained essentially constant over time.

Basically, it's "need to know" all the way down.

The most famous implementation here is probably the CIA's "three Cs":

* Cover
* Concealment
* Compartmentalization
* Counterintelligence (The Grugq's addition to the CIA's list)

There's also the simpler "denial and deception" conception.

* [Operations security (Wikipedia)](https://en.wikipedia.org/wiki/Operations_security)

## The Three Cs

COVER: Make sure that what people see on the surface doesn't stand out. You don't want to be interesting, or worth taking notice of.

CONCEALMENT: What you're *actually* doing. Cover is passive (having a "cover story"), but concealment is active (encryption, hidden stashes).

COMPARTMENTALIZATION: "Need to know." But a bigger key here is making sure that a compromise in one compartment can't leak into another compartment. This is more about breach mitigation.

COUNTER(INTELLIGENCE): The Grugq likes to add an additional, active component. Think of this as "active cover" - allowing misdirection to limit the effectiveness of the opposition.

This is like Corey Doctorow's "chaff" (from "Little Brother") or canarytokens. In cybersecurity, an attacker might leave behind a more easily discovered rootkit for the defenders to find, while attempting to conceal the intrusion tools they actually care most about.

* [Canarytokens](https://canary.tools/help/canarytokens)

## Operational Security

* Identification of critical information.
* Analysis of threats.
* Analysis of vulnerabilities.
* Assessment of risk.
* Application of appropriate mitigations.

A big part of risk assessment is appropriately ranking those risks, and addressing them in the appropriate order.

## Counterintelligence

Counterintelligence is very broad, which has the effect of causing everyone to bikeshed their own approach.

The most basic form of counterintelligence is basically indistinguishable from active compartmentalization. A more dynamic approach would be tailored to specific adversaries (for example, "don't have conversations inside"). The most advanced approaches involve attacking your adversary (classic spy shit).

A classic advanced counterintelligence example dates from the time of the Provisional IRA. The PIRA managed to penetrate a police station containing information about informants using a faked security pass and then emptied out their informant archives.

Counterintelligence is sometimes divided between defensive (protect secrets) and offensive (detecting leaks/losses, learning about adversarial capabilities).

## Security Rules

The combines the Moscow Rules, the ANC's rulebook, and a few other sources.

ALWAYS HAVE A GOOD COVER: This goes beyond just having a believable cover story - you need to actually *live* your cover.

That said, vary your pattern (but stay in your cover). By adding randomness, you create operational space for your actual mission.

MEMBERSHIP IS A SECRET: People forget this all the time, because they're excited about being part of something clandestine.

But keeping membership secret is key to basic compartmentalization and need-to-know.

DON't DRAW ATTENTION TO YOURSELF: This can be operation-specific... But in general, you want to be as "normie" as possible. Basically, you need to be "actively" boring.

LOOSE LIPS SINK SHIPS: Keep your mouth shut.

Retroactive paranoia is useless.

BE VIGILANT AGAINST INFORMERS: This is important for underground groups, but is less important for above-ground operations. (In particular, opposition political groups gain protection by having large memberships.)

This reminds me a lot of "zero trust" network models. Assume that anyone/everyone may be penetrated.

BE DISCIPLINED, EFFICIENT, PUNCTUAL: People hanging around somewhere (by being either early or late) attracts attention.

Professional thieves are punctual. There's an old thieves' rule about never waiting more than 10 minutes at a meeting site, lest the late-comer has been arrested. This also allows meeting attendance to act as metadata - by not showing up, someone who was potentially compromised could signal to their compatriots that the plan was in jeopardy.

KEEP YOUR OPTIONS OPEN:

* Avoid regular patterns of behavior.
* Build opportunities into your plan/behavior, but only use those opportunities sparingly.
* Vary your pattern, to create operational space. (See the the first rule.)
* Pick the time and place for your actions - it is often better to abort than to let your adversary determine your actions.

Basically, you want a lot of options, and that means both creating options and being judicious about burning those options.

NEED TO KNOW APPLIES BOTH WAYS: Basically, don't stick your nose into other compartments, lest you become dangerous to them. Cultivate a degree of ignorance about other's operations.

Reminds me of my own maxim that "you can't lose control over information you don't have."

BE CAREFUL WHAT YOU SAY: Phones, public space, private spaces... Everything can be bugged.

Use simple ("open") codes, rather than cryptonyms, whenever possible. You don't want to be talking about "purple lambs going to Boston to learn about malaria research" - just say "some friends will be going to the usual place to be trained in my specialty". Think of this as "speaking around" the thing you want to communicate; you're leaving the meaning implicit upon shared knowledge. (This is almost the human equivalent of a one-time pad.)

One implication here is that conversation take planning. The person on the other hand needs to be able to distinguish the small talk from the actual message, which means that the small talk generally needs to be known beforehand. Information transmission is the *last* stage of the operation.

The idea here is to avoid potential adversarial keywords. That means both the obvious ones ("Langley"), but also obvious cryptonyms that stand out and thus *indicate* that you're trying to talk about something special.

CLEAN UP AFTER YOURSELF: Don't leave things out (digitally or physically). Tidy spies are safe spies.

Cleanliness is a simple form of concealment. Habits of tidiness make mistakes less likely.

HIDE THINGS, BUT NOT WHERE YOU LIVE: Clandestine materials need to stay hidden, but also need to stay compartmentalized.

This is particularly true with computers. Clear text < cipher text. Cipher text on your computer < Cipher text somewhere else. Cipher text *anywhere* << something that you've committed to memory!

Good spies have good memories. Professional thieves periodically dropped off parcels at drug stores, restaurants, etc. so that they could only be linked to what was on them.

YOUR FAKE DOCUMENTATION SHOULD BE GOOD: ...If you have fake documentation at all...

KNOW YOUR CITY: This is part-and-parcel of memorizing things like addresses. It gives you operational latitude, and allows you to move quickly.

DENY YOUR WORK: Realistically, no one will keep a secret until their death. So many (thieves?) use a 24 hour rule: Don't reveal details for 24 hours, to give your compatriots time to clean up. This only works if timeliness is used as metadata to indicate a potential compromise.

The idea here is that by the time information is disclosed, it should be outdated and no longer useful.

Again, this reminds me a bit of the corollary to the Quinn Norton maxim that I'm quite fond of. Norton quipped that "all data is eventually either deleted or public." I've extended this at work to say that the job of IT security isn't to prevent the destruction/disclosure of information, but to allow the organization to *choose* which option they want, and *when* they want it. "Keep this information available but secret forever" is not a viable ask.

TREAT PERSONNEL COMPROMISE AS CATASTROPHIC: Assume that the information that anyone who has been arrested or compromised has is now known to your adversary, and act appropriately.

## Disguise on the Run

* [How Spies Use Disguises](https://www.wired.com/video/watch/how-spies-use-disguises)
* [Former CIA Operative Explains How Spies Use Disguises](https://youtu.be/JASUsVY5YJ8)

This is a video from Wired.

> We talk about disguise as an onion, whether you're building it or peeling it off.
> 
> - Jonna Mendez, Former Chief of Disguise, CIA #Quote 

The idea is to layer personas, such that the two endpoints are distinct, but that any intermediate version is still plausible. This allows for personas to be swapped easily while in the field.

Disguise is primarily about compartmentalization. It prevents someone from one compartment from stumbling across you in another compartment. In particular, this helps preserve cover (though it can also be used internally, which reminds me a bit of "A Scanner Darkly").

Changing hair style (wigs, facial hair) and obscuring accessories (glasses, hats) can be enough to prevent casual breaches, but prosthetics, makeup, and voice training can be necessary to fool someone you're interacting with for an extended period of time. There's a big gulf between casual disguises and more advanced, extended usage!

The CIA has some incredibly realistic masks.

No matter how it's done, the goal is that the person who's writing up a report on you (whether that's your contact or someone tailing you) get a completely wrong description. So, often disguises will try to make you look opposite-ish from your actual appearance: Young to old, dark hair to light hair, etc. How deep this goes depends on who you're trying to fool, and for how long.

The CIA has found that older men are considered less threatening and memorable than younger men, so men's disguises often involve aging them.

The CIA has found it "virtually impossible" to turn a man into a convincing woman - but disguising women as men is part of their standard toolkit.

Remember, you can convincingly make someone taller, or heavier, or older, but it's *very* hard to go in the opposite direction!

A key design goal of disguise is to be nondescript and unmemorable. You to be the person who "gets on the elevator and gets off the elevator, and nobody remembers that you were there."

> Americans are oblivious to what reveals them to a foreign crowd... Or a foreign intelligence service.
> 
> - Jonna Mendez, Former Chief of Disguise, CIA #Quote 

Europeans generally only use the fork in their left (non-dominant?) hand, while Americans will switch hands. Europeans also tend to stand with their weight evenly distributed between their feet, while Americans will put more of their weight on one foot, and then the other. (Basically, it sounds like Americans are a fidgety bunch!)

To walk differently generally requires some sort of assistance, but it doesn't have to be much. A pebble in your shoe, or a restrictive bandage around a knee.

A simple "staying safe" disguise is to just pick up some local clothes or cigarettes, rather than wearing your everyday outfit.

If you're looking to change your "visual personality", ask your friends what gives you away. They will know, while you will generally not.

Non-prosthetic disguises - ones that use only clothing and accessories - can be "quick changed", using the crowd for cover. The idea is to swap disguise in public, using the crowd as a cover, in something less than 45 seconds. Ideally, whoever is following you thinks that they "lost" you, not that you "escaped". (It looks like they must make special shirt "facades" for quick-change operations.)

THE GRUGQ NOTES: Basically, make changes hard to see from the front/rear. The example here was to use a backpack to hide the removal of a business suit. This needs to be done in multiple stages, and each stage needs to look natural and legitimate.

## Finishing Up

Again, security *principles* are generic - it's the implementation of these principles that become a specific ruleset.

# Purple Dragon (Excerpts)

Simpler Army OPSEC directives:

> All plans, materials, equipment, etc. will be secured using the following 5-step process:
> 
> IDENTIFICATION OF CRITICAL INFORMATION. Determine what information needs protection.
> 
> ANALYSIS OF THREATS. Identify the adversaries and how they can collect information.
> 
> ANALYSIS OF VULNERABILITIES. Analyze what critical information friendly forces are exposing.
> 
> ASSESSMENT OF RISK. Assess what protective measures should be implemented.
> 
> APPLICATION of appropriate OPSEC measures that protect critical information.
> 
> There will be a single wringable neck (the OPSEC officer) responsible for maintaining / distributing the relevant OPSEC documentation.

The OPSEC officer continually re-evaluates the relevant directives; it's clear that these are intended to be living documents.

A critical part of the "identification" step is *prioritization* of assets/information.

> OPSEC measures protect the *unclassified indicators that can reveal classified information*.

(I'm pretty sure that the idea here is that classified information is protected as well, but the controls around it are more stringent so *unclassified* information is being specifically called out.)

"[U]nclassified indicators that can reveal classified information" sounds like side-channel attacks. This sense is re-iterated in Appendix B.2.2.g.:

> Indicators that would reveal critical information are also critical information.

B.2.2.g.ii. then re-iterates that the game we're playing is about *time* more than *access*.

> Identify the length of time critical information needs protection. Not all information needs protection for theduration of an operation.

B.3.a. puts "open source intelligence" in context.

> Adversary collection activities target actions and open source information to obtain and exploit indicators that will negatively impact the mission. OPSEC indicators are friendly detectable actions and open-source information that can be interpreted or pieced together by an adversary to derive critical information...

Later (B.3.b.2.):

> A vulnerability exists when the adversary can collect an indicator of critical information, correctly analyze the information, make a decision, and take timely action to adversely influence, degrade, or prevent friendly operations.

The basic gist of threat analysis in the Army context boils down to "what do you reveal in the course of accomplishing your mission that can reveal information that could be used to damage other/future actions that must be taken during the course of the mission".

Section B.7.2.c. Provides another note about what would be called "side channels" in an IT security context:

> Ensure that a measure to protect a specific piece of critical information does not unwittingly provide an indicator of another.

The rest of this document is a discussion about documentation and continuous evaluation which feels like pretty standard fare these days.

# The Ten Crack Commandments

[YouTube video.](https://youtu.be/ZYb_8MM1tGQ)

Additional reading:

* Ten Crack Commandments
* Read 'The Source' article that the Notorious B.I.G. copied for 'Ten Crack Commandments'

To summarize (maybe a little more in the IT sense):

* Operate using need to know (1, 3, 7).
* Keep your options open (2, 4).
* Use physical compartmentalization (5, 8).
* Don't take unnecessary risks (6, 9, 10).

"Need to know" is basically social compartmentalization, so really this list boils down to maintaining compartmentalization combined with balancing risk avoidance with maximizing one's latitude for action.

# My CIA (Excerpts)

DEFINITION: Operational security "is the discipline that protects the secrecy of clandestine operations."

The listed "principles of operational security" are pithy, compact, and worth just excerpting:

> THREE THINGS MUST BE PROTECTED: the existence of an operation, its significance, and the identity of its participants.
> 
> THESE MUST BE PROTECTED AGAINST THREE OPPOSITION FORCES: the public, the law enforcers, and counterintelligence services.
> 
> THE PROTECTION IS CARRIED OUT THROUGH THREE PRINCIPLES: cover, concealment, and compartmentation.

The next page-and-a-half basically elaborates on how the principles of cover, concealment, and compartmentalization interact and sometimes conflict (mostly focusing on the case of opposition forces). The last paragraph is pretty good though:

> Obviously much thought goes into planning and executing clandestine contacts. Later in my career I had little use for young case officers who saw themselves as cool-ass, think-on-their-feet, clever, knee-jerk thinkers. Meticulous thought and planning are a must.

Reminds me a bit of:

> Old age and treachery will always beat youth and exuberance.
> 
> - David Mamet #Quote 

# The Moscow Rules

The emphasis here is on maintaining cover and compartmentalization, maximizing freedom of action, and minimizing risk.

*  Assume nothing.
*  Never go against your gut.
*  Everyone is potentially under opposition control.
*  Do not look back; you are never completely alone.
*  Go with the flow, blend in.
*  Vary your pattern and stay within your cover.
*  Lull them into a sense of complacency.
*  Do not harass the opposition.
*  Pick the time and place for action.
*  Keep your options open

To the extent that these align with "blue team" cybersecurity, they roughly correspond to a combination of a "zero trust" architectural approach and the more recent "assume breach" paradigm. Assume any computer may be compromised, and act/log accordingly. If you're threat hunting in this sort of environment, the directives to "[v]ary your pattern and stay within your cover" and "[l]ull them into a sense of complacency" would suggest that internal reconnaissance should be done as part of every day operations. Detected anomalies should be quietly investigated rather than immediately acted upon, so as not to tip off a potential attacker and potentially cause the incident to accelerate. 

From an offensive ("red team") perspective, this reminds me of the old Kali Linux motto: "The quieter you become, the more you are able to hear." The idea here is similar: Try to blend in with regular operations, don't go for anything splashy, be wary of potential traps like canaries.

A lot of this feels like admonishes to take your time, even under pressure. "Meticulous thought and planning are a must."

* [Kali Linux](https://www.kali.org)

# Never Get Busted Again

The Grugq outlines what they see as the "core OPSEC principles" in the preface to this section:

* Cover
* Concealment
* Compartmentalization
* Denial
* Deception
* Know your enemy
* Unlinking / uncoupling
* Preventing contamination

## Intro

This is a film put together by an ex-police office that helps instruct marijuana users how *not* to get busted.

This is somewhat US-specific.

While the context here is US stoners, it follows a basic OPSEC analysis.

* What are your adversary's capabilities? How can they be defeated?
* What is your adversary looking for?
* What are your adversary's limits?

If you know the answer to these questions then you can "side-step" your adversary rather than risking a direct confrontation.

Additionally, knowing the why/how a capability, trigger, or limit exists can be useful when formulating a dodge or counter.

## K-9

Not every dog can be a narcotics K-9 unit. When picking a dog, police look for an animal with a high "ball drive" - someone who's got a single-minded insistence to do a particular thing (like chasing a ball), and is generally somewhat demanding and obnoxious about it. Typically, when a suitable puppy is identified its toys will be scented with the narcotics they are will be tasked with finding, so that they come to associate that smell with their own fixation.

Dogs can differentiate many different smells, so masking generally doesn't work. The important lesson here from a general OPSEC perspective is about understanding your opponent's capabilities: The dog can separate out odors (while humans generally can't). This impacts how we side-step the capability - in this case, trying to mask an odor is ineffective.

Another capability: Dogs have an aversion to cayenne pepper, gasoline, etc. and will often recoil momentarily from a strong scent of this. But narcotics K-9 officers look for this behavior too (people generally don't like these smells either), and will focus on areas that the dog is particularly *adverse* to in addition to those areas that they're attracted to.

Again, the key here is to think through an adversary's capabilities in detail (including places where a particular capability may be weak - like a dog's aversion to cayenne - and what compensating controls the adversary has developed for this). The better you understand these capabilities, the better you can implement a counter (for example, smells diffuse at different rates through different materials, so by choosing your containers carefully *and avoiding contamination* you can buy yourself more time before a K-9 unit will be able to detect a narcotic).

Another weakness that can be exploited - a dog can't speak. So if marijuana is hidden in food, there's no way for the dog to indicate that they're alerting on the drug rather than interested in a snack. So, this is a bit of deception that relies on the fact that the dog-to-human communication channel is so lossy.

Similarly, the single-minded drive of a narcotics K-9 - which is really a form of high prey drive - can be used against it. Carrying a cat or other animal in a car, or spraying fox urine on the car's wheels, for example, will often distract a narcotics K-9. (Again, the general idea here is to understand your adversary's capability in depth. A dog is a predator and the "ball drive" that's harnessed to train them to detect narcotics is a type of prey drive. By understanding these details, we can use the underlying system the capability rests on - the prey drive - against it. I suppose this can be thought of as "getting inside of the OODA loop" of the dog.)

Handlers can also false-trigger a K-9 if they *want* to conduct a deeper search, often by saying something associated with the dog's training (for example, "get it, get it, get it"). From an OPSEC perspective, the thing here is to remember that the K-9 is a capability that triggers a deeper search, but because police are often lying or manipulative, they can abuse that capability if they *want* to get you. This is not to say that defending against a K-9 is useless (particularly, if the narcotics odor hasn't had time to diffuse an interior search may still be unfruitful), but is to point out the advantage of not appearing suspicious (and even consenting to a search, which may not trigger the K-9 to be used at all).

Remember that capabilities don't lie (though they can be mistaken) - but humans *do*. So another important thing to understand is when what rules your adversary must follow... And which of those rules they can break or otherwise subvert.

## Conceal Your Stash

> If it takes 15 minutes to hide your stash it will take an officer an hour to find it.
> 
> - The Grugq, summarizing one of the lessons of *Never Get Busted Again*.

> Hide stash high up in the vehicle because it is harder for a dog to sniff high.
> 
> - The Grugq, summarizing one of the lessons of *Never Get Busted Again*.

This section was skipped in the actual video, however.

## Search & Seizure

The big point of this section is to *not look like a fucking drug user*. Don't carry paraphernalia, etc. This aligns pretty well with my "minimum footprint" approach to cyber security.

Another big overarching point here is to just minimize your "flags". This is a bit of a call-back to some to The Grugq's introduction:

> COVER: Make sure that what people see on the surface doesn't stand out. You don't want to be interesting, or worth taking notice of.

Riffing of the topic of "cover" a bit more... You need to make sure that your *environment* is consistent with your cover. For example, shaving cream containers are sometimes used to smuggle marijuana; most men will only carry one, so having *two* can raise suspicion in a narcotics officer and might trigger a search (though generally only in conjunction with other flags).

A more general point here is the difference between something that *raises suspicion* in an adversary vs. something that actually *triggers* an action. You want to minimize the first where you can, and absolutely avoid the second.

Interestingly (but perhaps not surprisingly), refusing a search arouses suspicion, and generally leads to a more thorough search. It can also attract additional officers. So one tactic is to *consent* to a search of your vehicle/house/whatever, which will then generally trigger a more cursory examination. Of course, to do this safely you need to *not look like a fucking drug user* (and have some confidence in your concealment methods).

In general, you're trying to use both knowledge of the adversary's rules and human psychology to keep yourself on the path of least suspicion (and if possible, away from interactions with the adversary at all).

## Narcotics Profiling

Some interesting points here:

* Patrol cars that are looking for potential narcotics targets will generally park perpendicular  to an intersection; both the position and the need for cars to slow down in this environment allows the officer to more easily watch a particular car for longer. Obviously you can't do this on an interstate (a tactic there is to "slow roll", slowing down to 40 or 50 mph and letting cars pass in order to get a good look at the occupants).
* The use of a new or rental car (if it can be identified as such) can cause suspicion. The reason for this is people trying to limit their financial exposure should the car they're smuggling in be seized.
* Interestingly, the presence of DARE or other anti-drug bumper stickers can arouse suspicion. The same goes for stickers supporting law enforcement. I guess some people are trying too hard.

Officers generally assume that everyone is lying and functionally operate with a "guilty until proven innocent" mentality.

Also, police officers make shit up all the time. The law is not a security barrier!

Interesting story in one of The Grugq's asides: The cartels have now switched to using older folks as long-distance drug couriers, as the typical profile of a drug user or courier was that of a younger male.

One reason police go bad is that they tend to become adrenaline junkies. Eventually they need progressively more dangerous encounters in order to get the same high, which leads them to take risks, misinterpret situations, and even set up situations that are likely to escalate.

(A lot of discussion in this section on how dependent police departments have become on seizures of money and high-value cars to fill in their budgets. From the perspective of OPSEC, this is part of understanding the adversary's *motivations*.)

More emphasis here on looking for drug use, or signs of drug use. Comes back around to *not looking like a fucking drug user* (and really, per Biggie Smalls, just not using when on the job). Also, returning to "cover" again... Just try to blend in. Don't have bumper stickers. Dress normie. Travel during high traffic times and pace the other cars (but don't be *too* careful). Etc.

## Traffic Stops (Case Studies)

We skipped this part of the DVD.

## Busted (What to do When It All Goes Wrong)

This is just a section of good OPSEC.

* Shut the fuck up.
* Assume everything is being recorded (and in jail, everyone is a snitch).
* Don't offer resistance, but don't cooperate either (do what you're told, but *shut the fuck up*.)

That said, it was also skipped.

# Tradecraft I

This tradecraft section focuses on the OPSEC aspects of the creation, setup, and operations of a clandestine cell network (not as in *cellular*, but as in cell-structured).

The big difference between the tradecraft of espionage-focused (intelligence) organizations and those focused on physical action (for this discussion: insurgents) is that the former focuses on the recruitment and management of agents and assets, while the latter focuses on compartmentalization and cover for the organization *as a whole*. Intelligence operations also tend to involve a lot more COMSEC, while insurgent operations rely more heavily on compartmentalization and indirect communication. (ASIDE: Short-range radio was big in intelligence communities in the 80s for communication with assets/agents, but commodity Bluetooth is actually used a lot today.)

Compartmentalization makes it harder to engage in institutional learning, because the boundaries that prevent information leakage also tend to prevent information dissemination.

Communication between cells is generally indirect (hang a sign in the window that the right people will know how to interpret, etc.). When face-to-face meetings are necessary, insurgent OPSEC tends to focus on cover and counter-surveillance. One strategy both intelligence and insurgent organizations use is to arrange multiple meeting times, which allows for some flexibility in the face of adversarial activities. This isn't infinite though - after some number of missed meetings one has to assume that something bad has happened to either the agent being contacted or, for cell-based organizations, the entire cell. To help compensate for this hard cut-off there's generally some kind of pre-arranged emergency signal that a cell or agent can use to indicate a problem to other cells.

## Impersonal Communications

This is what is known as a "cut-out" - a way of communicating between cells or agents that doesn't require direct face-to-face interaction. (Since the point of this is to prevent individuals from becoming linked with each other, this presumably extends to direct online interactions such as Twitter, direct messages in chat rooms, or email.) Examples:

* During The Troubles women and children in Republican areas would beat trash can lids and otherwise make noise when they spotted a British Army patrol, thus alerting any nearby IRA members of the existence of the patrol and its rough position.
* Dead drops.
* Signs and personals with coded messages.

This has very strong security, but has the drawback that you don't know if the message was received or understood. Security can be further increased by avoiding specific, potentially personal information in these sorts of communications, but this obviously also further elevates the risk that the message will not be understood.

Active *impersonal* communications (phone, radio, internet) reduces the risk that messages sent through a cut-out are misunderstood (since there's an opportunity for two-way, closer to real-time communications). But this obviously elevates the risk that members of different cells can be linked or communications intercepted.

Passive impersonal communications thus tend to be preferred in higher risk environments (where simply not being caught often dominates the success of any particular mission), while active impersonal communications is used in environments with a lower risk to individual cells and agents (since it increases operational efficiency).

* [The Troubles (Wikipedia)](https://en.wikipedia.org/wiki/The_Troubles)

## Couriers

Couriers are often used as cut-outs. The key with a courier is that they can move some distance, don't arouse suspicion, and generally don't know people in either cell (so you generally don't want the same person meeting a courier all the time, nor do you want to re-use couriers frequently). If at all possible, couriers shouldn't even meet *people*, instead being used in conjunction with things like dead drops.

That said, couriers that are detected can be traced. This is the way that the US discovered the locations for most of the leadership of Al Qaeda.

## Dead Drops

Generally dead drops are not just "a hidden place you put things", but are also combined with some signal understood by the sender and receiver to indicate both the presence of a message and that the message has been received. The reason for the signal is not just to allow for (high-latency) two-way communication, but so that if the sender doesn't see a receipt signal within a certain timeframe they can clean out the dead drop (on the assumption that something has happened to the receiver). Turn-around is surprisingly quick; The Grugq quotes dead drop pick-up times measured in hours, whereas I would have though that typical turn-around would be more like *days*.

Dead drops are typically in public or semi-public spaces - parks, public restrooms, apartment building lobbies. Dead drops can sometimes just be in pedestrian items like milk cartons and discarded gloves. Sometimes this gets pretty disgusting; for example, sometimes an agent will actually *vomit* on a dead drop location to make it less likely that anyone who's not the intended recipient will fuck with it.

Things go wrong a surprising number of times with dead drops. People using a slightly different item to signal than was previously agreed on. Squirrels. Etc.

## Live Drops

Basically, this is like a dead drop, except that you're using a person to hold the item/message. Typically, small shops with a good amount of traffic (but not too much - only one or two people at a time) are used.

Live drops are also frequently used by professional thieves.

The obvious problem here is that the person may eventually link the sender(s) and the recipient(s). The upside is that using a person instead of a box or hollow log somewhere can provide more security (they may detect if their cover's been blown, they're resistant to squirrels, etc.).

## Clandestine Codes

This is the ads/signs/forum posts/etc. thing.

Also includes words that can be innocuously inserted into phone conversations to warn agents or trigger actions. But code words are hard to do right - too generic and mis-signalling becomes an issue, too specific and they stand out. In practice, you don't want to be giving things code words, but using them to convey single bits of information (go/no-go, etc.). Also, rather than using specific code-words, the use of specific subjects can provide better cover ("if my first sentence is about the weather, then X").

Code words in phone conversations work best when the entire conversation is mapped out before hand. Which obviously takes *a lot* of planning, and people who are good at holding a lot of details in their head at once.

Unfortunately spies are just as likely to screw things up as other people. Nobody's going to remember a complex or subtle set of code words/phrases.

## Loose Command & Control

It's fairly common to run a resistance group with a loose coupling between central command and individual cells. This often necessitates the use of more passive communications.

An extreme version of this is "lone wolf" or "leaderless" terrorism, where "leadership" and actual actors are completely decoupled to the point of not knowing each other or even formally existing in an "organization". This is generally an organizational method of last resort, as it's impossible to push for coordinated action (or even make guarantees during negotiations) with this model.

## Personal Communications

Obviously, meetings in a cell network are pretty high risk. These are generally only used when leadership needs to make a major decision or when it's imperative that a message be understood.

The high risk profile of meetings means that they're basically an operation in and of themselves, and need all of the associated planning and OPSEC measures (including multiple locations and times as backup).

When signaling go/no-go via counter-surveillance, it's best to "fail closed" - there should be an "all clear" signal, with the default assumption being that the meeting will be aborted. (Again, a strong parallel here with computer security.)

## Counter Surveillance

In general, the best thing to do when surveillance is detected is to abort and *not break cover* rather than trying to explicitly "loose" the adversary. In particular, not only does trying to escape surveillance antagonize the people trying to surveil you, but it also reveals that you *know* about the surveillance or have special training, which can then make you *more* of a target moving forward. A large part of the thrust of "The Moscow Rules" is to avoid doing exactly these things.

A basic form of counter-surveillance is to go to a shopping mall or other location with a lot of stores before a meeting or operation, and then watch for people who keep showing up in (or outside of) the stores that you go to. If you keep seeing the same people, assume surveillance and abort... But don't break cover!

Another reason not to loose a tail is that for a well-resourced team it may just be replaced with another tail... Which then you have to identify all over again.

## Surveillance Detection Route

It's actually hard to follow people on foot through busy shopping areas because of the crowds and multiple entrances.

When driving, one trick is to drive in a loop that gets you reversed against the previous traffic flow a couple of times and look for reoccurring cars; another trick is to pull into a gas station, look for who pulls off (probably in an adjacent area) in a position to monitor you, and then leave in a way that you can see if that car begins following you again.

In general, surveillance detection routes need to be long and complex... But not *look* like you're trying to loose or identify your tail. The goal is to identify the adversary using TEDD:

* TIME: Do you see the same people/car repeatedly?
* ENVIRONMENT: Do you see the same people/car in multiple locations?
* DISTANCE: Do you see the same people/car over a long *distance* travelled?
* DEMEANOR: Do you see people/cars that are behaving strangely?

Looking at detection from this perspective, it's obvious why The Grugq's shopping mall example (or really any on-foot situation) is an easier environment to identify a tail in than while driving.

The people tailing you are generally just as inexperienced/incompetent as everyone else. For example, a common mistake is for the tail to stop when you stop - they're trying to maintain a constant distance from you, but someone who wasn't a tail would just keep walking.

When doing static surveillance, someone sitting at a single location for an entire day will often raise suspicion. One way around this is to break up surveillance into different time chunks (one hour one day, another hour at a different time another day). When following someone with a relatively fixed route, following them for only a short period of time, but then restarting on subsequent days from further along the same route, can make it harder for them to identify that you're tracing their path.

Of course, these days people just use phone location data.

## Emergency Reconnection

Emergency signals are important in cell-based organizations, as it's easy to sever the already tenuous connection between cells. So there needs to be a pre-arranged way of signaling "we need to reconnect".

This kind of signaling actually works a lot like dead/live drops.

(It's good to have different safe houses for different cells, as that prevents members of different cells from inadvertently learning to recognize each other.)

Superior/Subordinate meetings in a cell structure are particularly risky, even more so when something has gone wrong. Has the subordinate been flipped? Been replaced? The fact that people don't know each other in a cell structure becomes a serious problem here.

When doing any meeting, and in particular an emergency meeting, it's best to use a public location where the participants - and any necessary security - can blend in with the crowd. Restaurants, libraries, parks, etc.

Just as in cyber security, clandestine meeting security needs to rely on defense in depth - multiple levels of look-outs who can warn you if something's going wrong to minimize the risk if one level fails. Again, it's better to abort and leave when things look like they may be going south than to try to deal with adversary directly.

## Clandestine Recruitment

"Friends and family" recruitment is generally a bad idea - it's hard to discipline people, it's hard to maintain compartmentalization, and it's generally a smaller group to draw from than you'll eventually need.

Recruitment thus generally happens via casual social connections. But the problem remains that people operate in small-world networks: Once an insurgent operation has been running for some time it actually gets easier to figure out who might be involved, as they must all have been socially connected in some way at some point. This then lends itself to "small scale" dragnet surveillance, where the adversary just monitors everyone in a particular social milieu (because there's such a high likelihood that people in the milieu will be involved In something).

So a general take-away from this is that human small-world social networks strongly work against the effective implementation of cell-based compartmentalization.

Vetting is just as much a problem for terrorist organizations as it is for any other organizations. US motorcycle gangs not only use multiple levels of recruitment to gradually level people up, but actually hire private investigators to look into the background of potential members before they're fully initiated. One trick hacker crews use is to test for passion/belief rather than technical knowledge (since passion is a lot harder to "fake").

## Conclusion

The big take-away here is (again) that the rules of OPSEC are the same for any organization/activity - it's the *implementation* that changes depending on context.

# 73 Rules of Spycraft

> Security consists not only in avoiding big risks. It consists in carrying out daily tasks with painstaking remembrance of the tiny things that security demands. The little things are in many ways more important than the big ones. It is they which oftenest give the game away. it is consistent care in them, which form the habit and characteristic of security mindedness.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

The two rules after this one elaborate on it. Basically, attention to detail for the small stuff tends to lead to the same level of attention being applied to the big stuff. People who can do the small stuff thus have a higher chance of success when it comes to the big stuff. People who don't... Become liabilities.

> Security, of course, does not mean stagnation or being afraid to go after things. It means going after things, but reducing all the risks to a minimum by hard work.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

I should include that quote in some of my trainings.

> Never leave things lying about unattended or lay them down where you are liable to forget them. Learn to write lightly; the "blank" page underneath has often been read. Be wary of your piece of blotting paper. If you have to destroy a document, do so thoroughly. Carry as little written matter as possible, and for the shortest possible time. Never carry names or addresses en clair. If you cannot carry them for the time being in your head, put them in a species of personal code, which only you understand. Small papers and envelopes or cards and photographs, ought to be clipped on to the latter, otherwise they are liable to get lost. But when you have conducted an interview or made arrangements for a meeting, write it all down and put it safely away for reference. Your memory can play tricks.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

Alright, now I feel seriously vindicated... This is basically *exactly* the strategy I've been advocating at work. Minimize data. Minimize communications. Destroy both when you're done with them... But memorialize important details and decisions for later use. The sausage is useful; what went into making the sausage can be downright dangerous.

> The greatest material curse to the profession, despite all its advantages, is undoubtedly the telephone. It is a constant source of temptation to slackness. And even if you do not use it carelessly yourself, the other fellow, very often will, so in any case, warn him. Always act on the principle that every conversation is listened to, that a call may always give the enemy a line. Naturally, always unplug during confidential conversations. Even better is it to have no phone in your room, or else have it in a box or cupboard.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

This feels triply true today, with the rise of smartphones. Once again, I feel like physical couriers are going to make a big comeback at some point Johnny Mnemonic style.

Interestingly, Allen Dulles explicitly warns against using restaurants and the like for meetings, unlike The Grugq's advice. I wonder if this is a reflection of the times or a genuine difference in opinion. Both like parks though.

> Remember that you have no right to expect of others what you are not prepared to do yourself. But on the other hand, do not rashly expose yourself in any unnecessary displays of personal courage that may endanger the whole shooting match. It often takes more moral courage to ask another fellow to do a dangerous task than to do it yourself. But if this is the proper course to follow, then you must follow it.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

Dog fooding for spies.

> But if your agent knows the ground on which he is working better than you, always be ready to listen to his advice and to consult him. The man on the spot is the man who can judge.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

>  In the same way, if you get directives from HQ, which to you seem ill-advised, do not be afraid to oppose these directives. You are there for pointing things out. This is particularly so if there is grave danger to security without a real corresponding advantage for which the risk may be taken. For that, fight anybody with everything you've got.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

I just like these two rules.

>  If you have several groups, keep them separate unless the moment comes for concerted action. Keep your lines separate; and within the bounds of reason and security, try to multiply them. Each separation and each multiplication minimizes the danger of total loss. Multiplication of lines also gives the possibility of resting each line, which is often a very desirable thing.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

Old-school compartmentalization.

> Not knowing too much does not mean not knowing anything. Unless there is a special reason for it, it is not good either to appear a nitwit or a person lacking in discretion. This does not invite the placing of confidence in you.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

This reminds me of Dual Core's track about social engineering / physical penetration testing:

> Know a little 'bout a lot
> And a lot about a little
> So most conversations put me somewhere in the middle.
> 
> - Dual Core, *Trust Me*

On a more personal note:

> Within the limits of your principles, be all things to all men. But don't betray your principles. The strongest force in your show is you. Your sense of right, your sense of respect for yourself and others. And it is your job to bend circumstances to your will, not to let circumstances bend or twist you.
> 
> - Allen Dulles, *Some Elements of Intelligence Work*

I've personally found this a much harder balancing act than one would think.

* [Johnny Mnemonic (film) (Wikipedia)](https://en.m.wikipedia.org/wiki/Johnny_Mnemonic_%28film%29)

# Selected SOE Training Lectures

## Individual and Collective Security

> INCULCATION
> 
> a) Security cannot be taught by rule of thumb. It is a frame of mind attainable through self-discipline and self-training that will make the taking of precautions a "habit". (Cf. crossing a road.)
> 
> b) What is a habit? A single action committed so often as to become automatic. What precautionary actions must we practise so often that they become a habit?
> 
> - SOE Syllabus, "Individual and Collective Security"

Again, this makes me feel like I'm on the right track, as I say something very similar in the security overview training I wrote.

> Compromising telephone-conversations through misuse of conventions. (E.g. NOT "Three lambs with sweets and toys who need instruction in malaria" BUT "Three chaps with some goods for Harry who need instruction in my subject".)
> 
> - SOE Syllabus, "Individual and Collective Security"

This is very similar to a point The Grugq has made repeatedly about preferring vagueness that is understood by both sides over code words.

> Be tidy. All engaged on secret work must be methodical in their habits - e.g. it is mainly knowing exactly where he has placed his belongings and arranged his room that an individual can detect disturbance by police search.
> 
> - SOE Syllabus, "Individual and Collective Security"

The importance of habits, but this time in of your physical space.

## Security for W/T Operations

A good courier should not themselves engage in subversive activity. Which doesn't necessarily mean that they can't be engaged in *illegal* activity - Allen Dulles, for example, recommends using commercial smuggling as cover with couriers for clandestine communications.

## Informant Service

Basically, talk to a lot of different kinds of people and be observant of your surroundings. Prefer people who mix with folks from many different strata, such as wait staff, servants, inn-keepers, bar staff, and "[a]ll grumbles and malcontents".

Under methods:

> Taking advantage of other people's bad security - e.g. -
> 
> Careless talk.
> 
> Disgruntled enemy personnel.
> 
> Affecting ignorance and thus encouraging others to air their knowledge.
> 
> Making false statements to elicit correct reply.
> 
> - SOE Syllabus, "Informant Service"

This reminds me both of the recent push of ransomware gangs to attempt to recruit disgruntled insiders, as well as the old saw on Twitter about how the best way to find out a solution to a problem is to suggest an obviously incorrect approach.

## Cover

> In some cases agents have to assume different identities in different places. This should be avoided as far as possible because it leads to contradictions.
> 
> - SOE Syllabus, "Cover"

In general, the approach here is to stick as close to the truth as possible - something that makes sense from my own experience. Telling the truth "slant", omitting details, or indulging in as little fictionalization as possible makes for more believable lies that are easier to remember (and easier to explain slip-ups around - "sorry, I mis-spoke", etc.).

A good point when establishing cover (seems to really apply for spies): After arriving at your station, take time to visit the places your cover story supposes you to have recently been. The goal is to familiarize yourself with details and create casual acquaintances who can then (unwittingly) provide corroboration of your cover.

> Remember, however, that a serious investigation is likely to break down your background cover by exposing the falseness of your documents or statements about your past life. *Always, therefore, avoid trouble with the authorities.* Have a ready story to account for everything.
> 
> - SOE Syllabus, "Cover"

Another piece of advice that calls back (forward?) to "The Moscow Rules".

> The "alibi" should be as near the truth as possible, provided that it is not suspicious. Time can be expanded. Dates of events can be transposed. Where the story is quite untrue the false parts can often be rehearsed. Cf. Build up of cover (above). It is dangerous to tell a story entirely untrue.
> 
> - SOE Syllabus, "Cover"

The construction of alibis is very similar to that of cover in general - just more specific for a particular event.

## Make Up and Disguise

> It must have as its basis the art of being and living mentally as well as physically this new role. The important thing to remember is to be the person you are portraying mentally first and the afterwards physically. Therefore - EXTERNAL IMITATION BY ITSELF IS NOT SUFFICIENT.
> 
> By this we mean imitating the external part of a character only, i.e. the walk, the voice the manners and individual items etc. of the character. External imitation without proper mental preparation must mean you speak and do things mechanically without fully realizing who you are, what you are supposed to be and do when you get there, etc. You will therefore be nothing but an external caricature and easily caught out.
> 
> - SOE Syllabus, "Make Up and Disguise"

Disguise as (deep) "pretend".

> Remember in a get-away the police will probably only have a description to work on, therefore work with a view to changing this description.
> 
> - SOE Syllabus, "Make Up and Disguise"

Minimum viable disguise.

A lot of this section feels like a re-iteration of the syllabus for "cover". Perhaps it's best to think of "cover", "disguise", and "alibis" as three variants of the same theme, just operating on different timescales (long, medium, and short, respectively).

Lots of make up and dress tips here. Some seem a little dated, but most would make a good reference (though I shudder to think of myself wielding a make up pencil).

Finally, as an interesting aside the British Navy (!) appears to have studied beard growth in some detail, coming to the conclusion that it requires 25 - 40 days to grow a full beard from a clean-shaven face. This actually aligns with my own experiences quite well.

# Tradecraft IIa: Selected SOE Training Lectures

SOE stands for the "Special Operations Executive", and was a World War 2 intelligence organization set up by Churchill after Dunkirk. It started out in a pretty amateurish way. *A lot* of people were caught, tortured, and killed. The SIS (the precursor to today's MI6) found SOE pretty annoying. But the SOE was also very good at learning from its mistakes.

(Part of the SOE's mixed track record was that its espionage efforts often ran into the reality of the German's willingness to exact collective punishment. Blow up a train track? The Germans will roll in and decimate the village. The SOE was *much* more effective in its intelligence mission and in recruiting *local* resistance... Though local Nazi resistance movements tended to fight each other more than they actually fought Nazis.)

The SOE's tactics were actually purposefully modeled after the IRA's.

> Security: "Precautions taken by the individual for his own personal protection and the protection of his organization from the enemy".
> 
> - SOE Syllabus, "Individual and Collective Security"

Good security is what enables effective cooperation in dangerous situations. ("A chain is only as strong as its weakest link", blah blah blah.)

## Applied Security

> Absence of evidence of counter espionage surveillance does not mean evidence of absence.
> 
> - The Grugq

Or the Joseph Heller variant, "[j]ust because you're crazy doesn't mean they're not out to get you." Or maybeHan Solo: "Don't get cocky, kid."

The KGB took a different attitude than the SOE (and other western intelligence agencies?) to work in a lax security environment. For the SOE, a lax security environment meant not having to be as careful in your operations. For the KGB, a lax security environment meant that you maintained the same care but expanded your operations. One way to think of this is that your OPSEC creates space in your environment for your operation; in a lax environment the same amount of security consciousness creates more operational space, so the most rational thing to do is either to scale down your security measures (relative to your environment) to match your objectives, or to scale up your objectives to match the space created by your security measures. (Increasing someone's workload also keeps them from getting over-confident in a lax security environment.)

Security has an environmental impact - your actions (or failure to act) visits risk far beyond your own person.

Security is a process, and good security habits make it easier to follow that process. This actually reminds me of something I just encountered today on Twitter:

> Rituals are a powerful tool for self-control: across multiple contexts, people who are given arbitrary, fixed, and rigid rituals to follow have lower self-control conflicts & higher self-discipline (one example, on reducing calories eaten, is in the image)
> 
> https://www.alexandria.unisg.ch/255299/2/Enacting%20Rituals%20to%20Improve%20Self-Control.pdf
> 
> - Ethan Mollick, via Twitter

*Habit* create *space* for self-control, and self-control is conversely what allows you to follow process. So while security isn't *just* a set of rules, having a set of good habits *gives you mental space* to consider the implication of security situations beyond that habit's rule set ("day-to-day" vs. "during an operation").

> You don't turn to the rules for answers, you turn to the process.
> 
> - The Grugq

* [Ethan Mollick on Twitter](https://twitter.com/emollick/status/1435302327045472257)

## Covert Interactions

There are *a lot* of side-channels when trying to act covertly, and almost all of them stem from carelessness In personal interactions.

> The less I open my mouth the more I know what I'm talking about.
> 
> The Grugq, quoting a background poster in an unspecified movie

This reminds me of Kali Linux's (former?) motto, "the quieter you become the more you are able to hear."

Something to keep in mind about side channels is that leaks can be gradual - a bit of information here, a bit of information there, and pretty soon you've got real intelligence.

Also... *Shut the actual fuck up!*

More points here about data minimization, in the form of "don't write down anything you don't absolutely, positively have to."

The Grugq points out that the best way to dispose of writing is to first burn the paper it's written on, then grind up the ashes (to make sure that nothing intelligible remains on larger pieces), and then to flush the ashes into the sewer system (to hide the evidence).

In behavior, aim to be as average as possible in appearance and conduct. The point is to *not* be memorable, because once attention is drawn to you for one (potentially even innocuous) reason, the actions you wish to conceal become more likely to be noticed in general. Being non-memorable means you don't have to rely on concealment and compartmentalization as much for safety (though remember the KGB's approach - don't assume that concealment and compartmentalization are then unnecessary!).

Clean up after yourself right away. Not only will this prevent clandestine materials from falling into the enemy's hands (you never know who might knock on your door), but having a clean, ordered space makes it more likely that you will notice when things have been disturbed by a search (or, in more modern times, potential implants).

The Grugq tells an interesting story of a woman (unclear if they were a spy or a resistance fighter) who would stack up boxes of film in a particular order within a suitcase with extra space in it. If someone moved the suitcase in the wrong way, the film boxes would fall over, and since the suitcase was closed the intruder would have no way of knowing the proper order to reassemble things in.

Always plan for the worst.

> Essentially, when you are planning a terrorist operation, the first thing you do is you plan how to escape. And once you've done that you plan how to get there. And if all of that is good and solid, then you plan what you're going to do when you're there. So the real operational plans are escapes that happen to have an action tacked on.
> 
> - The Grugq

For individuals, this boils down to establishing your exits as the first thing you do in any new situation/place.

One effective way of using code words is to invert the meanings of sentences ("yes, come over" -> "run away").

## Wireless Operators

Avoid establishing patterns.

A side-channel attack the Germans used to discover clandestine radio operators is that when they detected a transmission, they would begin shutting off power one block at a time; when the transmission ceased, they knew which block to search. The British worked around this by adding batteries to their radios (note that this only works if you *don't* try to hide as soon as the power goes out!).

The lesson here: You need to understand what the needs and side effects are of what you are trying to do, and how can these be turned against you?

## Safe Houses

The Grugq, commenting on using fire to destroy documents: "It doesn't actually work that well, because fire is not as fast as it should be."

## Cut-Outs

Using people as cut-outs has a somewhat dark secondary purpose: To throw suspicion off from the people doing the actual espionage.

## Wireless Operator Security Rules

Basically, wireless operators (the SOE lecture notes abbreviate them as "W/Os", which I wish I had known when reading them) are completely compartmentalized - they *only* operate the radios and encode/decode the messages. No operations. No risks. No knowledge outside of the narrow confines of their job. (To a certain extent, wireless operators can be thought of as a kind of cut-out themselves.)

# Tradecraft IIb: 73 Rules of Spycraft

Allen Dulles wrote "73 Rules of Spycraft" over the course of the late 1950s and early 1960s, and is in many ways refine the older WW2-era "Selected SOE Training Lectures".

The Grugq sees Allen Dulles' "73 Rules of Spycraft" as basically "everything you need to know about OPSEC"... Not so much because of the *literal* rules (some are now quite dated), but because they embody the type of thinking necessary for and principles underlying OPSEC so well.

## Security is Important

The Grugq sees "security" as a better term than "OPSEC", especially since over time the latter has come to have a more and more specific meaning. Again, it's a process, not any one rule/action! To paraphrase: "The OPSEC process is what creates security."

The security hierarchy: Your agents, your operation, yourself.

> Failure is almost always your own fault.
> 
> - The Grugq paraphrasing the first set of rules in Allen Dulles' "73 Rules of Spycraft"

This is *not* to say that falling under suspicion is necessarily your fault. Rather, it is to say that once the adversary has become focused on you, it's almost always some slip-up on your part (saying something you shouldn't, being sloppy in your habits, etc.) that does you in.

Again, the importance of habit/ritual.

> Security is the central pillar of everything else.
> 
> - The Grugq

Moving on... Shut the actual fuck up. This applies not only to cops, but also civilians.

(Okay, a clarification from Tradecraft IIa: In the modern era, Western intelligence operations take a KGB-sequence attitude towards the number of operations vs. the laxity of the security environment. In other words, as the security environment becomes more lax, all intelligence agencies will attempt to complete additional operations these days. That said, Western agencies still tend to favor pre-determining their level of operations, while the KGB's successors remain more inclined to make scaling decisions while actually in the field.)

One trick for writing without risk of creating an underlying impression is to do so one sheet of paper at a time on a glass surface.

> Mistakes are forever.
> 
> - The Grugq

Being under cover is a bit like developing a split personality - there's the you who knows things, and the you who doesn't. This is incredibly stressful, and generally leads to diminished performance when operating under *either* persona.

## Post

Because investigation is about correlating events, spreading out your operations over both space and time significantly impedes the adversary's efforts to uncover an operation. Travel away from your home base to conduct your operations. Spread out communications as much in time as possible.

## Safe Houses

One key to finding a safe house is to make sure that the people who run it are both trustworthy *and* not involved in any operations. Compartmentalize!

## Inconspicuous

Be average. Don't leave an impression. But don't *look* like you're trying to avoid leaving an impression.

Don't may eye contact (though don't try to avoid it either, as that can also draw attention). People are more likely to remember the face of someone they've made eye contact with.

To re-emphasize the need to spread out operations in space and time - people will generally start to recognize you after three encounters (*not* necessarily interactions - could just be going to the same coffee shop). "The first look is free", but by the third look they know you.

A call back to the need to be punctual (see notes from the previous lectures). If everyone is punctual, and then suddenly someone isn't, then you know something is long.

Another call back to taking indirect routes through crowded areas on foot. The better to identify potential tails.

Walk and talk. Outside, or in large spaces (such as museums) that generally are not crowded. (It feels like everything is crowded these days...)

Also... Shut the *actual* fuck up.

Never admit that you are a direct representative of anything... You're just a friendly guy passing things along. There should be someone more powerful (Allen Dulles calls this shadow "They") in the background who you communicate on behalf of, or is leaning on you, or otherwise directs things. This creates both apparent distance between yourself and the actual operation (you look more like a middle man) and allows you to sometimes bond with contacts and sources over what an asshole "They" are.

Compartmentalize! Compartmentalize! Compartmentalize!

## Handling Couriers

The best couriers are people whose profession is to move around. Mailmen. Stewardesses. Etc.

## Elements of an Espionage Network

How to set up a spy network (a break-down of rule 55):

> The ingredients for any new setup are:
> 
> serious consideration of the field and of the elements at your disposal;
> the finding of one key man or more;
> safe surroundings for encounter;
> safe houses to meet in;
> post boxes;
> couriers;
> the finding of natural covers and pretext for journeys, etc.;
> the division of labor;
> separation into cells;
> the principal danger in constructing personal friendships between the elements (this is enormously important);
> avoidance of repetition.
> 
> - Allen Dulles, "73 Rules of Spycraft"

"Post boxes" and "couriers" should be read as "dead drops" and "live drops".

The point about personal friendships is that it's important to treat the operation as a *business*, not a *family*.

An important element of choosing where you live is to have a space that allows *freedom of movement*. This means not only having a place that is well situated, but also making sure that any people you share it with are trustworthy while being relatively incurious about your affairs.

# Function of Clandestine Cellular Networks

Leading off with a distinction here between the *form* of compartmentalization (how a group is organized) vs. the *function* of compartmentalization (the tradecraft that minimizes the signature of individual cells and facilitates inter-cell communication).

Alternately: Compartmentalization has the *form* of cell structure, and the *function* of compartmentalization is to mask the links between cells (thus giving the appearance that each cell is atomic).

This reading defines a "cut-out" as a compartmentalization mechanism, which is a bit broader than previous definitions we've worked with.

The list of *functions* of a compartmentalized organization is essentially the same as Allen Dulles' list of things necessary to create a spy ring:

> The ingredients for any new setup are:
> 
> serious consideration of the field and of the elements at your disposal;
> the finding of one key man or more;
> safe surroundings for encounter;
> safe houses to meet in;
> post boxes;
> couriers;
> the finding of natural covers and pretext for journeys, etc.;
> the division of labor;
> separation into cells;
> the principal danger in constructing personal friendships between the elements (this is enormously important);
> avoidance of repetition.
> 
> - Allen Dulles, "73 Rules of Spycraft"

## Impersonal Communications

a.k.a. "Cut-outs".

The discussion of the new abilities vs. new risks opened up by the internet reminds me a lot of Zeynep Tufekci's deeper conversation about the "affordances" of different technologies from "Twitter and Tear Gas".

* [Twitter and Tear Gas](https://www.twitterandteargas.org)

## Counter Surveillance

If there's a take-away to this section, it seems to be that unmanned, computer-assisted aerial surveillance has been more of a counterintelligence game-changer than the signals intelligence work of the NSA, *et al.* A lot of older counter surveillance techniques (such as switching vehicles) are much less effective against modern aerial surveillance (which, if it is previously tracking someone, can often identify the switch).

> A former underground leader has suggested that while it is di!cult to  completely  escape  modern  surveillance  methods,  there  are many ways to mislead the surveillants. The underground member, wishing to minimize risks and chance factors, attempts to be as inconspicuous as possible and refrains from activities which might bring  attention  or  notoriety.  He  strives  to  make  his  activities conform with the normal behavior and everyday activities of the society in which he lives.
> 
> - DA PAM 550-104

This could have come straight from "73 Rules of Spycraft" or the "Selected SOE Training Lectures".

A new concept here (or really, an formalization of concepts already discussed): A "check route" is a long travel path using multiple means of transit and across multiple different environments that is designed to force any surveillance operations to expose themselves or break off. So, get on a bus, travel by car, walk through a mall... It's not *impossible* to follow someone effectively through all of these environment and transportation changes, but it becomes progressively harder to do without slipping up the more changes are stacked on each other.

## Emergency Methods for Re-Connecting the Network

Good, albeit obvious, point: Reconnection methods must be established *before* the network is severed, and need to be highly secure/clandestine (since the network is almost certainly operating under additional adversarial attention).

While re-connecting two cells (almost?) always requires a meeting, the goal is to immediately establish appropriate cut-outs to hide the new connection(s) coming from this meeting.

Superior-to-subordinate reconnection is generally done when the intermediate node is killed, while subordinate-to-superior reconnection is generally done when the intermediate node is captured (which can cause the subordinate node to fear disclosure and flee).

Reconnecting through third parties is easier to implement, but brings with it a high risk of infiltration (for example, the Germans infiltrating networks run by the Allies to try to smuggle downed pilots out of Europe).

> It is the physical act of contact with an unknown subordinate that puts the superior at greatest risk. He has to assume that the subordinate may have been detained, turned by the counterinsurgents, or perhaps provided them with the re-contact plan, and they have inserted an in!ltrator, taking advantage of the lack of direct knowledge of the individual. Due to this threat, the link-up is one of the most dangerous acts, and thus requires further application of clandestine methods.
> 
> - "Function of Clandestine Cellular Networks"

## Clandestine Recruiting

In general, it's best to have recruitment operations compartmentalized from leadership, so that if a recruitment goes bad the damage is contained.

Interesting... Al-Qaeda used *marriage* as a way to forge alliances with and recruit from various central-Asian and Middle Eastern tribes.

## Safe Houses

The reason insurgent leadership frequently moves between safe houses is to thwart surveillance and counterintelligence operations; generally a location will only be used for as long as the person feels it would take for an effective attack to be planned and organized. (It would seem to me that in addition to visiting multiple safe houses, those visits must have some randomness to them *and* new safe houses must always be being brought on-line while old safe-houses are decommissioned. Without doing this, the problem of `n` safe houses would seem to be functionally equivalent to `n = 1`.)

Safe house operators must not be involved in other organizational activities, in order to minimize their interest to the adversary. That said, they must have some way of indicating whether the house is safe to use (this can be as simple as "where are the clothes hanging?").

## Security at a Location

This section breaks down the two-ring security model that The Grugq has mentioned a couple of times in more detail. In particular, the inner ring exists to *actively* disrupt adversarial operations, while the outer ring is about *passive* surveillance of the adversary. Outer ring surveillance may include infiltration in enemy operations, and potentially entire cells with their own cut-outs.

## Clandestine Skills Training

The internet makes "independent studies" easier, but also makes it much harder to hide training materials from the adversary. There's also limits to such studies... Eventually you need "field experience".

## Considerations for Elements at the Edge of the Clandestine Organization

There's generally a real skills / training gradient between the core of a cell network and its periphery. Edge nodes are generally not trained very well, and are often only constituted for a particular purpose. Typically only the leader of an edge cell has any communication into the main network, and then only through a cut-out.

Since edge cells generally are the ones that are actually conducting operations, they tend to come under particular scrutiny by the adversary. As a side-effect, the adversary's attention is generally drawn away from the larger organization and towards the more immediate threat at hand. Cheap edge cells allow clandestine organizations to force the adversary to play whack-a-mole, clearing out space for the core network to work towards its larger strategic objectives.

# Tradecraft III

This section will talk about something more contemporary: Robert Hanssen, an FBI double agent who spied first for the KGB and later the SVR (the KGB's direct successor). In particular, The Grugq wants to concentrate on how Hanssen and the KGB initially made contact, established lines of communication, etc. (Hanssen was eventually identified through a KGB defector.)

Apparently there's a book out about this from the *KGB's* called *Spy Handler*, which makes interesting supplemental reading to the American perspective chronicled in *The Spy Next Door*.

Hanssen worked for the FBI's counterintelligence unit, and leaked *CIA* secrets that came through that team to the KGB. Hanssen worked for the KGB from the mid-1980s through the 1990s.

* [Robert Hanssen (Wikipedia)](https://en.wikipedia.org/wiki/Robert_Hanssen)
* [KGB (Wikipedia)](https://en.wikipedia.org/wiki/KGB)
* [Foreign Intelligence Service (Russia) (Wikipedia)](https://en.wikipedia.org/wiki/Foreign_Intelligence_Service_%28Russia%29)

## Hanssen's Tradecraft

Hanssen knew that the KGB had been compromised previously, and so aimed to use extreme compartmentalization to provide information without ever revealing themself to them.

## First Contact

Hanssen made first contact by sending a letter to a known *KGB agent*. Inside that letter was a second sealed envelope with directives *not* to be opened and instead to be delivered to the agent's superior (Cherkashin).

In this inner letter, Hanssen states that they will deliver a set of high-quality original documents for verification, and asks for $100,000. Hanssen is particularly concerned that the nature of the provided documents will identify them, and with good reason: A common counter-intelligence method is to cross-reference leaked documents to see who has access to all of the areas necessary to provide them.

In order to solidify their bond rides, Hanssen also reveals three KGB double-agents that the CIA had turned. Identifying these agents served a second purpose, however: By outing them, Hanssen eliminated three people they knew about who could potentially alert the CIA or FBI as to the leak (hence kicking off a counter-intelligence investigation that could reveal Hanssen). It later comes out that Hanssen has actually seen (and possibly been seen by) one of these CIA counter-intelligence assets, which is one reason Hanssen is so set on *never* meeting anyone working with the KGB.

So, right from the get go Hanssen is establishing strong compartmentalization (via the double-letter), security parameters (by outing the double agents), and credentials (by providing authentic documents).

Hanssen's refusal to directly disclose their identity to the KGB is good for Hanssen, but not great for the KGB (as it prevents them from providing a task sheet and makes it difficult to know if they're getting played or not). Hanssen was fairly fanatical about sticking to standard, low-level tradecraft - no special gadgets.

Hansen also insisted on using a common method for masking dates/times: They would add 6 to all months, days, and times of all communications with the KGB, and the KGB would in turn *subtract* 6 in all communications to Hanssen (the "coefficient", 6, was just the number Hanssen used; any other small integer also works). This technique works to obscure meeting times, but if enough communications are intercepted its use becomes somewhat obvious, as they tend not to fit the cover text very well. Still, without a particular target already in mind it can be very difficult to reverse engineer the coefficient, even with a lot of intercepted communications. (If the coefficient is only applied to hours and days it tends to be more effective at blending in with the cover text, but also doesn't provide as much counter-counter-intelligence value.)

## Transfer

Hanssen sets up a dead drop in a park to receive payment. This can be a little difficult to do with written words, so Hanssen provides both a description and a map reference from a common map book. The drop itself is disguised as a full trash bag (complete with actual trash). The actual package should be enclosed in a waterproof container.

Disguising dead drops as trash is actually pretty common.

Vertical (for Hanssen) and horizontal (KGB) pieces of white adhesive tape on a nearby sign was used for signaling (each party would remove the previous mark). While this is a fairly old method of signally, it's one that the KGB had actually abandoned by that time as being too obvious when setting up (the KGB preferred leaving specific pieces of trash in specific locations or marking specific names in a phone book).

(One of the things that comes out again and again here is that Hanssen opts for simplicity of tradecraft whenever possible. This reminds me of one of my particular hobby horses - which I'm sure I picked up from someone on Twitter - "complexity is the enemy of security".)

## Exchange

The KGB ultimately gave Hanssen $50,000. Interestingly, Hanssen never used this money - so their motivation remains slightly unclear even today (best guess is that it was an ego thing). That said, Hanssen played up the money aspect in subsequent communications (perhaps as a method of misdirection?).

The KGB seems to have wanted Hanssen to continue to deliver documents by post, but Hanssen viewed this as an unnecessary security risk (it was only used initially since no safer channels had yet been arranged).

To minimize the risk of the KGB screwing them over, Hanssen also took care from early on to present their work as a double agent as a long-term relationship. Because while an intelligence agency will casually screw over one-off assets, long term assets tend to be taken care of (very prisoner's dilemma).

Compartmentalization both *from* and *within* the KGB remains an ongoing concern for Hanssen.

Despite all of these precautions, Hanssen doesn't make the next drop because the agent initially being used as a cut-out comes under FBI surveillance.

(Apparently the CIA had a real problem in the 1980s with overseas agents skimming money that was earmarked to pay assets... And sometimes just completely making up assets and pocket the entire funding stream!)

* [Prisoner's dilemma (Wikipedia)](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma)

## For Sale Ad

Eventually, Hanssen became confident that the surveillance of the agent being used as a cut-out was not related to them and arranged another meeting. This time, Hanssen set up a new communications method: the use of a for sale ad. The ad would specify a number and time to call, Hanssen would call and after a brief authentication exchange leave a second number were the KGB could deposit a *recorded* message. So again, we're trying to minimize all real time interactions, even over the phone.

(Using an exchange to provide authentication - a *parole* in KGB-speak - can be tricky. Too specific or odd and the exchange will obviously be a "password", but too generic and you can get tripped up by random people actually saying the "right" thing. This latter concern isn't academic - there have been actual cases where innocent bystanders accidentally got an asset to follow them because they said something that matched an overly generic parole!)

## The Fated Phone Call

The phone call is what ultimately undoes Hanssen, as the KGB recorded it and subsequent phone calls (and then the better part of 15 years later those recordings were provided by a KGB defector). This is a good example of how mistakes in OPSEC are cumulative.

Also, people are *bad* at phone cover, which is something that *really* comes out in some of these phone transcripts. People screw up their cover on the phone all the time, which is one reason that phones are *bad*.

## Conclusions

Real life is messy, and even spies often allow efficiency to trump security.

That said, since 1945 no (US?) agents have been uncovered because of tradecraft errors. "The Moscow Rules" work.

Counterintelligence is a long game. You're waiting for a mistake... And once a mistake is made, it's often possible to unravel the entire thing.
