A list of ideas for future posts, so I don't forget:

- [ ] Mailgun/Gmail setup for free, production quality email
- [ ] ActiveMQ/CentOS 7 installation and setup guide
- [ ] INARA donations backend post
- [ ] Using PHP associative arrays selectively
- [ ] Automatically Deploying a Website to Google Cloud Storage via SemaphoreCI

## Mailgun/Gmail Setup

More details here later on...

-----

## Using PHP Associative Arrays Selectively

### What Associative Arrays Excel At
- The are good for making a "map" of variables and finding those variables quickly.

### Where Classes Are A Better Choice Than Arrays
- For example, pull from usage of maps in Go
- The are not good for sets of data which have a specific format - like models, etc.
- Use objects instead: more consistency, better error checking, chance to set default values and better IDE support. 

-----

## Automatically Deploying a Website to Google Cloud Storage via SemaphoreCI

### Configuration Files

- Sign in to gsutil on your local machine.
- Copy your ~/.boto file and add as a environment file (encrypt it, if you'd like!)

### Deploy Commands

```bash
curl -0 https://storage.googleapis.com/pub/gsutil.tar.gz | tar xz -C $HOME
export PATH=${PATH}:$HOME/gsutil
gsutil rsync -C -U -dr website gs://website.tld
gsutil -m acl ch -r -u AllUsers:R gs://website.tld
gsutil web set -m index.html -e 404.html gs://website.tld
```
