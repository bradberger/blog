---
title: "Exclude Files from Ionic Framework Build"
description: "Reduce package file site by excluding un-needed files"
tags:
  - "ionic"
  - "cordova"
  - "phonegap"
  - "needs-review"
  - "ignore"
  - "building"
date: "2012-01-01"
categories:
  - "cordova"
slug: "exclude-files-from-ionic-framework-build"
aliases:
 - "/exclude-files-from-ionic-framework-build"
---

When building and running apps using the [Ionic Framework](http://ionicframework.com), it's often very helpful to exclude certain sets of files.

For me, that issue was critical to fix because including a `node_modules` directory in the build resulted build errors.

Of course, it's also super useful to keep the app size the smallest possible, too. Exlcluding files allows you to control completely what gets in the resulting `.apk` file.

Thankfully, the process is quite simple. So here goes.

# Excluding Files Via the  `project.properties` File

So far, it seems the best place to make this happen is the `platforms/android/project.properties` file. That file should be checked into version control, so it's a perfect place to set up the exclude filters. If you set them up in other places, it's more likely they'll get lost or overwritten over the course of time.

The key to use is `aapt.ignore.assets`. The default value is :

```
aapt.ignore.assets=!.svn:!.git:.*:<dir>_*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~
```

Each filter is separated with the `:` character, and you can add as many as needed.

For my particular use case, I added the `node_modules` folder like this:

	aapt.ignore.assets=!.svn:!.git:.*:<dir>_*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~:!node_modules


# Conclusion

That's it! It's pretty straight forward. Taking advantage of this option will allow you to reduce the APK size and avoid errors that come up under certain situations.

Have a better way? Feel free to share it in the comments below.

Happy building!
--B
