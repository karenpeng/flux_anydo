'use strict';

var FluxUtil = require('../utils/utils');
var constants = require('../constants/constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentID = null;
var _list = {
	88: {
		id: 88,
		content: 'hello'
	}
};

var store = assign({}, EventEmitter.prototype, {
	getList: function(){
		return _list;
	},

	getCurrentKey: function(){
		return _currentID;
	},

	emitSave: function(){

	},

	dispatcherIndex: FluxUtil.registerActionHandler({
		edit: function(action){
			_currentID = action.data;
			store.emit(constants.CHANGE_EVENT);
		},

		save: function(action) {
			var _id = action.data.key;
			var _ctn = action.data.ctn;
			_list[_id].content = _ctn;
			_currentID = null;
			store.emit(constants.CHANGE_EVENT);
		},

		remove: function(){

		}
	})
})

module.exports = store;