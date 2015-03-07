(function() {
'use-strict';

angular.module('angularish/home', ['angularish/context']).
controller('HomeCtrl', function(context) {
  this.user = context.getUser();

  this.isAdmin = function() {
    return context.hasRole('admin');
  };
});

// TODO: export controller config

})();
