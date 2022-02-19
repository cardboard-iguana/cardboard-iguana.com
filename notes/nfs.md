# Using NFS

## NFS Basics

All versions of NFS use port 2049 to transfer data; NFSv1 - NFSv3 also depended on the “portmapper” service running on port 111, but this requirement was removed in NFSv4.

```bash
# List NFS shares.
#
showmount -e $SERVER_IP

# Mount an NFS share.
#
sudo mount -t nfs ${SERVER_IP}:${SHARE_PATH} \
                  $LOCAL_MOUNT_DIR -nolock

# Force-unmount an unresponsive share.
#
sudo umount -f $LOCAL_MOUNT_DIR
```

Note that the mount directory must be owned by root.

## Root Squashing

Files created on NFS shares inherit the *remote* UID. By default, NFS enables “root squashing”, which maps UID 0 to the `nobody` user.

Root squashing can be *disabled* in /etc/exports with the `no_root_squash` flag. This is obviously insecure, however, as it allows a user that connects to that share as root to drop SUID binaries!

## References

* [TryHackMe: Complete Beginner](tryhackme-complete-beginner.md)
* [What is NFS port number in Linux?](https://racinpaper.com/auto-racing/what-is-nfs-port-number-in-linux.html)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> October 3, 2021
