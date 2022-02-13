# Windows Permissions

Windows access is default-deny.

| Permission           | Meaning for Folders                                                                                               | Meaning for Files                                                                                     |
|:-------------------- |:----------------------------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------- |
| Read                 | Permits viewing and listing of files and subfolders                                                               | Permits viewing or accessing of the file’s contents                                                   |
| Write                | Permits adding of files and subfolders                                                                            | Permits writing to a file                                                                             |
| Read & Execute       | Permits viewing and listing of files and subfolders as well as executing of files; inherited by files and folders | Permits viewing and accessing of the file’s contents as well as executing of the file                 |
| List Folder Contents | Permits viewing and listing of files and subfolders as well as executing of files; inherited by folders only      | N/A                                                                                                   |
| Modify               | Permits reading and writing of files and subfolders as well as executing of files; allows deletion of the folder  | Permits reading and writing of the file as well as executing of the file; allows deletion of the file |
| Full Control         | Permits reading, writing, changing, and deleting of files and subfolders                                          | Permits reading, writing, changing and deleting of the file                                           |

The biggest differences between Windows and UNIX permissions:

* Windows doesn’t have as fine-grained of control *for a given user or group*.
* Windows has *much more* fine-grained control across users and groups (there’s no limit of three permission sets).
* The ability to delete a folder or file, and to change its permissions, are essentially considered to be distinct “sub-permissions”.

The `icacls` tool can be used to check (and change!) permissions at the command line, but its output is somewhat different than that of the “Security” tab in the file or folder properties.

* `(I)` — permission inherited from the parent container
* `(F)` — full access (full control)
* `(M)` — modify right/access
* `(OI)` — object inherit
* `(IO)` — inherit only
* `(CI)` — container inherit
* `(RX)` — read and execute
* `(AD)` — append data (add subdirectories)
* `(WD)` — write data and add files

## References

* [File and Folder Permissions](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-2000-server/bb727008)
* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)

- - - -

👤 Nathan Acks  
📅 September 17, 2021
