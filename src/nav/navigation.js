(function() {
'use strict';

angular.module('angularish/nav', ['ui.router'])
.service('navigation', function($state) {
  /** @private {string} */
  var lastState_ = '';

  /**
   * @param {string} state The name of the last state to set.
   * @return {string} The name of the last state.
   */
  this.setLastState = function(state) {
    return (lastState_ = state);
  }

  /** @return {string} The name of the last state. */
  this.getLastState = function() {
    return lastState_;
  }

  /**
   * @param {string} state The name of the state to go to.
   * @param {Object} opt_params .
   * @param {Object} opt_options .
   * @return {!angular.$q.Promise}
   */
  this.go = function(state, opt_params, opt_options) {
    return $state.go(state, opt_params, opt_options);
  }

});

})();
