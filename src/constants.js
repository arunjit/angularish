(function() {

angular.module('angularish/constants', [])
.constant('Events', {
  FETCHED_CONTEXT: 'context:fetched',
  GS_INIT: 'globalsearch:init',
  GS_EXECUTE: 'globalsearch:execute',
  GS_CANCEL: 'globalsearch:cancel'
})
.constant('StateNames', {
  'app.home': 'Home',
  'app.search': 'Search',
  'app.searchresults': 'Search Results',
});

})();
