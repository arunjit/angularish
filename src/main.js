(function() {
'use strict';

angular.module('angularish', [
  'ngMaterial',
  'ui.router',
  'angularish/common/spacer',
  'angularish/constants',
  'angularish/context',
  'angularish/home',
  'angularish/nav',
  'angularish/nav/back',
  'angularish/searchbox',
  'angularish/sidebar',
  'angularish/states',
]);


// Routing and states
angular.module('angularish')
.config(function($stateProvider, $locationProvider, $urlRouterProvider, States) {
  $locationProvider.html5Mode(false);
  States.forEach(function(state) {
    $stateProvider.state(state);
  });
  $urlRouterProvider.otherwise('/home');
});


// Theming
angular.module('angularish')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple')
      .accentPalette('cyan');
});


// $rootScope and handle events
angular.module('angularish')
.run(function($rootScope, Events, navigation) {
  /** @struct Global vars. */
  var G = $rootScope.G = {
    haveContext: false
  };

  $rootScope.$on(Events.FETCHED_CONTEXT, function() {
    G.haveContext = true;
  });

  $rootScope.$on('$stateChangeSuccess',
      function(e, to, toParams, from, fromParams) {
        navigation.setLastState(from.name);
      });

});


})();
