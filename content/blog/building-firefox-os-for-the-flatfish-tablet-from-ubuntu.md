---
title: "Building Firefox OS for the Flatfish Tablet from Ubuntu"
description: "Getting started with the latest builds of Mozilla's Mobile Operating System"
tags:
  - "firefox"
  - "build"
date: "2014-09-22"
categories:
  - "firefoxos"
slug: "building-firefox-os-for-the-flatfish-tablet-from-ubuntu"
aliases:
 - "/building-firefox-os-for-the-flatfish-tablet-from-ubuntu"
---

For reference, this was done using Ubuntu 14.10. If it works for you on other versions, please let me know!

First off, make sure to familiarize yourself with [the official instructions for building Firefox OS](https://wiki.mozilla.org/FirefoxOS/TCP/Patching), as we'll be following them.

Start off by following [the prerequisites for Ubuntu 13.10 on the MDN site](https://developer.mozilla.org/en-US/Firefox_OS/Firefox_OS_build_prerequisites#Ubuntu_13.10)

	sudo dpkg --add-architecture i386
	sudo apt-get update
    sudo apt-get install --no-install-recommends autoconf2.13 bison bzip2 ccache curl flex gawk gcc g++ g++-multilib gcc-4.6 g++-4.6 g++-4.6-multilib git lib32ncurses5-dev lib32z1-dev zlib1g:amd64 zlib1g-dev:amd64 zlib1g:i386 zlib1g-dev:i386 libgl1-mesa-dev libx11-dev make zip libxml2-utils
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 1
	sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 2
	sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 1
	sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 2
	sudo update-alternatives --set gcc "/usr/bin/gcc-4.6"
	sudo update-alternatives --set g++ "/usr/bin/g++-4.6"

You'll also need various Android tools as well, so make sure they are installed.

	sudo apt-get install android-tools-adb android-tools-fastboot


# Flashing the Bootloader

If you haven't already flashed the bootloader and loaded at least version 2 of Firefox OS on the device, [follow the directions here](http://openmoz.wordpress.com/2014/07/13/flash-firefox-os-2-1-into-your-tablet/) now. They work, and don't require any special tools!

THe process in a nutshell:

1. Download [the needed files](https://www.dropbox.com/sh/b2py1btcwstqldl/AAB7RSLHNYoUJYJjHrH8YrPCa/stable)
2. Connect your device.
3. Make sure it's readable by adb with the command `adb devices`. You should see output that includes `FLATFISH_123456`.
4. `cd` into the directory of the unzipped files and run the command:

		./flash-flatfish.sh . ~/dev_fxos/a31-b2g


It should work, and flash the new bootloader and v2.1 of Firefox OS on your device.

# Build Process

## Special Requirements

Make 3.81 or 3.82
Autoconf 2.13

## Setting up `make`

The build process requires an older version of make. The 4.0 branch is shipped with Ubuntu 14.10, so you'll need to fetch the previous version first. You can [download Make 3.81 here](http://packages.ubuntu.com/trusty/make).

First, remove the previous version (if installed) and install the package you just downloaded. You can do that with the command, making sure to first `cd` into the directory you downloaded it to:

	sudo apt-get purge make -y
	sudo dpkg -i make*.deb

> **IMPORTANT** This process may remove other packages that depend on `make`. Note them carefully and reinstall them after running these commands.



## Setting Up Autoconf

The build process requires a specific version of `autoconf`. Thankfully, it's easy to install. If you installed all the prerequisites mentioned earlier, it's already done. If not, run:

    apt-get install make2.13

## Setting up udev

Make sure the file `/etc/udev/rules.d/51-android.rule` exists, and it has at least the following lines in it:

	SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
	SUBSYSTEM=="usb", ATTR{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"

If it doesn't exist, create it.


## Downloading the source

You'll need `git` for this. Switch into a directory where you'll want the source to stay.

	git clone git://github.com/mozilla-b2g/B2G.git -b master b2g_flatfish
	cd b2g_flatfish
    ./config.sh flatfish

The source code is going to be around 11 GB of space, so it will likely take a while to download.

## The Build Commands

After that, you should (hopefully) be able to build and flash the system. Again, [refer to the official docs](https://wiki.mozilla.org/FirefoxOS/TCP/Patching#Start_to_build_flatfish), but it's basically the following commands from the source code directory:

		GAIA_DEVICE_TYPE=tablet B2G_SYSTEM_APPS=1 B2G_UPDATER=1 ./build.sh
        ./flash.sh

## Subsequent Source Code Updates

When updating the source in the future, run the commands:

	git pull
	./repo sync -d

As the OS is under heavy development, it's a good idea to pull the latest changes *before each build*.

# Conclusion

Whew! There are a lot of steps involved. Hopefully you got it working! If not, feel free to reach out for help here, or on the Mozilla IRC channels.

Enjoy your freshly updated Firefox OS device!
