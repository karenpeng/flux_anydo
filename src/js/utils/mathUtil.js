'use strict';

exports.generateId = function(){
	return ((Math.random() + '').substr(2, 8) - 0).toString(36)
}