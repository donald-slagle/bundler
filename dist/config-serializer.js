'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.readConfig = readConfig;
exports.serializeConfig = serializeConfig;
exports.getAppConfig = getAppConfig;
exports.saveAppConfig = saveAppConfig;
var vm = require('vm');
var fs = require('fs');

function readConfig(cfgCode) {
  var sandbox = {};
  sandbox.System = {
    cfg: {},
    config: function config(cfg) {
      for (var key in cfg) {
        this.cfg[key] = cfg[key];
      }
    }
  };

  var ctx = vm.createContext(sandbox);
  vm.runInContext(cfgCode, sandbox);
  return sandbox.System.cfg;
}

function serializeConfig(config) {
  var json = JSON.stringify(config, null, 2);
  return 'System.config(' + json + ')';
}

function getAppConfig(configPath) {
  return readConfig(fs.readFileSync(configPath, 'utf8'));
}

function saveAppConfig(configPath, config) {
  fs.writeFileSync(configPath, serializeConfig(config));
}