---
title: "Time Tracking with Google Analytics"
description: "Todo"
tags:
  - "workflow"
  - "time-tracking"
  - "google-analytics"
  - "piwik"
date: "2014-08-12"
draft: true
categories:
  - "workflow"
slug: "time-tracking-with-google-analytics"
---

> *Note - This post specifically mentions Google Analytics, but the principles would apply equally to any analytics software, like [Piwik](//piwik.org), for example.*

Time tracking is a pain. There are apps and services that can help. Nonetheless, it's not the easiest thing to do.

One solution I stumbled across lately is Google Analytics. It requires almost no effort and is quite accurate.

# How to Use Google Analytics for Time Tracking

Simple insert the tracker into all pages and repositories/issue trackers you use. Let GA do the rest.

The GA interface makes it easy to run custom reports to pinpoint specific locations and time periods. You'll get detailed information about number of sessions, average session duration, and a whole lot more. It's more than enough information to use for client billing or personal enlightenment.

# Setting It Up

> *Hint - Don't forget to turn off any ad blockers which might effect the tracker code from being included while you're active on the site.*

Adding the tracker to your code isn't difficult. Chances are you're already doing that, so we'll skip it here.

If you're using Bitbucket, go to the settings part of your repository and add the GA tracker ID there. It's super simple.

If you're using [GitHub](//github.com), you can use the [Google Analytics Beacon](https://github.com/igrigorik/ga-beacon) by [Ilja Grigorik](https://www.igvita.com/)

Most other project management tools will allow for something similar, too. [JIRA does](https://developer.atlassian.com/display/JIRADEV/Adding+JavaScript+to+all+pages+for+Google+Analytics), and it seems likely that many others do as well. (Do you know of any examples? Let me know.)

# When It Probably Won't Work

It's not a perfect solution. There are a few reasons it might not be the right fit.

1. You live in a big city. There may be many false positives.
2. The site is live and it's not yours. You may not have access to the GA data.
3. The site is very active. More visitors may make it hard to get an accurate picture.
4. You travel a lot. That makes it hard to tell where you where to get accurate information.


# Conclusion

When the conditions are right, Google Analytics makes for an awesome time tracker. Since I live and work in Macedonia (read: no false positives) and rely heavily on Bitbucket for project management, for me it's often a perfect solution.

Does it work for you? Do you have any other simple, effective ways you track project time? Let me know!

Happy time tracking!

-- Brad