'use strict';

var constants = require('./../src/js/constants/constants');
var LocalStorage = require('./../src/js/utils/localStorageUtil');

describe('localStorage', function() {
  it('Should save data propertly', function() {
    LocalStorage.save({foo: 'bar'});

    var data = window.localStorage[constants.LS_KEY];
    assert(data !== undefined);
    assert(atob(data) !== undefined);
    assert(atob(data).foo === 'bar');
  });

  it('Should not save data when localStorage unavailable', function() {
    var origLS = window.localStorage;
    window.localStorage = null;
    LocalStorage.save({foo: 'bar'});

    var data = origLS[constants.LS_KEY];
    assert(data === undefined);

    // reserve LS
    window.localStorage = origLS;
  });

  it('Should load data propertly', function() {
    LocalStorage.save({foo: 'bar'});

    var data = LocalStorage.load();
    assert(data !== undefined);
    assert(data.foo === 'bar');
  });

  it('Should not load data when localStorage unavailable', function() {
    LocalStorage.save({foo: 'bar'});

    var origLS = window.localStorage;
    window.localStorage = null;
    var data = LocalStorage.load();
    assert(data === '');

    window.localStorage = origLS;
  });
});