# TryHackMe: Pre Security (Supplements)

author:: Nathan Acks  
date:: 2021-09-21

## Regular Expressions

### Metacharacters and Repetitions

| Metacharacter | Meaning                                       |
|:-------------:|:--------------------------------------------- |
|     `\d`      | `[0-9]`                                       |
|     `\D`      | `[^0-9]`                                      |
|     `\w`      | `[0-9a-zA-Z_]`                                |
|     `\W`      | `[^0-9a-zA-Z_]`                               |
|     `\s`      | Whitespace characters (including line breaks) |
|     `\S`      | Non-whitespace characters                     |

NOTE: Be aware that `\w` *includes* `_` (but not `-`)!
