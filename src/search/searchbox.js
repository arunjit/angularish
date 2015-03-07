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
controller('SearchBoxCtrl', function($rootScope, Events, $state) {

  this.query = '';

  this.search = function(query) {
    $state.go('app.search', {q: query});
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

  if ($state.params.q) {
    this.focus();
    this.query = $state.params.q;
  }

});

})();
