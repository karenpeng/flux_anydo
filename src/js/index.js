var r = require('r-dom');
var ReactDom = require('react-dom');
var App = require('./components/app');

ReactDom.render(r(App), document.getElementById('container'));