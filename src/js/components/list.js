'use strict';

var classNames = require('classnames');
var r = require('r-dom');
var React = require('react');
var ReactDom = require('react-dom');

var actions = require('../actions/actions');
var constants = require('../constants/constants');
var store = require('../store/store');
var viewUtil = require('../utils/viewUtil');

var _currentPosition;
var _currentTarget;
var thredshould = 24;

var _onMoveStart = function(key) {
	return function(e) {
		_currentTarget = e.target;
		_currentPosition = {
			x: e.clientX || e.touches[0] && e.touches[0].clientX,
			y: e.clientY || e.touches[0] && e.touches[0].clientY
		};
	};
};

var _onMoveEnd = function(key) {
	return function(e) {
		if(e.target !== _currentTarget) return;
		var _prePosition = _currentPosition;
		_currentPosition = {
			x: e.clientX || e.changedTouches[0] && e.changedTouches[0].clientX,
			y: e.clientY || e.changedTouches[0] && e.changedTouches[0].clientY
		};
		var dX = _currentPosition.x - _prePosition.x;
		var dY = _currentPosition.y - _prePosition.y;
		if(dX > thredshould) {
			actions.archive(key);
		} else if(dY < thredshould / 2) {
			actions.edit(key);
		}
	}
};

var List = React.createClass({
	displayName: 'List',

	componentWillMount: function(){
		store.on(constants.CHANGE_EVENT, function(){
			this.forceUpdate();
		}.bind(this));
	},

	componentDidMount: function(){
 		var _input = ReactDom.findDOMNode(this.refs.editItem);
 		_input && viewUtil.setFocus(_input);
	},

	componentDidUpdate: function(){
 		var _input = ReactDom.findDOMNode(this.refs.editItem);
 		_input && viewUtil.setFocus(_input);
	},

	render: function() {

		var msgActive = store.getActive();
		var msgArchive = store.getArchive();
		var crtKey = store.getCurrentKey();
		
		var domList = [];

		msgActive.forEach(function(key, index){

			domList.push(
				key !== crtKey ?
				r.div({
							className: classNames('active', 'item')
						},[
							r.div({
								className: 'msg-content',
								onTouchStart: _onMoveStart(key),
								onTouchEnd: _onMoveEnd(key),
								onMouseDown: _onMoveStart(key),
								onMouseUp: _onMoveEnd(key)
							}, store.getItem(key).ctn),
							r.button({
								className: index === 0 ? 'hiddenBtn' : 'showBtn',
								onClick: function(){
									actions.reorder(key);
								}
							}, '▲')

						]):
				r.input({
					ref: 'editItem',
					className: classNames('editing', 'item-input', 'input-box'),
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

		msgArchive.forEach(function(key){
			domList.push(
				r.div({className: classNames('archive', 'item')}, [
					r.div({className: 'msg-content'}, store.getItem(key).ctn),
					r.button({
						onClick: function(){
							actions.remove(key);
						}
					},'╳')
				])
			)
		})

		return r.div({}, domList);
	}
})

module.exports = List;
