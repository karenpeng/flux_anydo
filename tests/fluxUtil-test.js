'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FluxUtil = require('./../src/js/utils/fluxUtil');
var AppDispatcher = require('./../src/js/dispatchers/dispatchers');
var assert = require('assert');

describe('flux util', function() {
  it('Should init actions from action list for a module', function() {
    var module = {};

    // actions should not be defined
    assert(module.actions === undefined);

    FluxUtil.initActions(module, ['actionA', 'actionB']);

    // actions should be initialized
    assert(module.actions !== undefined);

    // actionA should be appended
    assert(typeof module.actions.actionA === 'function');

    // actionB should be appended
    assert(typeof module.actions.actionB === 'function');
  });

  it('Should register action handler', function() {
    assign({}, EventEmitter.prototype, {
      dispatcherIndex: FluxUtil.registerActionHandler({
        'actionA': function actionAHandler(action) {
          // action has been triggered
          assert(true);
          // action data parsed correctly
          assert(action.data === 1);
        }
      })
    });
    AppDispatcher.dispatch({
        actionType: 'actionA',
        data: 1
    });
  });
});