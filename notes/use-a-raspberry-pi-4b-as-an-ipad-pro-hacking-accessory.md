# Use a Raspberry Pi 4B as an iPad Pro Hacking Accessory

This guide will cover setting up Kali Linux on a Raspberry Pi 4B so that:

* It can be used as *both* a USB C “gadget” and over ethernet with an iPad Pro;
* All files except for /boot are encrypted;
* A full desktop environment is available on demand via RDP; and
* The system *still* works as a desktop device in a pinch (BYO keyboard, mouse, and monitor).

Be aware that this guide was written using the 64-bit 2021.2 Kali Linux image; YMMV with other images!

It should be possible to adapt the steps here for other Debian-based operating systems with a Raspberry Pi 4B compatible image. It should *also* be possible to do this all in fewer steps; the guide below is split up in a very step-by-step fashion, and is in no way optimized for speed.

NOTE: In my testing, an iPad Pro delivers enough power to run the Raspberry Pi and external SSD, but only barely (don't expect to attach anything else that pulls significant power and maintain a stable system). This limitation is the motivation for supporting connections over both USB C and the Raspberry Pi’s built-in ethernet, since the latter mode allows the use of an independent power supply to the Pi.

## Hardware and Software

Things you’ll want/need to follow along:

* A Raspberry Pi. (I use a 8 GB Raspberry Pi 4B.)
* A good USB C cable. (The DockCase USB C cable is surprisingly great.)
* A good microSD card. (I use a 128 GB Samsung Pro Endurance.)
* A second "bootstrap" microSD card that’s at least 32 GB in size. (You need something *twice* the size that your operating system image requires. This will just be used to “bootstrap” the encrypted microSD card, so it’s only necessary if you’re spinning the Pi up for the first time.)
* A USB microSD card reader (since you'll need to have *both* microSD cards connected to the Pi briefly.)
* Physical access to a Linux system. (This could actually be the Pi itself, if you’ve already got it up and running with another operating system.)
* An HDMI monitor, microHDMI-to-HDMI cable, and a USB keyboard (only needed until we set up network access and USB gadget mode).

While not necessary for this walk-through, you may also want to pick up a USB ethernet dongle if you think you’ll want to eventually connect the Pi to a wired network (since we'll be running a DHCP server on the PI's built-in ethernet port).

## Create the Bootstrap microSD

If you’re setting the Pi up for the first time, you’ll need to burn a Kali Linux microSD card to bootstrap off of. (If you already have a working Pi, fire it up and skip to the next section.)

```bash
# Download the latest version of Kali Linux from
# https://www.kali.org/get-kali/#kali-arm. Check that
# page to see which file name you should be using here
# (2021.2 is current at the time of this writing).
#
curl -O https://images.kali.org/arm-images/kali-linux-2021.2-rpi4-nexmon-64.img.xz

# Check the sha256 hash to make sure you’ve downloaded a
# good file (the hash used below is for the 2021.2
# image).
#
sha256sum kali-linux-2021.2-rpi4-nexmon-64.img.xz | \
	grep -E "^97549d9e24dbd73add004b9521874dff6351a6275428356e804b98eb9e842c99 " && \
	echo "SUCCESS - Download checksum looks good" || \
	echo "FAILURE - Download checksum doesn’t match expected value; file corrupt or incorrect"

# /dev/mmcblk0 is the SD card device on my system; YMMV.
# Be sure to use the right device here, or you can hose
# your system! If your system automatically mounts
# partitions on insert, then you’ll need to unmount them
# before performing this step.
#
xzcat kali-linux-2021.2-rpi4-nexmon-64.img.xz | \
	sudo dd of=/dev/mmcblk0 bs=4M status=progress
```

There’s a small amount of free space on the Kali ROOTFS partition; it may be useful to drop any of the SSH private keys here that you’ll eventually want to use to use to log into the Pi here to make it easier to copy them into the right locations later.

Pop the microSD card out, throw it in your Pi, boot up, log in. The first-run username and password are both `kali`.

We’ll need more space in ROOTFS than the Kali image provides out-of-the-box. The kalipi-config tool can make this happen, but unfortunately it doesn’t recognize the the 64-bit images as a Raspberry Pi! To fix this, you’ll need to edit /usr/bin/kalipi-config and hack the is_pi() function so that it always returns 0. Once you’ve done this, run `sudo kalipi-config` and use Advanced Options > Expand Filesystem to reclaim the rest of your microSD card’s space.

You’re now ready to bootstrap your *actual* system!

(Note that you can also create the encrypted partitions, format the file systems, and copy the operating system files to the second microSD card in this step, rather than the next one. Doing so saves you from having to download the Kali Linux image again, but since you *only* need to do this step when you’re bringing your first Pi to life I’m going to keep this section skipable.)

## Set Up the Encrypted microSD Card

```bash
# Download the latest version of Kali Linux from
# https://www.kali.org/get-kali/#kali-arm. Check that
# page to see which file name you should be using here
# (2021.2 is current at the time of this writing).
#
curl -O https://images.kali.org/arm-images/kali-linux-2021.2-rpi4-nexmon-64.img.xz

# Check the sha256 hash to make sure you’ve downloaded a
# good file (the hash used below is for the 2021.2
# image).
#
sha256sum kali-linux-2021.2-rpi4-nexmon-64.img.xz | \
	grep -E "^97549d9e24dbd73add004b9521874dff6351a6275428356e804b98eb9e842c99 " && \
	echo "SUCCESS - Download checksum looks good" || \
	echo "FAILURE - Download checksum doesn’t match expected value; file corrupt or incorrect"

# Decompress the image. Note that you may experience I/O
# hangs while decompressing the image; just be patient
# and wait for the Pi’s little green light to stop
# flashing.)
#
unxz kali-linux-2021.2-rpi4-nexmon-64.img.xz

# Everything from here on out needs to be run as root, so
# let’s use sudo to open a root shell now.
#
sudo -s

# Mount the partitions in the Kali disk image. Your image
# partitions will *probably* show up as /dev/loop0p1 and
# /dev/loop0p2, but you may want to check the symlinks
# under /dev/disk/by-label first, just to be sure.
#
losetup -Pf kali-linux-2021.2-rpi4-nexmon-64.img
mkdir /mnt/img-{root,boot}
mount /dev/loop0p1 /mnt/img-boot
mount /dev/loop0p2 /mnt/img-root

# Now connect up the microSD card reader and insert the
# first microSD card and partition it. My card shows up
# as /dev/mmcblk1 (so that’s what I’ll be using moving
# forward), but you’ll want to double-check this; if you
# use the wrong device here you can hose your system!
#
# Delete the current partition, make sure you’re using a
# DOS partition table, and then create two new
# partitions:
#
# The first partition should be a primary partition 500MB
# in size of type 0c (W95 FAT32 LBA).
#
# The second partition should also be a primary
# partition. It should use the remainder of the space and
# be of type 83 (Linux).
#
fdisk /dev/mmcblk1

# Format the new partitions, mount them, and copy over
# the operating system files.
#
mkfs.vfat -v -n BOOT /dev/mmcblk1p1
cryptsetup -v -y luksFormat /dev/mmcblk1p2
cryptsetup luksOpen /dev/mmcblk1p2 crypt_rootfs
mkfs.ext4 -v -L ROOTFS /dev/mapper/crypt_rootfs
mkdir /mnt/ext-{root,boot}
mount /dev/mmcblk1p1 /mnt/ext-boot
mount /dev/mapper/crypt_rootfs /mnt/ext-root
rsync -avh /mnt/img-boot/ /mnt/ext-boot/
rsync -avh /mnt/img-root/ /mnt/ext-root/

# You should copy your SSH public key(s) over to
# /mnt/ext-root at this point, as you’ll eventually need
# these to unlock the Kali ROOTFS partition via dropbear.
# I’m not writing out that step explicitly though; you
# could be generating a new keypair here, using keys you
# copied over to the bootstrap microSD above, or just
# copying ~/.ssh/authorized_keys from an existing system.
# You do you.

# Make the Pi load an initramfs on boot.
#
echo 'initramfs initramfs.gz followkernel' >> /mnt/ext-boot/config.txt

# Make sure the kernel knows where ROOTFS is. Note that
# we use /dev/mmcblk0p2 here rather than /dev/mmcblk1p2,
# because we're going to remove the current microSD card
# and use the one we're creating in a moment, which means
# that on boot this new card with be /dev/mmcblk0!
#
sed -i -e 's#root=/dev/mmcblk0p2#root=/dev/mapper/crypt_rootfs cryptdevice=/dev/mmcblk0p2:crypt_rootfs#' /mnt/ext-boot/cmdline.txt

# Fix paths in /etc/fstab.
#
sed -i -e 's#/dev/mmcblk0p2#/dev/mapper/crypt_rootfs#' /mnt/ext-root/etc/fstab

# Add ROOTFS to /etc/crypttab.
#
echo -e 'crypt_rootfs\t/dev/mmcblk0p2\tnone\tluks' >> /mnt/ext-root/etc/crypttab

# Now let’s actually generate the initramfs we need.
#
mount -t proc none /mnt/ext-root/proc
mount -t sysfs none /mnt/ext-root/sys
mount -o bind /dev /mnt/ext-root/dev
mount -o bind /dev/pts /mnt/ext-root/dev/pts
mount -o bind /mnt/ext-boot /mnt/ext-root/boot
LANG=C chroot /mnt/ext-root
mkinitramfs -o /boot/initramfs.gz $(uname -r)
exit

# Cleanup our mess.
#
umount /mnt/ext-root/boot
umount /mnt/ext-root/dev/pts
umount /mnt/ext-root/dev
umount /mnt/ext-root/sys
umount /mnt/ext-root/proc
umount /mnt/ext-root
cryptsetup luksClose crypt_rootfs
umount /mnt/ext-boot
umount /mnt/img-root
umount /mnt/img-boot
losetup -D
rm -rf /mnt/ext-* /mnt/img-*
exit
```

Now comes the moment of truth: Shut down and unplug the Pi, remove the bootstrap microSD card and the reader, put the microSD card you just created (from the reader, with the encrypted ROOTFS) into the Pi, and then plug the Pi back in. If everything went right, you should be prompted to enter the decryption passphrase you set for the microSD card, after which boot will continue and you’ll be able to log into the desktop environment!

(Note that the console unlock message can sometimes get lost in the initial dmesg output.)

### First Run

After the first successful boot there’s some basic housekeeping that we should do.

```bash
# Change the default user password.
#
passwd

# Become root.
#
sudo -s

# System update. DPKG may ask you some questions during
# this process.
#
apt update
apt full-upgrade
apt autoremove --purge --autoremove
apt clean
mkinitramfs -o /boot/initramfs.gz \
	$(ls -1 /lib/modules | grep -e '-Re4son-v8l+$' | sort | tail -1)

# Drop permissions.
#
exit
```

Kali Linux on the Raspberry Pi isn’t configured to use swap, which makes sense because normally it’s running from a slow microSD card. Still, having some swap  can aid system stability. We’re going to split the baby by enabling ZRAM.

Begin by create /usr/local/sbin/zram.sh:

```bash
#!/usr/bin/bash

case "$1" in
	"start" )
		# The “-s” option sets the size of the ZRAM device
		# *before* compression; ZRAM will *actually* use
		# something closer to 30% – 50% of this value,
		# depending on the compression algorithm used. As
		# a rule of thumb, set “-s” to be equal to the
		# amount of RAM you actually have *or* 8G,
		# whichever is *less*.
		ZRAMDEV="$(zramctl -f -s 8G -a zstd)"
		mkswap $ZRAMDEV
		swapon -p 10 $ZRAMDEV
	;;
	"stop" )
		for ZRAMDEV in $(awk '/zram/ { print $1 }' /proc/swaps); do
			swapoff $ZRAMDEV
			zramctl -r $ZRAMDEV
		done
	;;
	"restart" )
		$0 stop
		$0 start
	;;
	* )
		echo "USAGE: $(basename "$0") (start|stop|restart)"
	;;
esac
```

Then create the systemd service file /etc/systemd/system/zram.service:

```ini
[Unit]
Description=ZRAM-based virtual swap device
Requires=systemd-modules-load.service

[Install]
WantedBy=sysinit.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/zram.sh start
ExecStop=/usr/local/sbin/zram.sh stop
RemainAfterExit=true
```

Finally, make sure that everything’s enabled.

```bash
# Become root.
#
sudo -s

# Make sure that the ZRAM module is loaded.
#
echo zram >> /etc/modules

# Make the zram.sh script executable.
#
chmod +x /usr/local/sbin/zram.sh

# Enable required services.
#
systemctl daemon-reload
systemctl enable zram.service

# Encourage the kernel to preferentially clean up memory
# and swap into ZRAM sooner.
#
echo 'vm.vfs_cache_pressure=500' >> /etc/sysctl.conf
echo 'vm.swappiness=100' >> /etc/sysctl.conf
echo 'vm.dirty_background_ratio=1' >> /etc/sysctl.conf
echo 'vm.dirty_ratio=50' >> /etc/sysctl.conf

# Drop permissions.
#
exit
```

You should reboot after doing all of this.

## Network Access and USB Gadget Mode

```bash
# Become root.
#
sudo -s

# Install pre-requisits.
#
apt install dnsmasq

# Update firmware overlay and initramfs kernel modules.
#
echo 'dtoverlay=dwc2' >> /boot/config.txt
echo '' >> /etc/initramfs-tools/modules
echo dwc2 >> /etc/initramfs-tools/modules

# Update /etc/network/interfaces to add usb0 and make
# sure that eth0 is set up statically.
#
cat > /etc/network/interfaces << EOF
auto lo
iface lo inet loopback

auto eth0
allow-hotplug eth0
iface eth0 inet static
	address 10.54.0.1
	netmask 255.255.255.248

auto usb0
allow-hotplug usb0
iface usb0 inet static
	address 10.55.0.1
	netmask 255.255.255.248
EOF

# Create /etc/dnsmasq.d/ipad.
#
cat > /etc/dnsmasq.d/ipad << EOF
interface=eth0
dhcp-range=10.54.0.2,10.55.0.6,255.255.255.248,1h

interface=usb0
dhcp-range=10.55.0.2,10.55.0.6,255.255.255.248,1h

dhcp-option=3
dhcp-option=6
dhcp-authoritative
leasefile-ro
EOF

# Regenerate initramfs.
#
mkinitramfs -o /boot/initramfs.gz \
	$(ls -1 /lib/modules | grep -e '-Re4son-v8l+$' | sort | tail -1)

# Drop permissions.
#
exit
```

Create /usr/local/sbin/usb0up.sh:

```sh
#!/bin/sh

modprobe libcomposite

cd /sys/kernel/config/usb_gadget

if [ ! -d pi4 ]; then
	mkdir -p pi4
	cd pi4

	echo 0x1d6b > idVendor  # Linux Foundation
	echo 0x0104 > idProduct # Multifunction Composite Gadget
	echo 0x0100 > bcdDevice # v1.0.0
	echo 0x0200 > bcdUSB    # USB2
	echo 0xef   > bDeviceClass
	echo 0x02   > bDeviceSubClass
	echo 0x01   > bDeviceProtocol

	mkdir -p strings/0x409

	echo  fedcba9876543211 > strings/0x409/serialnumber
	echo 'Kali Linux'      > strings/0x409/manufacturer
	echo 'Kali Linux'      > strings/0x409/product

	mkdir -p configs/c.1/strings/0x409

	echo 'Config 1: ECM network' > configs/c.1/strings/0x409/configuration
	echo  250                    > configs/c.1/MaxPower

	mkdir -p functions/ecm.usb0

	echo '00:dc:c8:f7:75:14' > functions/ecm.usb0/host_addr # HostPC
	echo '00:dd:dc:eb:6d:a1' > functions/ecm.usb0/dev_addr  # BadUSB

	ln -s functions/ecm.usb0 configs/c.1/ecm.usb0

	udevadm settle -t 5 || :

	ls /sys/class/udc > UDC
fi
```

Create /usr/local/sbin/usb0down.sh:

```sh
#!/bin/sh

cd /sys/kernel/config/usb_gadget

if [ -d pi4 ]; then
	cd pi4
	echo '' > UDC

	rm -f configs/c.1/ecm.usb0

	rmdir functions/ecm.usb0
	rmdir configs/c.1/strings/0x409
	rmdir configs/c.1
	rmdir strings/0x409

	cd ..
	rmdir pi4
	cd /

	rmmod usb_f_ecm
	rmmod u_ether
	rmmod libcomposite
fi
```

The usb0down.sh script is something you won’t find in other tutorials about setting up a Raspberry Pi in USB gadget mode. Those all focus on bringing the usb0 interface up — none cover how to tear it down successfully. Unfortunately, iPadOS 15 doesn’t like it when USB ethernet gadget goes partially down when exiting the initramfs (we’ll cover this part of things in the next section). To work around this, we need to have the ability to completely remove usb0 so that the device doesn’t exist at all when the initramfs terminates and normal userland takes over.

Now that we can bring usb0 *completely* up and down, let’s tie things together. Create the systemd service file /etc/systemd/system/usb0.service:

```ini
[Unit]
Description=Raspberry Pi USB C ethernet gadget mode
Before=network.target NetworkManager.service dnsmasq.service
Requires=systemd-modules-load.service

[Install]
WantedBy=sysinit.target

[Service]
Type=oneshot
ExecStartPre=/usr/local/sbin/usb0up.sh
ExecStart=/usr/sbin/ifup usb0
ExecStop=/usr/sbin/ifdown usb0
ExecStopPost=/usr/local/sbin/usb0down.sh
RemainAfterExit=true
```

Finally, let’s activate everything.

```bash
# Become root.
#
sudo -s

# Make our usb0.sh script executable.
#
chmod +x /usr/local/sbin/usb0up.sh
chmod +x /usr/local/sbin/usb0down.sh

# Enable required services.
#
systemctl daemon-reload
systemctl enable dnsmasq.service
systemctl enable usb0.service

# Drop permissions.
#
exit
```

Second moment of truth: Shut down the system, remove the power, and connect the Pi to your iPad over USB C. The Pi should power on, and then shortly after you unlock the ROOTFS the iPad should be assigned an IPv4 address via the ethernet device “Kali Linux”. You should then be able to SSH in as kali@10.55.0.1.

Similarly, if you connect to your Pi directly to a power supply and your iPad to the Pi’s ethernet port, then you should be able to SSH in as kali@10.54.0.1.

## ROOTFS Unlock Over SSH

```bash
# Become root.
#
sudo -s

# Install dropbear + initramfs hooks.
#
apt install dropbear-initramfs

# Align dropbear SSH host keys with OpenSSH. Normally
# this isn’t considered a best practice, but…
#
#     (1) We’re only ever connecting to the Pi over usb0,
#         not an open network (or, god forbid, the
#         internet).
#     (2) We’re actually going to take steps in a moment
#         to MAKE SURE that (1) is true.
#
# Since we’re only connecting to the Pi via SSH over a
# SINGLE cable, using a private IP address, and with SSH
# host keys that are unique to this device, the danger of
# having these keys disclosed in the event that someone
# got ahold of the Pi’s microSD card seems minimal (after
# all, such an attacker could just trojan the
# initramfs.gz directly).
#
# (Note that you should make sure to set an EMPTY
# password when using ssh-keygen to convert they keys to
# PEM format, as dropbear doesn’t support
# password-protected host keys.)
#
cd /etc/dropbear/initramfs
rm -f dropbear_*_host_key
cp /etc/ssh/ssh_host_*_key .
for SSH_KEY in $(ls -1 ssh_host_*_key); do
	DROPBEAR_KEY="$(echo "$SSH_KEY" | sed -e 's/ssh_host_\(.*\)_key/dropbear_\1_host_key/')"
	ssh-keygen -m PEM -p -f $SSH_KEY
	dropbearconvert openssh dropbear $SSH_KEY $DROPBEAR_KEY
	rm -f $SSH_KEY
done

# At this point you’ll need to add your SSH public keys
# to /etc/dropbear/initramfs/authorized_keys. I’m not
# writing out this step explicitly though; you could be
# generating a new keypair here, using keys you copied
# over when setting up the encrypted microSD card, or
# just copying ~/.ssh/authorized_keys (and making sure
# that the permissions are right!). You do you.
#
# That said!
#
# As a fan of per-host keys I’m not in love with this
# step, since it means that if I reset my iPad then I
# need an external keyboard to unlock the Pi before I can
# copy over the new public key. Unfortunately, I don’t
# see any way to support a password-based login (which I
# think is “secure enough” in here for the same reason
# that I think that re-using the SSH host keys is “secure
# enough” in this particular context) without modifying
# dropbear’s initramfs setup hook (which I’d rather not
# do, as any changes will be overwritten if the
# dropbear-initramfs package is updated).

# Add dropbear configuration options. In particular, for
# an unlock of ROOTFS on successful login.
#
sed -i -e 's;^#DROPBEAR_OPTIONS=$;DROPBEAR_OPTIONS="-jks -c /usr/bin/cryptroot-unlock-ssh";' /etc/dropbear/initramfs/config

# Drop permissions.
#
exit
```

Create /usr/local/sbin/cryptroot-unlock-ssh.sh:

```sh
#!/bin/sh

ROOTFS_DEV=crypt_rootfs

if [ ! -b /dev/mapper/$ROOTFS_DEV ]; then
	if [ -f /cryptroot/crypttab ]; then
		ROOTFS_UID="`grep $ROOTFS_DEV /cryptroot/crypttab | cut -d ' ' -f 2`"
	elif [ -f /etc/crypttab ]; then
		ROOTFS_UID="`grep $ROOTFS_DEV /etc/crypttab | cut -f 2`"
	else
		exit
	fi

	/usr/sbin/cryptsetup luksOpen $ROOTFS_UID $ROOTFS_DEV && killall cryptroot
fi
```

Create /usr/share/initramfs-tools/hooks/cryptroot-unlock-ssh:

```sh
#!/bin/sh

PREREQ=""

prereqs() {
	echo "$PREREQ"
}

case "$1" in
	prereqs)
		prereqs
		exit 0
	;;
esac

. /usr/share/initramfs-tools/hooks-functions

copy_file script /usr/local/sbin/cryptroot-unlock-ssh.sh /usr/bin/cryptroot-unlock-ssh
```

Create /usr/share/initramfs-tools/hooks/ipad:

```sh
#!/bin/sh

PREREQ=""

prereqs() {
	echo "$PREREQ"
}

case "$1" in
	prereqs)
		prereqs
		exit 0
	;;
esac

. /usr/share/initramfs-tools/hooks-functions

manual_add_modules dwc2 libcomposite usb_f_ecm
copy_file script /usr/local/sbin/usb0up.sh /usr/sbin/usb0up.sh
copy_file script /usr/local/sbin/usb0down.sh /usr/sbin/usb0down.sh

copy_exec /usr/sbin/dnsmasq
copy_file config /etc/dnsmasq.d/ipad /etc/dnsmasq.conf
```

Create /usr/share/initramfs-tools/scripts/init-top/ipad:

```sh
#!/bin/sh

PREREQ="udev"

prereqs() {
	echo "$PREREQ"
}

case "$1" in
	prereqs)
		prereqs
		exit 0
	;;
esac

. /scripts/functions

mount -t configfs none /sys/kernel/config

. /usr/sbin/usb0up.sh

ipconfig -d "10.54.0.1:::255.255.255.248:kali:eth0"
ipconfig -d "10.55.0.1:::255.255.255.248:kali:usb0"

/usr/sbin/dnsmasq --local-service --user=root --pid-file=/run/dnsmasq.pid
```

Create /usr/share/initramfs-tools/scripts/local-bottom/ipad:

```sh
#!/bin/sh

PREREQ=""

prereqs() {
	echo "$PREREQ"
}

case "$1" in
	prereqs)
		prereqs
		exit 0
	;;
esac

. /scripts/functions

kill -TERM `cat /run/dnsmasq.pid`

ip link set dev eth0 down
ip address flush dev eth0
ip route flush dev eth0

ip link set dev usb0 down
ip address flush dev usb0
ip route flush dev usb0

. /usr/sbin/usb0down.sh

umount /sys/kernel/config
```

Fix up permissions and finish setting things up:

```bash
# Become root.
#
sudo -s

# Make sure that new initramfs-tools scripts are
# executable.
#
chmod +x /usr/local/sbin/cryptroot-unlock-ssh.sh
chmod +x /usr/share/initramfs-tools/hooks/cryptroot-ssh
chmod +x /usr/share/initramfs-tools/hooks/ipad
chmod +x /usr/share/initramfs-tools/scripts/init-top/ipad
chmod +x /usr/share/initramfs-tools/scripts/local-bottom/ipad

# Regenerate initramfs.
#
mkinitramfs -o /boot/initramfs.gz $(ls -1 /lib/modules | grep -e '-Re4son-v8l+$' | sort | tail -1)

# Drop permissions.
#
exit
```

Third moment of truth: Reboot your system. After a few moments you should be able to SSH into it as root@10.55.0.1 (over USB C) or root@10.54.0.1 (over ethernet) and be prompted to unlock your root device. After you type in your decryption passphrase, SSH should automatically close and your system should continue to boot. In a few more moments you should be able to SSH back in as kali@10.55.0.1 (or kali@10.54.0.1).

You can *also* still unlock the system at the console, which is handy if you want to use the Pi as a stand-alone computer.

Note an annoying feature of this setup — you have to SSH in as *root* to do the initial unlock, but then will need to SSH in a second time as *kali* once the system is fully up. Partly, this is due to the fact that there’s not really a way to hand SSH off from the initram environment to the full system (this is why you have to log in once to unlock, and again to use the system once it’s fully up). Theoretically it should be possible to add a kali user to the initramfs, but doing so would require both the dropbear initramfs hooks to be modified (which is fragile w.r.t. upgrades) and *a lot* more magic in generally than seems advisable.

## Network Hardening

Now that we’ve got the Pi working with our iPad, we’re going to lock down networking a bit

```bash
# Become root.
#
sudo -s

# Limit SSH access to the kali user over usb0.
#
cat > /etc/ssh/sshd_config.d/lockdown.conf << EOF
AllowUsers kali
ListenAddress 10.54.0.1
ListenAddress 10.55.0.1
PermitRootLogin no
EOF
systemctl restart sshd.service

# Basic firewall.
#
apt install gufw
systemctl start ufw.service
ufw default deny
ufw allow in on eth0 from 0.0.0.0/0 port 68 to 0.0.0.0/0 port 67 proto udp
ufw allow in on usb0 from 0.0.0.0/0 port 68 to 0.0.0.0/0 port 67 proto udp
ufw allow in on eth0 from 10.54.0.0/29 to 10.54.0.1 port 22 proto tcp
ufw allow in on usb0 from 10.55.0.0/29 to 10.55.0.1 port 22 proto tcp
ufw enable

# Drop permissions.
#
exit
```

The last setting will disable all networking (except for the eth0 and usb0 interface we use for access) on boot. To openly connect to a network (which is probably what you want to do most of the time), run `sudo systemctl start NetworkManager.service`. (Why disable this when most of the time it doesn’t matter? Because when it *does* matter, it *really* matters, and you don’t want to accidentally forget about this!)

## Remote Desktop

```bash
# Become root.
#
sudo -s

# Install and set up xrdp.
#
apt install xrdp
ufw allow in on eth0 from 10.54.0.0/29 to 10.54.0.1 port 3389 proto tcp
ufw allow in on usb0 from 10.55.0.0/29 to 10.55.0.1 port 3389 proto tcp
systemctl enable xrdp.service

# Drop permissions.
#
exit
```

You should now be able to log in using RDP. Standard resolutions work well, but HiDPI/Retina is only marginally more responsive than a slideshow.

As with the dropbear configuration in the previous section, please do *not* set up RDP like I’m presenting here if you’re using a device that’s exposed to a larger network, or worse yet the internet as a whole. In the real world, RDP servers should *only* be accessible over SSH, a VPN, or some other secure wrapper — never exposed directly as we’re doing here. The reason we can get away with less is (again) because we’re *only* exposing RDP over the usb0 interface, and the *only* other device that ever lives on that network is the iPad.

## References

* [Kali Linux Raspberry Pi 4 documentation](https://www.kali.org/docs/arm/raspberry-pi-4/)
* [Kali’s Default Credentials](https://www.kali.org/docs/introduction/default-credentials/)
* [expand file system kali linux on SD card of 16GB](https://raspberrypi.stackexchange.com/a/127378)
* [How to mount a multi-partition disk image in Linux?](https://superuser.com/a/1263401)
* [Raspberry Pi - Full Disk Encryption](https://gitlab.com/kalilinux/documentation/kali-docs/-/tree/master/arm/raspberry-pi-with-luks-full-disk-encryption-2)
* [Raspberry Pi USB mass storage boot](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bootmodes/msd.md)
* [Zram](https://linuxreviews.org/Zram)
* [zram-swap](https://github.com/foundObjects/zram-swap)
* [Raspberry Pi Performance: Add ZRAM and these Kernel Parameters](https://haydenjames.io/raspberry-pi-performance-add-zram-kernel-parameters/)
* [How to automatically run mkinitramfs on Debian after apt update for kernel packages?](https://unix.stackexchange.com/questions/604563/how-to-automatically-run-mkinitramfs-on-debian-after-apt-update-for-kernel-packa)
* [Pi4 USB-C Gadget](https://www.hardill.me.uk/wordpress/2019/11/02/pi4-usb-c-gadget/)
* [Dynamic reconfiguration of USB Gadget](https://e2e.ti.com/support/processors-group/processors/f/processors-forum/627474/linux-am3352-dynamic-reconfiguration-of-usb-gadget)
* [initramfs-tools: network isn’t deconfigured which breaks networking initscript](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=720987)
* [dropbearconvert refuses all kinds of OpenSSH keys](https://bbs.archlinux.org/viewtopic.php?id=250512)
* [Debian: Unlock LUKS root partition remotely by SSH using dropbear](https://www.arminpech.de/2019/12/23/debian-unlock-luks-root-partition-remotely-by-ssh-using-dropbear/)
* [How to unlock LUKS using Dropbear SSH keys remotely in Linux](https://www.cyberciti.biz/security/how-to-unlock-luks-using-dropbear-ssh-keys-remotely-in-linux/)
* [Enable Wireless networks in Debian Initramfs](https://www.marcfargas.com/posts/enable-wireless-debian-initramfs/index.html)
* [USB Guest configuration](https://openwrt.org/docs/guide-user/hardware/usb_gadget)
* [Encryption unlock not showing](https://gitlab.com/kalilinux/documentation/kali-docs/-/issues/49)
* [Setting up RDP with Xfce](https://www.kali.org/docs/general-use/xfce-with-rdp/)
* [Kali Linux](https://www.kali.org/)
* [Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)
* [iPad Pro](https://www.apple.com/ipad-pro/)
* [Raspberry Pi 4 Model B - 8 GB RAM (Adafruit)](https://www.adafruit.com/product/4564)
* [DockCase USB C to USB C Cable (0.72ft), 3.1 Gen 2 (Amazon)](https://www.amazon.com/dp/B07THFJ1J5)
* [Samsung PRO Endurance 128GB (Amazon)](https://www.amazon.com/dp/B07B984HJ5)
* [Linux Performance: Why You Should Almost Always Add Swap Space](https://haydenjames.io/linux-performance-almost-always-add-swap-space/)
* [Linux Performance: Almost Always Add Swap. Part 2: ZRAM](https://haydenjames.io/linux-performance-almost-always-add-swap-part2-zram/)

- - - -

<span aria-hidden="true">👤</span> Nathan Acks  
<span aria-hidden="true">📅</span> November 18, 2021
