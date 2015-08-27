(function() {
'use strict';

angular.module('angularish/common/spacer', [])
.directive('aSpacer', function() {
  return {
    restrict: 'E',
    template: '<div flex></div>',
    replace: true,
    scope: {}
  };
});

})();
