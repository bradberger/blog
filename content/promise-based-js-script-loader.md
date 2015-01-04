---
title: "Promise-based JS Script Loader"
description: "Using ES6 promises to build an ultra-small script loader"
tags:
  - "javascript"
  - "promises"
  - "es6"
  - "script-loader"
date: "2014-07-14"
categories:
  - "javascript"
slug: "promise-based-js-script-loader"
---

If you're not familiar with JavaScript promises, you'll definitely want to check out [this article by Jake Archibald](http://www.html5rocks.com/en/tutorials/es6/promises/) to see why there the coolest thing since sliced bread.

We're going to see how we can take advantage of promises to build a script loader in just a few lines of code.

### The Basic Syntax of Promises

The result of any promise is accessed with the `then()` function. The first argument is the success callback, the second is the failure callback.

So assuming that `p` is the promise in this situation, using the result of `p` would look something like this:

```javascript
p.then(function(result) {
	alert("The promise succeeded: " + result);
}, function(err) {
	alert("The promise action failed: " + err);
});
```

The resolved value of a promise can be anything - strings, objects, other promises, etc.

# Promises can be chained

One cool feature of promises is that they can be chained together using the `Promise.all()` function. It takes an array of promises as an argument and returns a promise. It is resolved when all of the promises passed to it are resolved.

# Promises can be used even after resolved

Another neat feature of promises is that the result can be used even after resolution. So in the above example, we can wait `x` seconds and again call then `then()` method, and it will work.

```javascript
p.then(function(result) {
	alert("The promise succeeded: " + result);
}, function(err) {
	alert("The promise action failed: " + err);
});

setTimeout(function() { 
	p.then(function() { alert("Here I am again!"); });
}, 10000);
```

Even if `p` resolves before the 10 second timeout, the `then()` method still works as planned.

# Making a script loader

So given that, we can build a super simple promise based script loader with a very minimal amount of code. Here's an entire script loader.

<script src="https://gist.github.com/bradberger/9d3ba85c63c21b317f5d.js"></script>

It's actually quite feature rich, too. You can load multiple scripts and execute code when they're all loaded.

For example, say you needed AngularJS and jQuery to be loaded, and wanted to do that in an async manner.

You could do it like this:

```javascript
var s = script(["https://cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js", "https://cdn.jsdelivr.net/angularjs/1.2.20/angular.min.js"]);

s.then(function() {
   alert("jQuery and angular loaded!");
});

s.then(function() {
  // Do some more stuff depending on jQuery and Angular.
});

```

If you were building a library out of this, obviously it would need some polishing. Still, it's pretty cool. Compressed and gzipped it weighs in at 299 bytes. 

All  possible due to the power of promises.
