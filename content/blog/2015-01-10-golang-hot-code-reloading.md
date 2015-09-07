---
title: "Golang Hot Code Reloading"
description: "Developing golang code with automatic hot reloading on Ubuntu"
tags:
  - "go"
  - "golang"
  - "ubuntu"
  - "hot-code-reloading"
date: "2015-01-10"
categories:
  - "ubuntu"
  - "golang"
slug: "golang-hot-code-reloading"
aliases:
  - "/golang-hot-code-reloading"
---

When developing server code in [Go](//golang.org), it can be a bit of a pain to compile and
restart the servers constantly. While some frameworks do this for you automatically, you may
not be using such a framework. Then what?

Thankfully, [the solution is quite simple](https://medium.com/@olebedev/live-code-reloading-for-golang-web-projects-in-19-lines-8b2e8777b1ea).
It should only take a few minutes to get up and running with this, and all your future
hacking on Golang powered servers will be a lot easier.

# fswatch

For this solution to work, you'll need [fswatch](//emcrisostomo.github.io/fswatch/) installed. If your running
Ubuntu, it will require getting your hands a little bit dirty to get it up
and running.

If your on a Mac, apparently [it's a lot easier](https://github.com/emcrisostomo/fswatch/#getting-fswatch).

# Installing `fswatch` On Ubuntu

### Get the source code

First, you'll need to get the latest code from the repo. You can
download the zip and unzip it. If you're comfortable with Git it's even
better to clone the repo.

{{% highlight bash %}}
	git clone git@github.com:emcrisostomo/fswatch.git
	cd fswatch
{{% /highlight %}}

### Install necessary requirements

If you haven't installled these yet, do it now (you may need to install more packages,
depending on your system - I just needed `autopoint`):

{{% highlight bash %}}
	sudo apt-get install autopoint g++ make autoconf texinfo
{{% /highlight %}}

If you get errors for `autopoint`, that's what your missing. If you
get errors like this:

{{% highlight bash %}}
	makeinfo not found
{{% /highlight %}}

while building, you need to install the `texinfo` package.

### Build

I'm not a expert on building programs on the command-line in Linux.
So when the `./configure` command doesn't work what needs to be done?
(Don't type in the command below, it's just for reference).

{{% highlight bash %}}
	./configure
	bash: ./configure: No such file or directory
{{% /highlight %}}

It seems that there are several options, but based on the
[discussion here](https://github.com/emcrisostomo/fswatch/issues/58)
the best way to go about setting things up are simply to run the
supplied `autogen.sh` script.

{{% highlight bash %}}
	./autogen.sh
{{% /highlight %}}
Other options apparently are running the `autoconf` or `autoreconf`
commands in the source code directory, but the above seems to work
out of the box.


After that, you should be good to go with the standard build commands:

{{% highlight bash %}}
	./configure && make
{{% /highlight %}}

### Install
Since the install command copies the binaries to a directory a regular user
doesn't have permission to write to, you'll need `sudo` powers for this one:


{{% highlight bash %}}
	sudo make install
{{% /highlight %}}


Try to run the `fswatch` command now. If see the following error, there's an
[easy solution](https://github.com/emcrisostomo/fswatch/issues/48).


{{% highlight bash %}}
	fswatch
	fswatch: error while loading shared libraries: libfswatch.so.0: cannot open shared object file: No such file or directory
{{% /highlight %}}

Apparently,
it's because the build process doesn't run `ldconfig`, so you'll have to do that
manually as root.

{{% highlight shell %}}
	sudo ldconfig
{{% /highlight %}}

Whew, it's a bit of a pain, but `fswatch` should now work, so we can move
on to setting up the `Makefile`.

# Hot re-loading of Go code

This solution was created by [Oleg Lebedev from this post](https://medium.com/@olebedev/live-code-reloading-for-golang-web-projects-in-19-lines-8b2e8777b1ea).
It's reprinted here:

Just create a file called `Makefile` in your source directory. The contents of `Makefile` should be:

{{% highlight Makefile %}}
	PID      = /tmp/awesome-golang-project.pid
	GO_FILES = $(wildcard *.go)
	serve:
		@make restart
		@fswatch -o . | xargs -n1 -I{}  make restart || make kill
	kill:
		@kill `cat $(PID)` || true
	stuff:
		@echo "actually do nothing"
	restart:
		@make kill
		@make stuff
		@go run $(GO_FILES) & echo $$! > $(PID)

	.PHONY: serve restart kill stuff # let's go to reserve rules names
{{% /highlight %}}

Now, all you have to do to get hot reloading of code is run the following
command in your source directory.

{{% highlight bash %}}
	make serve
{{% /highlight %}}

This method seems to generate a lot of text output, so it may be useful to
silence the standard output, and just print errors. You can do
that by running this instead (if your not on Windows):

{{% highlight bash %}}
	make serve > /dev/null
{{% /highlight %}}

# Conclusion

That's it! A very concise, portable solution for hot reloading of [Go](//golang.org) code.
It may take a bit of initial setup, but once you have `fswatch` installed, it's all smooth
sailing.

Happy coding!

--Brad
