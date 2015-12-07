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
		var msgOrder = store.getOrder();
		var crtKey = store.getCurrentKey();
		
		var domList = [];

		msgOrder.forEach(function(key){

			domList.push(
				key !== crtKey ?
				r.div({
					onClick: function(){
						actions.edit(key);
					}
				}, store.getItem(key).ctn) :
				r.input({
					defaultValue: store.getItem(key).ctn,
					onBlur: function(e) {
						actions.save({
							key: key,
							ctn: e.target.value
						});
					},
					onKeyUp: function(e){
						if(e.keyCode === 13){
							e.preventDefault();
							actions.save({
								key: key,
								ctn: e.target.value
							});
						}
					}
				})
			);
		})
		return r.div({}, domList);
	}
})

module.exports = List;
