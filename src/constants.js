(function() {

angular.module('angularish/constants', []).
constant('Events', {
  GS_INIT: 'globalsearch:init',
  GS_EXECUTE: 'globalsearch:execute',
  GS_CANCEL: 'globalsearch:cancel'
});

})();
