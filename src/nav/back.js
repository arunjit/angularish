(function() {
'use strict';

var DEFAULT_STATE = 'app.home';

angular.module('angularish/nav/back', ['ngMaterial', 'angularish/nav']);
angular.module('angularish/nav/back')
.directive('goBack', function() {
  return {
    bindToController: true,
    controller: 'BackCtrl',
    controllerAs: 'ctrl',
    replace: true,
    restrict: 'E',
    scope: {},
    templateUrl: 'nav/back.html',
  };
})
.controller('BackCtrl', function(navigation, StateNames) {

  /** @export {string} */
  this.lastState = navigation.getLastState() || DEFAULT_STATE;

  /** @export {string} */
  this.lastPage = StateNames[this.lastState];

});

})();
