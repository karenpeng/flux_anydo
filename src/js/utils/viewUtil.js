'use strict';

var ViewUtil = {
	setFocus: function(elem) {
		var elemLen = elem.value.length;
	  // For IE Only
	  if (document.selection) {
	      // Set focus
	      elem.focus();
	      // Use IE Ranges
	      var oSel = document.selection.createRange();
	      // Reset position to 0 & then set at end
	      oSel.moveStart('character', -elemLen);
	      oSel.moveStart('character', elemLen);
	      oSel.moveEnd('character', 0);
	      oSel.select();
	  } else if (elem.selectionStart || elem.selectionStart == '0') {
	      // Firefox/Chrome
	      elem.selectionStart = elemLen;
	      elem.selectionEnd = elemLen;
	      elem.focus();
	  }
	}
}

module.exports = ViewUtil;
