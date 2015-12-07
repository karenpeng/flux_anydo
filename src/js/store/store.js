'use strict';

var FluxUtil = require('../utils/fluxUtil');
var constants = require('../constants/constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentID = null;
var _list = {
	'88': {
		id: '88',
		ctn: 'hello'
	}
};
var _order = [];
_order.push('88');

var store = assign({}, EventEmitter.prototype, {
	getList: function(){
		return _list;
	},
	getItem: function(id){
		return _list[id];
	},
	getOrder: function(){
		return _order;
	},
	getCurrentKey: function(){
		return _currentID;
	},

	dispatcherIndex: FluxUtil.registerActionHandler({
		add: function(action){
			var _id = action.data.key;
			var _ctn = action.data.ctn;
			_list[_id] = {
				id: _id,
				ctn: _ctn
			}
			_order.unshift(_id);
			store.emit(constants.CHANGE_EVENT);
		},
		edit: function(action){
			_currentID = action.data;
			store.emit(constants.CHANGE_EVENT);
		},

		save: function(action) {
			var _id = action.data.key;
			var _ctn = action.data.ctn;
			_list[_id].ctn = _ctn;
			_currentID = null;
			_order.unsift(_id);
			store.emit(constants.CHANGE_EVENT);
		},

		remove: function(action){
			var _id = action.data.key;
			delete _list[_id];
			// _order.(_id);
			store.emit(constants.CHANGE_EVENT);
		}
	})
})

module.exports = store;