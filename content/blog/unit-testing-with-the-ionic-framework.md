---
title: "Writing Your First Unit Test with the Ionic Framework"
description: "A quick primer to get started with hybrid app unit testing."
tags:
  - "unit-testing"
  - "ionic"
  - "cordova"
  - "angular"
  - "rafprovider"
  - "ngMock"
  - "$scope"
date: "2014-07-18"
categories:
  - "cordova"
slug: "unit-testing-with-the-ionic-framework"
aliases:
 - "/unit-testing-with-the-ionic-framework"
---

Writing tests - both unit and functional tests, is key to the stability and maintainablity of any piece of software. HTML and JavaScript apps are no different. So we'll cover a super basic overview of writing your first unit test for apps build with the [Ionic Framework](http://ionicframework.com).

While Ionic is a pretty cool framework, unit testing is mysteriously lacking as of the current release (1.0.0). Let's hope that it starts shipping with skeleton tests out of the box. In the meantime, this post should help get you up to speed.

We'll assume you're already familiar with the [Karma](//karma-runner.github.io/) test workflow, and writing tests with [Jasmine](//jasmine.github.io/), too. So we'll skip over setting that up. Instead, we'll focus specifially on setting up the first test of any given `$scope`.

We'll also assume your handly with [NPM](//www.npmjs.org/) and [Bower](//bower.io), too.

# Required Includes

You'll need at least one AngularJS library which isn't packaged with Ionic: the `angular-mocks` library. Go ahead and install it via [Bower](//bower.io).

Keep in mind, though, that the `angular-mocks` library is prone to errors if it's version isn't the same as all the other `angular` components you're using. Error messages like the following when trying to run the unit tests are likely caused by the version mismatch:

```
Failed to instantiate module ngMock... Unknown provider: $$rAFProvider
```

To get around that, you'll need to install the `angular-mock` version at the same version of the currently existing `angular` packages.

## Replacing `ionic.bundle.js`

Better yet, avoid using the packaged Ionic  bundles - the `ionic.bundle.js` and `ionic.bundle.min.js` files.

Make sure you have the following files. Replace the `<lib>` with your `bower_components` install directory.

```
<lib>/angular/angular.js,
<lib>/angular-animate/angular-animate.js,
<lib>/angular-cookies/angular-cookies.js,
<lib>/angular-mocks/angular-mocks.js,
<lib>/angular-sanitize/angular-sanitize.min.js,
<lib>/angular-routes/angular-route.min.js,
<lib>/angular-touch/angular-touch.min.js,
<lib>/angular-ui-router/release/angular-ui-router.js
<lib>/ionic/release/js/ionic.js
<lib>/ionic/release/js/ionic-angular.min.js
```

These should be set up in the JavaScript files passed to Karma when starting the test.

As of time of writing, Angular 1.2.20 was working well with Ionic 1.0.0. So if you were using those versions, your `bower.json` file might look like:

```json
{
    "dependencies": {
        "angular": "~1.2.20",
        "angular-touch": "~1.2.20",
        "angular-animate": "~1.2.20",
        "angular-sanitize": "~1.2.20",
        "angular-mocks": "~1.2.20",
        "angular-ui-router": "*",
        "angular-cookies": "~1.2.20",
        "ionic": "~1.0.0"
    }
}
```

Once you lock down the Bower dependencies, make sure you run a `bower update` to fetch and install the latest versions.

# Setting Up Your First `$scope` Test

After getting everything set up, we're on to writing the first unit test.

> Note: The same principles would apply equally to testing services, factories, etc. We'll cover the basic setup for those in a separate post.

Here's a complete sample file for the first spec test of a controller.

This example assumes that your app is using the name `app`. Replace the "app" in the `module("app")` line with the appropriate name of your app, as defined in your first `app.module("name", [...])` code, usually in `app.js`.

Also pay special attention to the `ctrl = $controller("NameOfYourController", {` line. Make sure to replace that with the name of the controller you want to test.

```javascript
describe("Unit Testing Examples", function () {

    var $scope, ctrl, $timeout;

    beforeEach(function () {

        module("app");

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function ($rootScope, $controller, $q, _$timeout_) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();

            // assign $timeout to a scoped variable so we can use
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller("NameOfYourController", {
                $scope: $scope
            });
        });

    });


    // Test 1: The simplest of the simple.
    // here we're going to make sure the $scope variable
    // exists evaluated.
    it("should have a $scope variable", function() {
        expect($scope).toBeDefined();
    });

});

```

If the above steps worked, you should have a great template to use to set up unit tests for all of your controllers. Just don't forget to replace the controlller names in each new file.

## Ensure You Have the Correct `$scope` Variable

To make the above test a bit more practical, choose anything attached to your `$scope` - a variable, a function, etc., and add it on to the `expect($scope)` line above. For example, if you used a `$scope.init` function, change `expect($scope).toBeDefined()` to `expect($scope.init).toBeDefined()`. That should ensure the test is working, and the `$scope` variable is not the one init'd at the top of the test with the `var` keyword.

# Conclusion

There's very little documentation about unit testing with Ionic, so hopefully this will help get you up to speed. If you're not familiar with writing test with Karma and Jasmine, be sure to read up on them first so you'll understand what's going on here.

As always, leave a comment if you have any suggestions in the comments below. Feel free to point out any mistakes or better ways of doing things.

Happy testing!

-- Brad
