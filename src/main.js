(function() {
'use strict';

angular.module('angularish', [
  'ngMaterial',
  'ui.router',
  'angularish/constants',
  'angularish/context',
  'angularish/home',
  'angularish/searchbox'
]);


// Routing and states
angular.module('angularish').
config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(false);
  $stateProvider.
      state('app', States.BASE).
      state('app.home', States.HOME).
      state('app.1', States.V1).
      state('app.2', States.V2).
      state('app.search', States.SEARCH);
  $urlRouterProvider.otherwise('/home');
});


// Theming
angular.module('angularish').
config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').
      primaryPalette('blue').
      accentPalette('red');
});


// $rootScope and handle events
angular.module('angularish').
run(function($rootScope, $state, Events) {
  /** @struct Global vars. */
  var G = $rootScope.G = {
    searching: false,
    haveContext: false,
    lastState: null
  };

  $rootScope.$on(Events.GS_INIT, function() {
    G.searching = true;
  });

  $rootScope.$on(Events.GS_CANCEL, function() {
    G.searching = false;
    if (G.lastState) {
      $state.go(G.lastState.name, G.lastState.params);
    }
  });

  $rootScope.$on(Events.FETCHED_CONTEXT, function() {
    G.haveContext = true;
  });

  $rootScope.$on('$stateChangeSuccess', function(ev, to, toP, from, fromP) {
    if (!from.name || from.name == 'app.search') return;
    G.lastState = {name: from.name, params: fromP};
  });
});


// Toggler drawer.
angular.module('angularish').
run(function($document) {
  var toggle = $document[0].getElementById('menu-toggle');
  var drawer = $document[0].getElementById('drawer');
  var hide = function(el) {el.setAttribute('hidden', true)};
  var show = function(el) {el.removeAttribute('hidden')};
  if (toggle && drawer) {
    toggle.addEventListener('click', function() {
      drawer.togglePanel();
    });
    drawer.addEventListener('core-responsive-change', function(event) {
      (event.detail.narrow ? show : hide)(toggle);
    });
    if (drawer.hasAttribute('narrow')) {
      show(toggle);
    }
  }
});


var States = {
  BASE: {
    url: '/',
    abstract: true,
    resolve: {
      context: function(contextService) {
        return contextService.getContext();
      }
    }
  },
  HOME: {
    url: 'home',
    views: {
      main: {
        controller: 'HomeCtrl',
        controllerAs: 'home',
        templateUrl: 'home/home.html'
      }
    }
  },
  V1: {
    url: '1',
    views: {
      main: {
        template: 'Placeholder for view 1'
      },
      sidebar: {
        template: '<label>View 1</label>'
      }
    }
  },
  V2: {
    url: '2',
    views: {
      main: {
        template: 'Placeholder for view 2'
      },
      sidebar: {
        template: '<label>View 2</label>'
      }
    }
  },
  SEARCH: {
    url: 'search?q',
    views: {
      main: {
        template: 'Search'
      }
    }
  }
};


})();
