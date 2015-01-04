---
title: "Ignoring Symlinks in Git Repos"
description: "Keeping unwanted symlinks out of your repositories."
tags:
  - "git"
  - "version-control"
  - "vcs"
  - "symlinks"
date: "2014-09-30"
categories:
  - "git"
slug: "ignoring-symlinks-in-git-repos"
---

While working on a project that does a lot of symlinking by default, the need to keep symlinks out of the Git repository became evident.

Fortunately, it's not too hard. The solution [came from this post's answers](http://magento.stackexchange.com/questions/4641/how-to-git-ignore-symlinks-on-a-magento-module-installed-by-composer?stw=2). Thanks guys!

# The Command

Just run the following command from the base directory of your Git repository, and it will automagically add all the symlinked files to the base `.gitignore` file.

```bash
for f in $(git status --porcelain | grep '^??' | sed 's/^?? //'); do
    test -L "$f" && echo $f >> .gitignore;
    test -d "$f" && echo $f\* >> .gitignore;
done
```

# Conclusion

As noted over on StackExchange, you can run this command whenever the symlinked files change, or as often as you need:

> "This method only adds untracked symlinks so can be repeated without adding duplicate entries, symlinks that are in submodules or are otherwise already ignored, or intentionally tracked symlinks".

Hope it helps! A big thanks to [@VinaiKopp](https://twitter.com/VinaiKopp) and [@colinmollenhour](https://twitter.com/colinmollenhour) for providing the solution!

