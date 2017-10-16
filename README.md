# Engage - Based on Relay

[![Greenkeeper badge](https://badges.greenkeeper.io/alexandrethsilva/ngg.svg?token=84ffd9dd7534d741891343233286d5d14c40f769af91e710d1c53c3c15bab03b&ts=1508159652384)](https://greenkeeper.io/)

## Installation

``` shell
npm install
```

## Running

Start a local server:

``` shell
npm start
```

## Developing

Any changes you make to files in the `scripts/` directory will cause the
server to automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

``` shell
npm run clear-schema
npm run update-schema
npm start
```

For re-pushing data into Neo

``` shell
npm run load-fixtures
```
