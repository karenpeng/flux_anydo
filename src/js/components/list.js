'use strict';

var r = require('r-dom');
var React = require('react');
var actions = require('../actions/actions');
var store = require('../store/store');
var constants = require('../constants/constants');

var List = React.createClass({
	displayName: 'List',

	componentWillMount: function(){
		store.on(constants.CHANGE_EVENT, function(){
			this.forceUpdate();
		}.bind(this));
	},

	render: function(){
		var msgList = store.getList();
		var crtKey = store.getCurrentKey();
		
		var domList = [];

		for(var key in msgList) {
			
			var ddd

			domList.push(
				key !== crtKey ?
				r.div({
					onClick: function(){
						actions.edit(key);
					}
				}, msgList[key].content) :
				r.input({
					defaultValue: msgList[key].content,
					onBlur: function(e) {
						actions.save({
							key: key,
							ctn: e.target.value
						});
					}
				})
			);
		}
		return r.div(domList);
	}
})

module.exports = List;
