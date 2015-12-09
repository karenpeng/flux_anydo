'use strict';

var r = require('r-dom');
var React = require('react');
var actions = require('../actions/actions');
var store = require('../store/store');
var constants = require('../constants/constants');
var generateId = require('../utils/mathUtil').generateId;

var InputBox = React.createClass({
	displayName: 'InputBox',

	componentWillMount: function(){
		actions.init();
		store.on(constants.CHANGE_EVENT, function(){
			this.forceUpdate();
		}.bind(this));
	},

	render: function(){
		
		return r.div({}, [
			r.input({
				className: 'head-input input-box',
				placeholder: 'what\'s on your mind?',
				onFocus: function(e) {
					e.target.className = 'head-input input-box editing';
					actions.inputting();
				},
				onBlur: function(e) {
					actions.add({
						key: generateId(),
						ctn: e.target.value
					});
					e.target.value = '';
					e.target.className = 'head-input input-box';
				},
				onKeyUp: function(e){
					if(e.keyCode === 13){
						e.preventDefault();
						actions.add({
							key: generateId(),
							ctn: e.target.value
						});
						e.target.value = '';
					}
				}
			})
		])
	}
});

module.exports = InputBox;