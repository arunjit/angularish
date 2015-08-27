(function() {
'use strict';

angular.module('angularish', [
  'ngMaterial',
  'ui.router',
  'angularish/constants',
  'angularish/context',
  'angularish/home',
  'angularish/searchbox',
  'angularish/sidebar'
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
      primaryPalette('deep-orange', {'default': '700'}).
      accentPalette('green', {'default': '700'});
});


// $rootScope and handle events
angular.module('angularish').
run(function($rootScope, $state, Events) {
  /** @struct Global vars. */
  var G = $rootScope.G = {
    searching: false,
    haveContext: false
  };

  $rootScope.$on(Events.GS_INIT, function() {
    G.searching = true;
  });

  $rootScope.$on(Events.GS_CANCEL, function() {
    G.searching = false;
  });

  $rootScope.$on(Events.FETCHED_CONTEXT, function() {
    G.haveContext = true;
  });

});


// Toggler drawer.
angular.module('angularish').
run(function($document) {
  var hide = function(el) {el && el.setAttribute('hidden', true)};
  var show = function(el) {el && el.removeAttribute('hidden')};
  var $ = function(id) {return $document[0].getElementById(id)};
  var checkAndHide = function() {
    ($('drawer').hasAttribute('narrow') ? show : hide)($('menu-toggle'));
  }
  // NOTE: the #menu-toggle MUST be outside any ui-views.
  $('menu-toggle').addEventListener('click', function() {
    $('drawer').togglePanel();
  }, false);
  // core-responsive-change is bubbled up from the active drawer panel.
  $('main').addEventListener('core-responsive-change', function(event) {
    checkAndHide();
  }, false);
  checkAndHide();
});


function withDefaultSidebar(viewConfig) {
  viewConfig['sidebar-default'] = {
    controller: 'SidebarNavCtrl',
    controllerAs: 'nav',
    templateUrl: 'sidebar/sidebar.html'
  };
  return viewConfig;
}


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
    views: withDefaultSidebar({
      main: {
        controller: 'HomeCtrl',
        controllerAs: 'home',
        templateUrl: 'home/home.html'
      }
    })
  },
  V1: {
    url: '1',
    views: withDefaultSidebar({
      main: {
        template: 'Placeholder for view 1'
      },
      sidebar: {
        template: '<label>View 1</label>'
      }
    })
  },
  V2: {
    url: '2',
    views: withDefaultSidebar({
      main: {
        template: 'Placeholder for view 2'
      },
      sidebar: {
        template: '<label>View 2</label>'
      }
    })
  },
  SEARCH: {
    url: 'search?q',
    views: {
      main: {
        templateUrl: 'search/search.html'
      }
    }
  },
  INFO: {
    url: 'info',
    abstract: true,
    views: {
      main: {
        templateUrl: 'info/info.html'
      }
    }
  },
  INFO_TAB1: {
    url: 'info/1',
    views: {
      tab: {
        template: '<label>Tab 1</label>'
      }
    }
  }
};


})();
