var App = require('./components/app');
var r = require('r-dom');
var ReactDom = require('react-dom');

ReactDom.render(r(App), document.getElementById('container'));