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
    replace: true,
    link: function(scope, element, attrs) {}
  };
});

angular.module('angularish/searchbox').
controller('SearchBoxCtrl', function(Events, $rootScope, $state, $window) {

  this.query = '';

  this.search = function(query) {
    if (query) $state.go('app.search', {q: query});
  };

  this.focus = function() {
    $rootScope.$emit(Events.GS_INIT);
  };

  this.clear = function() {
    this.query = '';
    $rootScope.$emit(Events.GS_CANCEL);
    if ($state.current.name == 'app.search' ||
        $state.current.name == 'app.searchresults') {
      $window.history.back();
    }
  };

  if ($state.params.q) {
    this.focus();
    this.query = $state.params.q;
  }

});

})();
