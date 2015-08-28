(function() {
'use strict';

var StateMap = {
  'app.home': 'Home'
}

angular.module('angularish/nav/back', ['ngMaterial'])
.controller('BackCtrl', function($log, $rootScope, $state) {

  /** @export {string} */
  this.lastState = $rootScope.G.lastState || 'app.home';

  /** @export {string} */
  this.lastPage = StateMap[this.lastState];

  /** @export */
  this.goBack = function() {
    $state.go(this.lastState);
  };
});

})();
