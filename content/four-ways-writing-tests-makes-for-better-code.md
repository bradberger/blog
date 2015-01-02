---
title: "Four Ways Writing Tests Makes for Better Code"
description: "Why testing during development is essential for long-term success."
tags:
  - "qa"
  - "quality"
date: "2014-07-08"
categories:
  - "testing"
slug: "four-ways-writing-tests-makes-for-better-code"
---

Unit and functional testing is essential for the long-term success of a project. There are a lot of reasons why writing and running tests will greatly increase code quality.

Here's yet a few more. Four to be precise.


## 1. Tests Make for Purposeful Code

Generally speaking, a single test should only have one assertion. Each function or method should only have one test. Naturally, then, each method or function needs to be written to do one thing and one thing only.

To write clean, readable code, no method should try to do more than one thing. If it does, it's time for a refactor. My personal observation is that most method are unlikely to need more than 20 [NCLOC](http://acronymsandslang.com/definition/151020/NCLOC-meaning.html) (non-comment lines of code). Anything more than that makes a function or method a prime canidate for refectoring. Long methods simply too hard to test.

Writing tests early on in any project is therefore a strong encouragement to keep each method concise and purposeful.

## 2. Tests Enhance Code Reusability

It's also very difficult to write tests if code does not control dependencies well. [Dependency injection](http://martinfowler.com/articles/injection.html), or DI, is another essential part of writing testable code. Just like forcing methods to be purpose built, writing tests essentially forces writing of DI code.

There are [significant benefits to DI code](https://en.wikipedia.org/wiki/Dependency_injection#Advantages) that far outweigh any additional effort required to write it. All quality modern code and frameworks use it. Our projects should use it, too. Testing essentially forces that to happen.

## 3. Tests Make Code More Understandable

Reading code written by others (or even ourselves after some time has passed) can be challenging. Even reading well-written API docs is difficult. Often, it's clear the functionality you need is there, but how to put it all together can sometimes be unclear. Tests help here, too.

A quick way to peak into how a class, function, or method is implemented in the wild is to look at the tests. Generally, code within the test itself includes all the steps to bootstrap the code, and little else. That makes it a perfect way to see a clear, consisce, practical implementation of the method or function. There's usually nothing extra included in a test to distract from the basics of using the method. Hence, it's a perfect way to start figuring out how the method works, and how to implement it yourself.

## 4. Tests Make Refactoring Easier

Refactoring code always means something can - and probably will - go wrong. Things break while refactoring. Tests help in this regard.

Without tests, refactoring can be daunting. Did something break? It's hard to tell. Manually testing often does not reveal all the potential problems. 

Carefully written tests, though, often check for problem areas and give clear, nearly instant feedback on a refactor. Did it work? Is something broken? It's a lot easier to tell just by running the test suite again.


### Conclusion


#### If You Write Code
If you write code, but not tests, take a minute to consider all the advantages. The points above are only a few of the many reasons to write tests. 

Writing tests will make your code simpler, more robust, and more reliable. In the end, tests will probably save you a significant amount of time and stress.

#### If You Don't Write Code
Don't write code? Making sure any project is delivered with tests in place goes a long way towards avoiding [technical debt](https://en.wikipedia.org/wiki/Technical_debt) and ensuring higher quality result. Make sure the developer(s) write and use tests.

Automated testing will make your life a whole lot easier. If you're using it already, continue! If not, why not consider starting today?

Happy testing!

--Brad


