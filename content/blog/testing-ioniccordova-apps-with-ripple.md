---
title: "Testing Ionic, Cordova, and PhoneGap Apps with Ripple"
description: "Test apps with native plugins without leaving your desktop browser."
tags:
  - "cordova"
  - "ionic"
  - "phonegap"
  - "apps"
  - "ripple"
  - "needs-review"
date: "2014-07-14"
categories:
  - "cordova"
slug: "testing-ionic-cordova-apps-with-ripple"
aliases:
 - "/improving-the-quality-assurance-process"
 - "/testing-ionic-cordova-apps-with-ripple"
---

There don't seem to be a lot of tutorials on how to set up and test [Ionic](//ionicframework.com), [PhoneGap](//phonegap.com), or [Cordova](//cordova.apache.org) apps with native plugins in the comfort of your browser. So we'll cover the steps necessary to get up and running here so, hopefully, you won't lose many hours trying to figure it out as I did.

We'll assume that you've already met these prerequisites:

1. Already have [NPM and NodeJS installed](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).
2. Already have [NPM cordova package installed](https://cordova.apache.org/docs/en/2.9.0/guide_cli_index.md.html).
3. Are using Linux or OSX. (Windows is currently not supported for this configuration).

# 1. Install Ripple

There's a [Ripple extension for Google Chrome](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en). It doesn't support the latest versions of PhoneGap. Don't use it.

Instead, install [the NPM version](https://www.npmjs.org/package/ripple-emulator). (It currently doesn't support Windows.)

*Make sure you don't confuse it with the `ripple` NPM package. They're completely different.*

The install is very simple. Just run:

    sudo npm install -g ripple-emulator

# 2. Preparing/Building the Project

> Note: We'll assume you're using Android as your platform. If not, substitue `android` in the examples with the platform of your choice, like `ios`, `firefoxos`, etc.

Next, you'll need to prepare the static files. Make sure your in the project directory first. Then run:

    cordova prepare android

# 3. Serving the Files

Now that the files for your platform have been prepared, you can start the emulator. That's done by running:

     ripple emulate

in the app's base directory.

The ripple emulator will open a browser window, but there's a good chance the link won't be correct. This seems to be a bug. You may see a message like `Cannot GET /` in the mobile device window.

If you have that kind of issue, you'll need to manually navigate to the proper URL for your platform. In the case of `android` it's:

http://localhost:4400/platforms/android/assets/www/index.html?enableripple=cordova-3.0.0

Change the port and server to the one you selected when running the `ripple emulate` command if you're using non-standard options.

You should see a screen similar to this when opening up the link:

{<1>}![Screenshot](http://i.imgur.com/u6uoT9al.jpg)

*For some unknow reason, Chrome seems to work better than Firefox at the moment. Take that with a grain of salt, though.*

# 4. Watch Project Files

> Note: We'll use [GulpJS](//gulpjs.org) in this example. You could use any kind of file watcher, like [GruntJS](http://gruntjs.com/), etc., if preferred. The idea would be the same.

When project files change, the `cordova prepare` command needs to be run again. A simple way to do that is to set up a GruntJS task.

> Note: You'll need to tweak the following file paths to match the location of the files in your project. The locations below may not match your projects needs.

> Your `gulpfile.js` needs to be in the base directory of your Cordova/PhoneGap project.

Now, in your `gulpfile.js` create a new task. We'll name it `cordova-prepare` and `cordova-watch` in this example. Name it what you want.

    var exec = require("child_process").exec;

    gulp.task("cordova-prepare", function() {
       exec("cordova prepare");
    });

    gulp.task("cordova-watch", function() {
    gulp.watch([
        __dirname + "/www/**/*.html",
        __dirname + "/www/**/*.css",
        __dirname + "/www/**/*.js"
    ], ["cordova-prepare"]);
});

This GulpJS setup watches all the HTML, CSS, and JavaScript files in your project directory and automatically recompiles them for use in the ripple emulator.

You may find that you need to watch more or less files according to your needs.

# Using the Ripple Emulator Proxy

Serving the static files over the network is possible with the `ripple emulate --remote` command.

The first step is to set up a static file server to serve the content of your `platforms/android/assets/www` directory. You could use any file server for that purpose - Apache, Nginx, a GulpJS static file server (with livereload it's even better), etc.

Once the static file server is up and running, just replace the `ripple emulate` command you ran earlier with `ripple emulate --remote http://yourserver/path/to/files`.

The ripple emulator will fetch the files from the remove location via proxy and serve them up as if they were on your local machine.

# Conclusion

Whew! That was a bit of work, but you should now be able to test native app functions, like camera, geolocation, and more in your browser without the need for an emulator or a physical device.

Now let's go make something awesome!

--Brad
