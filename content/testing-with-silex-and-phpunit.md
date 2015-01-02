---
title: "Testing with Silex and PHPUnit"
description: "Getting started with unit testing using PHPUnit in your Silex project."
tags:
  - "php"
  - "silex"
  - "symfony"
  - "unit-testing"
  - "app"
  - "bootstrappting"
  - "missing-docs"
date: "2014-06-30"
categories:
  - "silex"
  - "php"
slug: "testing-with-silex-and-phpunit"
---

This took a bit to figure out, so I'm posting it here in hopes it may be helpful.

I use [the Silex microframework](http://silex.sensiolabs.org/) a lot, and love it. Setting up testing, though, can be a bit tricky if you don't know what to look for.

First off, the [docs on the Silex site](http://silex.sensiolabs.org/doc/testing.html) are great. They will definitely get you started, but they seem to be missing a couple of critical explanations that may trip you up.

After reading them over, make note of these two items that are critical.

### The `app.php` file

The docs indicate you should include an `app.php` file. This is not your `index.php` file. This `app.php` file must set up the app and then return it.

So if you were using a file like `bootstrap.php` to set up the app, a sample `app.php` file might look like:

    <?php
    require __DIR__ . "/bootstrap.php";
    return $app;

If the `app.php` file doesn't `return $app` you'll get nowhere fast.

If you're using varioius test files across multiple directories (you probably are) a simple way to include the `app.php` file without knowing exactly where it is can be a recursive lookup.

		public function createApplication()
    	{
          $dir = __DIR__;
          $appFile = $dir . "/app.php";
          while(! file_exists($appFile)) {
              $dir = dirname($dir);
              $appFile = $dir . "/app.php";
          }
          // Other code here...
	    }

That solves the problem of always having to hard-code in the location of your `app.php` file. It's certainly not necessary, but it might help.

### Using Your Own `setUp()` Method

Very likely you'll use your own `setUp()` method in the test. Problem is that `Silex\WebTestCase` also uses it, so make sure that you call the parent `setUp()` first.

    public function setUp() {
        parent::setUp();
        // Add your code here...
    }
    
Otherwise you may see errors similar to:

    Argument 1 passed to Symfony\Component\HttpKernel\Client::__construct() must implement interface Symfony\Component\HttpKernel\HttpKernelInterface, null given,
    
That's because `setUp()` calls `createApplication()` which returns `$app` and sets it into `$this->app`. So if the parent `setUp()` is never called things break in a hurry.


### Conclusion

Hopefully this saves you a bit of trouble. It took a while to figure this out. I've filed a [issue on GitHub](https://github.com/silexphp/Silex/issues/974), so let's hope we can make the docs a bit more clear.

Have fun testing!


--Brad

