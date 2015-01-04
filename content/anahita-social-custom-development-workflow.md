---
title: "Anahita Social Custom Development Workflow"
description: "Ensure you get the latest code without overwriting custom core changes."
tags:
  - "php"
  - "anahita"
  - "git"
  - "workflow"
  - "composer"
date: "2014-07-14"
categories:
  - "anahita"
slug: "anahita-social-custom-development-workflow"
---

[Anahita](http://getanahita.com) is a cool open-source social networking platoform written in PHP. It has a super-active, helpful community lead by [Rastin Mehr](http://www.getanahita.com/people/rastin). 

If you're working on a website that's powered by Anahita, you'll want to keep up-to-date with the latest code changes via composer.

If you're not familiar with Composer, visit the [project homepage](//getcomposer.org) to get up to speed.

# Updating the Anahita Codebase

Updating the Anahita codebase is trivial with composer. Just `cd` into the root directory and run the following to get the latest and greatest:

```bash
composer update
```

Before you do that, though, read on.


# Avoid Overwriting Your Custom Changes

The only issue is that running composer update may obliterate any custom modifications you've made. The solution to that is simple, assuming you're using version control. We'll assume that you're using Git for this example.

*The principles here would apply with other version control systems, and even other projects, not just Anahita.*


## 1. Create a new Anahita source code branch
First step is to create a new branch. For the purposes of this we'll call it `anahita-master`. To create the branch and git into it, run:

```bash
$ git checkout -b anahita-master
```

Now go ahead and run the composer update command.

```bash
$ composer update
```

Once that's done, your `anahita-master` branch will have the lastest Anahita source code. Cool.

Now you'll need to add, commit, and push the changes:

```bash
$ git add -A
$ git commit -am "Updated Anahita source code."
$ git push
$ git push -u origin anahita-master
```

The Anahita core updates are now committed. Now on to the next step.

## 2. Merge the updates

Switch back to your development branch. We'll assume it's `develop` here for simplicity, but of course it's probably something else.

```bash
git checkout develop
git pull
git pull origin anahita-master
git push
```

If you've changed any of the files that we're also changed in the Anahita master branch it will likely result in a [merge commit](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging). (It may not, though, if you haven't changed any files that were changed in the Anahita master repo.)

Either way, you'll now be enjoying the benefits of the latest version of the Anahita source code while ensuring any custom changes didn't get lost.

Happy committing!

-- Brad

-----

*Want to learn more about Git workflows? The [Git workflow overview from Atlassian](https://www.atlassian.com/git/workflows#!workflow-feature-branch) is a great place to start.*

*Feel free to get in touch with feedback!*