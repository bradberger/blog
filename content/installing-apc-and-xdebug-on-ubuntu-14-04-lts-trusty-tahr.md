---
title: "Installing APC and Xdebug on Ubuntu 14.04 LTS (Trusty Tahr)"
description: "Get up and running with APC and Xdebug in the latest stable version of Ubuntu"
tags:
  - "php"
  - "xdebug"
  - "apc"
  - "trusty-tahr"
  - "14.04"
  - "ubuntu"
  - "install"
  - "needs-review"
date: "2014-06-30"
categories:
  - "ubuntu"
  - "php"
slug: "installing-apc-and-xdebug-on-ubuntu-14-04-lts-trusty-tahr"
---

Installing APC and/or Xdebug for PHP on Ubuntu 14.04 isn't hard, but requires knowing a few small bits of information, particularly if you're planning on using Xdebug with command-line PHP scripts.
   
## Install Xdebug

## If You Don't Need Xdebug on CLI

If you need Xdebug only through Apache, installing it is as simple as:

	sudo apt-get install php5-xdebug

If you need Xdebug on the command-line (CLI) then it's a bit more work, since it's Xdebug on the command-line via the `php5-xdebug` package is disabled.

If you don't need it on the command-line, skip the following directions!

## If You Do Need XDebug on CLI

If you do need Xdebug on the CLI, though, it currently needs to be installed via PECL.

First, make sure you have PEAR installed. For that, you'll need to make sure that `php5-dev` and `libpcre3-dev` and `php-pear` are installed:

	# sudo apt-get install php5-dev libpcre3-dev php-pear
        
If these aren't installed, you may see errors like:

	/usr/include/php5/ext/pcre/php_pcre.h:29:18: fatal error: pcre.h: No such file or directory
        
or
	sh: 1: phpize: not found


Now, after installing those packages, run the command:

	sudo pecl install xdebug


Now you'll need to set up tell PHP to use Xdebug, so it's probably best to then create a `xdebug.ini` file in `/etc/php5/mods-available`

You can do that with:

	echo "zend_extension=xdebug.so" > /etc/php5/mods-available/xdebug.ini
    
Then link that file in the `apache2` and `cli` PHP configuration directories.

First, for Apache:

	sudo ln -s /etc/php5/mods-available/xdebug.ini /etc/php5/apache2/conf.d/20-xdebug.ini
    
Then to enable it via CLI:

    sudo ln -s /etc/php5/mods-available/xdebug.ini /etc/php5/cli/conf.d/20-xdebug.ini

# Install APC

The APC install is part of the `php-apc` package, and it installs the `php-apc` and `php5-apcu` packages. The `php5-apcu` package is necessary for APC support in PHP versions 5.5 and above.

So all you need is a simple:

	sudo apt-get install php-apc
    
# Conclusion

APC and Xdebug are two extremely useful tools for PHP development. Hopefully this has helped you get them up and running on Ubuntu 14.04 LTS (Trusty Tahr).

Happy coding!

-- Brad

