'use strict';

var FluxUtil = require('../utils/fluxUtil');
var constants = require('../constants/constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentID = null;
var _list = {};
var _order = [];
var _archive = [];

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
	getArchive: function(){
		return _archive;
	},
	getCurrentKey: function(){
		return _currentID;
	},

	dispatcherIndex: FluxUtil.registerActionHandler({
		add: function(action){		
			var _ctn = action.data.ctn;
			if(_ctn !== ''){
				var _id = action.data.key;
				_list[_id] = {
					id: _id,
					ctn: _ctn
				}
				_order.unshift(_id);
				store.emit(constants.CHANGE_EVENT);
			}
		},

		edit: function(action){
			_currentID = action.data;
			store.emit(constants.CHANGE_EVENT);
		},

		modify: function(action){
			var _ctn = action.data.ctn;
			if(_ctn !== ''){
			var _id = action.data.key;			
				_list[_id].ctn = _ctn;
				_currentID = null;
				store.emit(constants.CHANGE_EVENT);
			}
		},

		remove: function(action){
			var _id = action.data;
			delete _list[_id];
			for(var i = 0; i < _archive.length; i++){
				if(_archive[i] === _id){
					_archive.splice(i, 1);
					break;
				}
			}
			store.emit(constants.CHANGE_EVENT);
		},

		archive: function(action){
			var _id = action.data;
			var hold;
			for(var i = 0; i <_order.length; i++){
				if(_order[i] === _id){
					hold = _order[i];
					_order.splice(i, 1);
					break;
				}
			}
			_currentID = null;
			_archive.unshift(hold);
			store.emit(constants.CHANGE_EVENT);
		}
	})
})

module.exports = store;