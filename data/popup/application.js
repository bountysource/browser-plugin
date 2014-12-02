'use strict';

angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngSanitize']);

// allow chrome-extension:// URLs
angular.module('app').config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|file):/);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
});

angular.module('app').value('$bountysource', BountysourceClient);

angular.module('app').run(function($rootScope, $location, $window, $bountysource) {
  // tell firefox to resize the plugin
  if ((typeof(self) !== 'undefined') && self.port) {
    setInterval(function() {
      self.port.emit("message", { action: 'set_popup_height', height: document.body.offsetHeight + 4 });
    },100);
  }

  $rootScope.$on('$viewContentLoaded', function() {
    $bountysource.google_analytics({ path: 'popup' + $location.url() });
  });
});