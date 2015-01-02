---
title: "Using Symfony Console with Silex"
description: "Integrating console tools into your Silex project."
tags:
  - "php"
  - "needs-review"
  - "silex"
  - "symfony"
  - "cli"
  - "console"
date: "2014-07-01"
categories:
  - "cordova"
slug: "using-symfony-console-with-silex"
---

The [Symonfy console component](http://symfony.com/doc/current/components/console/introduction.html) is a powerful, effective way to define and organize you're project's command line PHP scripts.

Thankfully it's quite easy to get it up and running.


## Installing the Provider

It's easy to install and register the console provider using the `knplabs/console-service-provider` package. Just this to your `composer.json` file:
	
    "require": {
    	"knplabs/console-service-provider": "dev-master"
    }
    
You can register the provider with the following lines of code. Obviously, you'll need to update the `console.name`, `console.version`, and `console.project_director` to match the appropriate values.

    $app->register(
        new ConsoleServiceProvider(),
        array(
            'console.name' => 'MyConsoleApp',
        	'console.version' => '0.1.0',
        	'console.project_directory' => __DIR__ . "/.."
        )
    );
    
You can use anything you want for the name and the version.

The `console.project_directory` seems to require the `"/.."` after the directory. (If you know why, let me know.)

Once that's done, and you've run `composer update` you'll have access to the console object in the `$app["console"]` variable.

## Creating a Command

> *Note* - Since Silex uses Symonfy under the hood, you can refer to the [Symfony Console Component docs](http://symfony.com/doc/current/components/console/introduction.html). The docs are great, and include sections on formatting and testing the commands, so be sure to read them thoroughly, as we won't reproduce them here.
		
The `knplabs/console-service-provider` extends the Symfony console a bit, most importantly providing:

- The `getSilexApplication()` method, which returns an instance of your `$app`.

Keep that in mind later on.

### Sample Command 

You're command must extend `Knp\Command\Command`, so define it with:

	class MyCommand extends Knp\Command\Command
    
You'll need to override two main methods, `configure()` and `execute()`.

As you may imagine, `configure()` is like a `__construct()` command, and `execute()` is like `main()` in other languages - it defines you're command's run-time behaviour.

A complete sample command might look like:

		class \MyCmd extends \Knp\Command\Command {
        	protected function configure() {
            	$this
                  ->setName("testcmd")
                  ->setDescription("A test command!")
            }
            protected function execute(InputInterface $input, OutputInterface $output) {
            	$output->writeln("It works!");
            }
        }
		        

### The `configure()` Method

> *Note* - For the sake of brevity, refer to the [Symfony docs here](http://symfony.com/doc/current/components/console/introduction.html#creating-a-basic-command) for more details.

The `configure()` method sets up the arguments and options of the command.

See the skeleton example above.



### The `execute()` Method


> *Note* - Refer to the [Symfony docs here](http://symfony.com/doc/current/components/console/introduction.html#creating-a-basic-command) for more details.

The `execute()` method receives two arguments, a `Symfony\Component\Console\Input\InputInterface` instance, and a `Symfony\Component\Console\Output\OutputInterface` instance. You'll use those for getting command input and printing to the console, respectively.

So a simple `excute()` method is defined as:

        protected function execute(InputInterface $input, OutputInterface $output) {
        	// Your logic here.
        }
        


#### Outputting Text

> *Note* There are some great [formatters available](http://symfony.com/doc/current/components/console/helpers/formatterhelper.html) so read up on those if you want to make the console output a bit fancier.

Instead of `echo()` or `print()` you'll use `$output->writeln()` to print lines of text.


### Adding the command to your `app/console` file.

Following Symfony/Silex patterns, we'll assume you're using a `app/console` file for the actual command-line command.

The file itself is quite simple:

    #!/usr/bin/env php
    <?php

    set_time_limit(0);

    $app = require_once dirname(__DIR__) ."/bootstrap.php";

    $console = &$app["console"];
    $console->add(new \Path\To\MyCommand());
    $console->run();

For each command you created, you'll currently need to add it manaully to the console object, hence the line:

    $console->add(new \Path\To\MyCommand());

Replace `\Path\To\MyCommand` with your command, including it's namespace.

### Running the Command

That's it! You should have a working command.

> Note: For more details about options and arguments, refer to the Symfony docs above.

You can run it with the name you previously would have set up in your command's `configure()` method. So if you set the name there as...

	$this->setName("testcmd")
    // Other code...
    
... you can now run the command as:

	app/console testcmd
    
Make sure you replace `app/console` with the actual path to the `app/console` file itself, whatever you may have named it!


### Conclusion

Adding a console to your Silex app is easy, and adds testability, code organization, and professionalism to your project.

Now go forth and get rid of all those orphaned PHP files and shell scripts!

-- Brad




