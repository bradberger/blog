## Building

There are six simple build steps, all bash scripts.
They should be run in this order, and the build process
should stop if any one in the chain returns failure.

1. `./01-install-go.bash`
2. `./02-install-hugo.bash`
3. `./03-install-npm.bash`
4. `./04-bower.bash`
5. `./05-build.bash`
6. `./06-publish.bash`

## Testing

Gulp and Hugo are needed. Run both at the same time
with `gulp` and `hugo --watch`, both from the root directory.