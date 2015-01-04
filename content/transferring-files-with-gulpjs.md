---
title: "Transferrring Files to Remote Servers with GulpJS"
description: "A secure method to automate file uploads."
tags:
  - "gulpjs"
  - "javascript"
  - "task-runner"
  - "needs-review"
  - "build"
date: "2014-06-29"
categories:
  - "javascript"
slug: "transferring-files-with-gulpjs"
---

On occasion, or perhaps even more frequently, you may want to use GulpJS in combination with a remote server. Watching local changes and uploading them is thankfully very easy.

We're going to focus on the most secure option - using SSH over FTP.

# Setup

Install `gulp-sftp` locally. It's as simple as: 

	npm install --save-dev gulp-sftp
    
After that, you can load it with a simple:

	var sftp = require("gulp-sftp");

# The Task
Here's a sample Gulp task to get us started. It compiles some imaginary LESS into CSS, and minifying it at the same time.

For the time being, we'll assume you're already familiar with the `less()` and `minifyCSS()` functions.

	gulp.task("admin-less", function() {
  		gulp.src(__dirname + "/src/admin/less/**/*.less")
      		.pipe(less())
      		.pipe(minifyCSS())
      		.pipe(rename("main.css"))
      		.pipe(gulp.dest(__dirname + "/dist/admin/css"))
      		.pipe(sftp(sftpOpts));
});

To make this work, you'll need to configure the sftpOpts variable.

# Configuration
Configuration is done by passing an object with a predefined set of keys to the `sftp()` function. Here are all the available options, copied over from the [gulp-sftp docs](https://www.npmjs.org/package/gulp-sftp)

## options.host

*Required
Type: String*

## options.port

*Type: Number, Default: 22*

## options.user

*Type: String
Default: 'anonymous'*

## options.pass

*Type: String, Default: null*

If this option is not set, gulp-sftp assumes the user is using private key authentication and will default to using keys at the following locations:

`~/.ssh/id_dsa` and `~/.ssh/id_rsa`

If you intend to use anonymous login, use the value '@anonymous'.

## options.remotePath

*Type: String, Default: '/'*

The remote path to upload too. This path should exist, though the child directories that house your files do not need to.

## options.key

*type String or Object Default: null*

A key file location. If an object, please use the format {location:'/path/to/file',passphrase:'secretphrase'}

## options.passphrase

*type String, Default: null*

A passphrase for secret key authentication. Leave blank if your key does not need a passphrase.

## options.keyContents

*type String, Default: null*

If you wish to pass the key directly through gulp, you can do so by setting it to options.keyContents.
## options.auth

*type String, Default: null*

An identifier to access authentication information from .ftppass see Authentication for more information.
## options.authFile

*type String, Default: .ftppass*

A path relative to the project root to a JSON formatted file containing auth information.


# Simplifying Configuration

It can be a pain to have to type that configuration for every Gulp task. One trick is to simplifiy it with a function that returns the values you want.

Here's a version of a function I'm currently using to do just that:

    function sftpOpts(path) {
        return {
            host: "my.remote.host.com",
            user: "remoteuser",
            remotePath: "/base/project/path/" + (path || "")
        };
    }
    
That makes it really easy to inject append/inject the a default configuration into the `sftp()` command:

      .pipe(sftp(sftpOpts("dist/css")));

Using this at the end of your task pipe would result in the file being uploaded to the `/base/project/path/dist/css` directory.

It's an easy way to keep your `gulpfile.js` nice and clean.

# Known Issues

There is a known issue with SSH connections unexpectedly ending under certain condidtions. Through experience, this seems to be direcly related to the size of the file.

Right now there doesn't seem to be a workaround for this. It shouldn't be a major issue unless working with very large files. I've only run into it so far when trying to bundle several libraries together - jQuery, AngularJS, Bootstrap, shims, and custom code. (Just jQuery/Angular/Bootstrap works, for instance).

# Conclusion

Hope that comes in hand! A big shout out to Matthew Drake, the plugin's author. 

Install it today and give it a try. Have any other ideas? Let me know!

--Brad
