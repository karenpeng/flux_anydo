'use strict';

var AppDispatcher = require('../dispatchers/dispatchers');

var _LOCAL_CONSTANTS = {
  EXTRA_ACTION_FIELDS: ['data', 'err']
};

var _createBufferedAction = function _createBufferedAction(actionList) {
  var bufferedActions = {};
  actionList.forEach(function initAction(actionName) {
    bufferedActions[actionName] = function af() {
      var dispatchObj = {
        'actionType': actionName
      };
      for (var i = 0, len = arguments.length; i < len; ++i) {
        if (arguments[i] !== undefined) {
          dispatchObj[_LOCAL_CONSTANTS.EXTRA_ACTION_FIELDS[i]] =
            arguments[i];
        }
      }
      AppDispatcher.dispatch(dispatchObj);
    };
  });
  return bufferedActions;
};

var FluxUtil = {
  /**
   * Creats actions from the given action list. Actions won't be
   * initialized until module.actions is read for the first time.
   * Dispatched actions would use the action name as actionType by
   * default, other fields are defined in
   * _LOCAL_CONSTANTS.EXTRA_ACTION_FIELDS if there would be any specific
   * arguments given when calling the action.
   *
   * @param {Object} module - The module to be have actiosn initialized.
   * @param {Array<string>} actionList - List of strings that would be
   *   used as action names and action types.
   * @return {Object} the updated module
   */
  initActions: function initModuleActions(module, actionList) {
    var bufferedActions = null;

    // Make 'actions' read-only and initialized at the first read.
    Object.defineProperty(module, 'actions', {
      get: function actionsGetter() {
        if (!bufferedActions) {
          bufferedActions = _createBufferedAction(actionList);
        }
        return bufferedActions;
      }
    });

    return module;
  },

  /**
   * Registers action handlers for actions dispatched from AppDispatcher.
   *
   * @param {Object<string, Function>} actionHandlers - Handlers hash
   *   indexed with actionType, valued by the handler that receives an
   *   action instance.
   * @return {Object} registered dispatcher.
   */
  registerActionHandler: function registerActionHandler(actionHandlers) {
    return AppDispatcher.register(function dispatcherIndex(action) {
      var callback = actionHandlers[action.actionType];
      // Check if callable before calling.
      if (typeof callback === 'function') {
        return callback(action);
      }
      return true;
    });
  }
};

module.exports = FluxUtil;