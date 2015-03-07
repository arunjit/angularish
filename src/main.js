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


angular.module('angularish').
config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(false);
  $stateProvider.
      state('app', States.BASE).
      state('app.home', States.HOME).
      state('app.1', States.V1).
      state('app.2', States.V2);
  $urlRouterProvider.otherwise('/home');
});


// $rootScope and handle events
angular.module('angularish').
run(function($rootScope, Events) {
  /** @struct Global vars. */
  $rootScope.G = {
    searching: false
  };

  $rootScope.$on(Events.GS_INIT, function() {
    $rootScope.G.searching = true;
  });

  $rootScope.$on(Events.GS_CANCEL, function() {
    $rootScope.G.searching = false;
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
  }
};


})();
