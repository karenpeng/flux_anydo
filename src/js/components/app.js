'use strict';

var r = require('r-dom');
var React = require('react');
var List = require('./List');
var InputBox = require('./InputBox');

var App = React.createClass({
displayName: 'app',

render: function(){
  return r.div({}, [
      r(InputBox),
      r(List)
    ])
  }
})

module.exports = App;
