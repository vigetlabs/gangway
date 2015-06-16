# Contributing

Thanks you for considering a contribution to this project!

## Setting up the project

Gangway is built using tools written for
[nodejs](http://nodejs.org). We recommend installing Node with
[nvm](https://github.com/creationix/nvm).

At the time of writing, Gangway is built (and tested) with Node
0.12.0.

Dependencies are managed with an [`npm`](npmjs.org) `package.json`
file. You can install dependencies with:

```bash
npm install
```

## Testing

Gangway uses [Karma](karma-runner.github.io). You can run tests
with:

```bash
npm test
```

## Publishing to NPM

This project publishes to npm using:

```shell
npm run release
```

This will run a shell script found at `./scripts/release`. It is
critically important not to simply run `npm publish`. The release
script sets up an expected structure for hosting on `npm`.

## Conventions

### Javascript

Gangway uses ES6 Javascript (compiled using [Babel](babeljs.io)). As
for style, shoot for:

- No semicolons
- Commas last,
- 2 spaces for indentation (no tabs)
- Prefer ' over "
- 80 character line length

### Language Conventions

**Add for each language used**

### Reviews

All changes should be submitted through pull request. Ideally, at
least two :+1:s should be given before a pull request is merge.
