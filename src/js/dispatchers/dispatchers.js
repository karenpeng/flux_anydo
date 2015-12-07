'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function handleServerAction(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  },

  handleAction: function handleAction(action) {
    var payload = {
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;