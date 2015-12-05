# Engage - Based on Relay

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
