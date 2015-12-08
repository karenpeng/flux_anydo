'use strict';

var assign = require('object-assign');
var constants = require('../constants/constants');
var EventEmitter = require('events').EventEmitter;
var FluxUtil = require('../utils/fluxUtil');
var LocalStorageUtil = require('../utils/localStorageUtil');

var _currentID = null;
var _list = {};
var _active = [];
var _archive = [];

var _saveData = function() {
	LocalStorageUtil.save({
		currentID: _currentID,
		list: _list,
		active: _active,
		archive: _archive
	});
};

var _loadData = function() {
	var tmpData = LocalStorageUtil.load();
	_currentID = tmpData.currentID || _currentID;
	_list = tmpData.list || _list,
	_active = tmpData.active || _active,
	_archive = tmpData.archive || _archive
};

var store = assign({}, EventEmitter.prototype, {
	getList: function(){
		return _list;
	},
	getItem: function(id){
		return _list[id];
	},
	getActive: function(){
		return _active;
	},
	getArchive: function(){
		return _archive;
	},
	getCurrentKey: function(){
		return _currentID;
	},
	emitChange: function() {
		_saveData();
		store.emit(constants.CHANGE_EVENT);
	},
	dispatcherIndex: FluxUtil.registerActionHandler({

		init: function(){
			_loadData();
		},

		inputting: function(){
			_currentID = null;
			store.emitChange();
		},

		add: function(action){		
			var _ctn = action.data.ctn;
			if(_ctn !== ''){
				var _id = action.data.key;
				_list[_id] = {
					id: _id,
					ctn: _ctn
				}
				_active.unshift(_id);
				store.emitChange();
			}
		},

		reorder: function(action){
			var _id = action.data;
			for(var i = 1; i < _active.length; i++){
				if(_active[i] === _id){
					var tmp = _active[i-1];
					_active[i-1] = _active[i];
					_active[i] = tmp;
				}
			}
			store.emitChange();
		},

		edit: function(action){
			_currentID = action.data;
			store.emitChange();
		},

		modify: function(action){
			var _ctn = action.data.ctn;
			if(_ctn !== ''){
			var _id = action.data.key;			
				_list[_id].ctn = _ctn;
				_currentID = null;
				store.emitChange();
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
			store.emitChange();
		},

		archive: function(action){
			var _id = action.data;
			var hold;
			for(var i = 0; i <_active.length; i++){
				if(_active[i] === _id){
					hold = _active[i];
					_active.splice(i, 1);
					break;
				}
			}
			_currentID = null;
			_archive.unshift(hold);
			store.emitChange();
		}
	})
})

module.exports = store;