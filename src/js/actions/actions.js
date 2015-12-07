'use strict';

var FluxUtil = require('../utils/fluxUtil');
var ItemConstants = require('../constants/constants');

module.exports = FluxUtil.initActions(
  {}, ItemConstants.ACTION_LIST).actions;