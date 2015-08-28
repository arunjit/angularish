(function() {
'use-strict';

angular.module('angularish/home', ['angularish/context'])
.controller('HomeCtrl', function(context) {
  /** @export {string} */
  this.user = context.getUser();

  /** @export @return {boolean} */
  this.isAdmin = function() {
    return context.hasRole('admin');
  };
});

// TODO: export controller config

})();
