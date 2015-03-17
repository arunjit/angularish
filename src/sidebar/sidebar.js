(function() {
'use-strict';

angular.module('angularish/sidebar', ['angularish/context']).
controller('SidebarNavCtrl', function(context) {
  this.user = context.getUser();

  this.isV2 = function() {
    return context.hasMinimumVersion(2)
  };
});

// TODO: export controller config

})();
