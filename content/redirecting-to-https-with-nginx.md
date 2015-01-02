---
title: "Redirecting to HTTPS with Nginx and Apache"
description: "Ensure communications are secure by redirecting all traffic to https."
tags:
  - "ngninx"
  - "apache"
  - "redirect"
date: "2014-12-14"
categories:
  - "server"
slug: "redirecting-to-https-with-nginx"
---

Secure, encrypted communications are more important now than ever before. As a result, it's not uncommon to want to force all website traffic to be sent over an ssl connection.

How can this be accomplished?

## Nginx Configuration

This one a bit more difficult to track down, as there seem to be a lot of ideas out there.

Here's what I found works. Obviously, substitute your domain name in the example below. This is the snippet that is currently running on this blog.

```
if ($server_port = 80) {
  rewrite  ^/(.*)$  https://bradb.net/$1 permanent;
}
```

There may be other ways to do it, but this works when you're using a combined server block for both `http` and `https` traffic.

If using separate blocks, it's even easier:

```
server {
    listen 80;
    server_name bradb.net;
    rewrite ^ https://$server_name$request_uri?  permanent;
}
```

## Apache

### Via .htaccess

To set up the redirect via a `.htaccess` file, the example below assumes you're using virtual hosts:

```
<VirtualHost *:80>
   ServerName bradb.net
   Redirect permanent / https://bradb.net/
</VirtualHost>
```

This is a very simple way to handle the redirect, and doesn't even require a `DocumentRoot` at all.

## CloudFlare/Proxy Notes

If you're using CloudFlare or any other kind of proxy service, note that the above examples will work only if the proxy server is capable of making the requests via https. 

For CloudFlare in particular, this means making sure the SSL setting is "Full SSL" or "Full SSL (Strict)". Using the "Flexible SSL" setting will result in endless redirects.

## Conclusion

As mentioned at the outset, securing web traffic is important. It's neither difficult nor expensive. If you aren't using https for all your web traffic, consider making the switch. 

The resource usage overhead isn't significant, but the payoffs are significant. As of August, 2014, Google is even [using the presence or absence of https as a page ranking signal](http://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).

If you've already turned on SSL, why not make the switch to securing all traffic by default?
