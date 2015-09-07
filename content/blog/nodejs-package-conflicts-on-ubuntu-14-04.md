---
title: "NodeJS Package Conflicts on Ubuntu 14.04"
description: "Fixing issues with installing Cordova command-line tools on Ubuntu"
tags:
  - "nodejs"
  - "javascript"
  - "ubuntu"
  - "conflicts"
  - "cordova"
date: "2014-07-16"
categories:
  - "ubuntu"
slug: "nodejs-package-conflicts-on-ubuntu-14-04"
aliases:
 - "/nodejs-package-conflicts-on-ubuntu-14-04"
---

If you're developing with Cordova/PhoneGap/Ionic apps on the Ubuntu platform, chances are you're using the `cordova-cli` package.

For a while now, the `nodejs` and `nodejs-legacy` packages have collided around a singe man file. Unfortunately, the simple file collision can break the entire package manager and make it difficult to update anything.

# Add `dkpg --force-overwrite` Flag

The solution is very simple. Just add the `dkpg --force-overwrite` flag to your `apt-get` commands.

So this:

```bash
sudo apt-get install cordova-cli
```

becomes:

```bash
sudo apt-get -o Dpkg::Options::="--force-overwrite" install cordova-cli
```

Of course, you probably don't want to type that all the time. So just add an alias to your `~/.bashrc` file:

```bash
alias apt-get="sudo apt-get -o Dpkg::Options::=\"--force-overwrite\""
```

This means you'll now just need to type `apt-get ....` for all install/update operations.

As with any updates to the `~/.bashrc` file, make sure you sign out and sign back in for it to take effect, or just type the same command into your current terminal.

-- Brad
