# Changelog

## 1.0.0

- `headers`, `query`, `body`, and `params` options are now merged
  together.

## 0.13.0

- Internal change to eliminate the dependency of `Function.prototype.bind`.

## 0.12.0

- Add `onError` preprocessor option

## 0.11.0

- Use `body` option for request body, not `params`

## 0.10.0

- `mock` can now be a function

## 0.9.0

- Individual routes now contain configuration settings under `config`,
  similar to API.config.

## 0.8.0

- Path template parsing now uses same logic as Hapi (sans wildcard routes)

## 0.7.0

### Breaking Changes

- Optional path parameters were improperly implemented with `*`. This is been corrected to `?`. For example: `users/{id*}` is now `users/{id?`.

## 0.6.0

### New Features

- Added `beforeSend` option

### Bug Fixes

- Properly set the configuration layering order to `route`, `api`, then `request`

## 0.5.0

### New Features

- Added optional parameters. For example: '/users/{id*}'

## 0.4.0

### Breaking Changes

- `params` option no longer represents body, however defaults to it

## 0.3.0

### Breaking Changes

- Renamed `body` option to `params`

## 0.2.0

### New Features

- added onResponse configuration setting to parse results

## 0.1.0

### New Features

- Added parameter injection to urls similar to how Hapi matches routes
- Added Promise library that includes nodeify
