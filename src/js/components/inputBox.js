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
		store.on(constants.CHANGE_EVENT, function(){
			this.forceUpdate();
		}.bind(this));
	},

	render: function(){
		
		return r.div({}, [
			r.input({
				placeholder: 'what\'s in your mind?',
				onBlur: function(e) {
					actions.add({
						key: generateId(),
						ctn: e.target.value
					});
					e.target.value = '';
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