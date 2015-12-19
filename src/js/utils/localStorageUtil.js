'use strict';

var constants = require('../constants/constants');
var store = require('../store/store');

var LocalStorageUtil = {
  save: function(obj) {
    if (!localStorage) return;
    try {
      localStorage[constants.LS_KEY] = btoa(JSON.stringify(obj));
    } catch(e) {
      console.error(e);
    }
  },

  load: function() {
    if (!localStorage || !localStorage[constants.LS_KEY]) return '';
    try {
      return JSON.parse(atob(localStorage[constants.LS_KEY]));
    } catch(e) {
      console.error(e);
    }
    return '';
  }
};


module.exports = LocalStorageUtil;
