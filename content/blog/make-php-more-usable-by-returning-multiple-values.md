---
title: "Make PHP More Useable - Returning Multiple Values from Functions"
description: "Use Golang inspired pattern to easily return multiple values from PHP functions."
tags:
  - "php"
  - "golang"
  - "coding"
  - "functions"
  - "methods"
date: "2015-07-16"
categories:
  - "php"
slug: "php-return-multiple-values"
aliases:
 - "/php-return-multiple-values"
---

If you've ever used [Go](//golang.org) it's hard to not find
[returning multiple values](https://golang.org/doc/effective_go.html#multiple-returns) from
functions conspicuously absent in other languages. In this case, we'll look at a simple way
to implement the same design pattern effectively in PHP.

## Why It's Useful

So why return multiple values from a function anyway? If you've never used Golang or a similar
language which allows that, it may not be readily obvious. Most use-cases in Golang are centered
around errors, so it's very easy to check if a function encountered a error.

```go

func myFunction() (err error, result string) {

}

// Later on...
err, result := myFunction()
if err != nil {
    // Handle the error
}

```

That makes error checking handling very straight forward, without the use of a lot
of `try/catch` blocks.

## Returning Multiple Values in PHP

Thankfully, it's quite easily to accomplish that in PHP, too. The trick here is
using the `list()` construct of the PHP language.

So the previous example in PHP could be simply:

```php

function myFunction() {

    // Do something here, then return a result.
    $error = "Oh no, something went wrong!;
    $result = [];

    return [$error, $result];

}

list($error, $result) = myFunction();
if($error) {
    // Handle the error.
    echo sprintf("ERROR: %s", $error);
}

```

The design pattern in Golang is that the error variable is empty (or `nil`) if there
is no error. That makes sense, and it would be good to follow that pattern in PHP.
Error checking is then simple, since we can just check for the trueness of the `$error`
variable.

In Go, a non-nil `err` variable is actually a `struct`, but in the above PHP implementation
we can just return an error message in PHP to make it easy to figure out what went wrong.

The important thing is to make sure that the `$error` variable is something that evaluates
to false when there is no error - `false`, `null`, `0`, etc.


## Conclusion

While PHP is showing it's age (at least the current state of PHP), there are occasionally some
interesting ways to make it feel at least a bit fresher. Sometimes that involves borrowing
design patterns from other languages, in this case Golang.

Is this something you might use in your PHP design patterns? Have a better way of accomplishing
the same thing? Are there any pitfalls that have been overlooked? Let me know in the comments
below.
