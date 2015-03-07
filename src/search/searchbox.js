(function() {
'use-strict';

angular.module('angularish/searchbox', ['angularish/constants']);

angular.module('angularish/searchbox').
directive('aSearchBox', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'search/searchbox.html',
    controller: 'SearchBoxCtrl',
    controllerAs: 'searchBox',
    link: function(scope, element, attrs) {}
  };
});

angular.module('angularish/searchbox').
controller('SearchBoxCtrl', function($rootScope, Events) {

  this.query = '';

  this.search = function(query) {
    $rootScope.$emit(Events.GS_EXECUTE, query);
  };

  this.focus = function() {
    $rootScope.$emit(Events.GS_INIT);
  };

  this.blur = function() {
    if (!this.query) cancelSearch();
  };

  this.clear = function() {
    this.query = '';
    cancelSearch();
  }

  var cancelSearch = function() {
    $rootScope.$emit(Events.GS_CANCEL);
  };

});

})();
