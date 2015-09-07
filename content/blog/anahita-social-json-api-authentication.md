---
title: "Anahita Social HTTP Authentication"
description: "Integrating HTTP Authentication into Anahita social core"
tags:
  - "php"
  - "needs-review"
  - "anahita"
  - "integration"
  - "http"
  - "authentication"
date: "2014-07-14"
categories:
  - "anahita"
slug: "anahita-social-json-api-authentication"
aliases:
 - "/an-intro-post"
---

Here's how to solve another potentially tricky challenge when developing third-party integrations with the [Anahita social networking platform](http://getanahita.com).

The current version of Anahita (3.0.x) uses Joomla and the Nooku framework to provide an out-of-the-box JSON api. It's cool and it seems to work well.

One neat (but hidden) feature is that it supports standard HTTP authentication.

That's super, as there's no need to worry about using cookies for authentication, allowing for more or a classic stateless REST experience.

So what needs to be hacked? Read on.

# The HTTP Auth Header

The HTTP authentication header required [is standard](https://en.wikipedia.org/wiki/Basic_access_authentication). So that means you need to send a header with your API request that looks like this:

```
Authorization: Basic <encoded-username:encoded-password>
```

The part after the `Basic` keyword is a RFC2045-MIME variant of Base64 encoded username/password combination. So if the username was "user" and password "password" you'd send the header like this:

```
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

That can be done via PHP, too, like so:
```php
header('Authorization: Basic dXNlcjpwYXNzd29yZA==')
```

The other option, while not necessarily recommended, is sending the authentication directly via the url:

```
http://user:password@my.anahita.site/
```

All the above methods will work, so pick the that's appropriate for your needs.


##Compatibility Hacks

## Teaching Anahita to check the HTTP Authentication

Out of the box, Anahita doesn't check the HTTP authentication headers unless the request is specifically formed with the `Accept: application/json` header. We'll change that now.

Open up the `www/plugins/system/anahita.php` file in your editor. Look for the like that looks like the following (it may be on only one line):

```php
if ( KRequest::has('server.PHP_AUTH_USER')
	&& KRequest::has('server.PHP_AUTH_PW')
    && KRequest::format() == 'json'
) {
```

Simply remove the `&& KRequest::format() == 'json'` text, resulting in:

```php
if ( KRequest::has('server.PHP_AUTH_USER')
	&& KRequest::has('server.PHP_AUTH_PW')
    && KRequest::format() == 'json'
) {
```

If you want, you can just replace the entire file with [this gist](https://gist.github.com/bradberger/72be65348504363e9dd7) which is up-to-date as of Anahita 3.0.3.

## Adding `WWW-Authenticate` headers

By itself, it works. Some third-party libraries require the `WWW-Authenticate: Basic` header to be sent, though, when the client is not authenicated.

> This hack will only apply when accessing the JSON api, so regular browser requests will not be affected.

Neither Anahita nor Nooku have this built in, so you have have to add it manually. Don't worry, it's super simple.

The key code that needs to be added in is:

```
if (strstr($authorization, "Basic")) {
    $parts = explode(':', base64_decode(substr($authorization, 6)));
    if (count($parts) > 1) {
        KRequest::set('server.PHP_AUTH_USER', $parts[0]);
        KRequest::set(
            'server.PHP_AUTH_PW',
            join("", array_slice($parts, 1))
        );
    }
} else {
    header('WWW-Authenticate: Basic realm="Anahita"');
}
```

You can simple replace the `/vendor/anahita/anahita/vendor/nooku/libraries/koowa/request/request.php` with [this version in a Gist](https://gist.github.com/bradberger/74207eb7c1c109f51530).

The `realm="Anahita"` can be adjusted. Replace `Anahita` with whatever realm name you want. [It's used only by clients](https://www.httpwatch.com/httpgallery/authentication/), so set it as you see fit.

The other slight modification adds compatibility for passwords that contain the `:` character, as the Nooku implementation of the parsing of the base64 encoded username/password pair would not support that.

# Security

As you already are aware, the base64 encoding is just that - encoding and not encryption. So make sure you send all requests via SSL so as to not expose the username/password.


# Conclusion

So there you have it! With a simple adjustment, your Anahita install now is a lot more compatible with standard code.

I'm using it for the [AngularJS HTTP Auth Interceptor module](https://github.com/witoldsz/angular-http-auth) (demo [here](https://witoldsz.github.io/angular-http-auth/)). How do you plan to use it? Does it work for you? Let me know!

Happy coding!

-- Brad
