(function() {
'use strict';

angular.module('angularish', [
  'ngMaterial',
  'ui.router',
  'angularish/common/spacer',
  'angularish/constants',
  'angularish/context',
  'angularish/nav',
  'angularish/nav/back',
  'angularish/home',
  'angularish/searchbox',
  'angularish/sidebar'
]);


// Routing and states
angular.module('angularish')
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(false);
  $stateProvider
      .state(States.BASE)
      .state(States.HOME)
      .state(States.SEARCH)
      .state(States.SEARCHRESULTS);
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


var States = {
  BASE: {
    name: 'app',
    url: '/',
    abstract: true,
    resolve: {
      context: function(contextService) {
        return contextService.getContext();
      }
    }
  },
  HOME: {
    name: 'app.home',
    url: 'home',
    views: {
      'main@': {
        controller: 'HomeCtrl',
        controllerAs: 'home',
        templateUrl: 'home/home.html'
      }
    }
  },
  SEARCH: {
    name: 'app.search',
    url: 'search',
    views: {
      'main@': {
        templateUrl: 'search/search.html'
      },
      'appbar-left@': {
        template: '<go-back></go-back>'
      }
    }
  },
  SEARCHRESULTS: {
    name: 'app.searchresults',
    url: 'results?q',
    views: {
      'main@': {
        templateUrl: 'search/searchresults.html'
      }
    }
  }
};


})();
