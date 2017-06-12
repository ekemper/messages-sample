import '../imports/startup/accounts-config.js';
import './ui/body.js';
import './routes.js';
// Import Tether.js - Bootstrap tooltip requires Tether.
// We also add 'global.Tether' as a workaround for Meteor.
import tether from 'tether';
global.Tether = tether;
// Import Bootstrap js npm module.
bootstrap = require('bootstrap');
