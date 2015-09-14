/* eslint-disable no-var */

var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../app/data/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
