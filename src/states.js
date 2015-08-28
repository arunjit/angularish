(function () {
'use strict';

angular.module('angularish/states', [])
.constant('States', [
  {
    name: 'app',
    url: '/',
    abstract: true,
    resolve: {
      context: function(contextService) {
        return contextService.getContext();
      }
    }
  },
  {
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
  {
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
  {
    name: 'app.searchresults',
    url: 'search?q',
    views: {
      'main@': {
        templateUrl: 'search/searchresults.html'
      }
    }
  }
]);

})();
