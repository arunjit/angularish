(function() {
'use-strict';

angular.module('angularish/context', ['angularish/constants']);


var Context = function(context) {
  this.context_ = context;
};

Context.prototype.getUser = function() {
  return this.context_.user;
};

Context.prototype.hasRole = function(role) {
  return this.context_.roles.indexOf(role) >= 0;
};


angular.module('angularish/context').
service('contextService', function($log, $q, $timeout, $rootScope, Events) {

  var contextPromise = null;

  this.getContext = function() {
    if (contextPromise) {
      $log.debug('Reusing existing context promise');
      return contextPromise;
    }

    var defer = $q.defer();

    // simulate HTTP
    $timeout(function() {
      defer.resolve(new Context({user: 'arunjit', roles: ['admin']}));
      $rootScope.$emit(Events.FETCHED_CONTEXT);
      $log.debug('Fetched new context');
    }, 2000);

    contextPromise = defer.promise;
    return contextPromise;
  };

});

})();
