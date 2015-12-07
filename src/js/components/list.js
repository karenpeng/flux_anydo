'use strict';

var r = require('r-dom');
var React = require('react');
var actions = require('../actions/actions');
var store = require('../store/store');
var constants = require('../constants/constants');
var classNames = require('classnames');
var Hammer = require('react-hammerjs');

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
				r.div({},[
					r(Hammer, {
							onSwipte: function(){
								console.log('ouch!')
							}
						}, [
							r.div({
								className: 'item',
								onClick: function(){
									actions.edit(key);
								}
							}, store.getItem(key).ctn)
						]),
						r.button({
							onClick: function(){
								actions.remove(key);
							}
						},'x')
					]):
				r.input({
					className: classNames('item', 'editing'),
					defaultValue: store.getItem(key).ctn,
					onBlur: function(e){
						actions.modify({
							key: key,
							ctn: e.target.value
						});
					},
					onKeyUp: function(e){
						if(e.keyCode === 13){
							e.preventDefault();
							actions.modify({
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
