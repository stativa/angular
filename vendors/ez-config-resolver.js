angular.module('ez.configResolver', []).factory('EzConfigResolver', [function () {
  return {
    /**
     * Get resolved config
     *
     * Resolve this constant with options set on attrs or ezConfig
     */
    resolve: function(scope, attrs, _config) {
      var config = angular.copy(_config);

      if (!!scope.ezConfig) {
        config = $.extend(config, scope.ezConfig);
      }

      if (!!scope && !!attrs) {
        var properties = Object.getOwnPropertyNames(config);

        properties.forEach(function(prop) {
          if (attrs.hasOwnProperty(prop)) {
            if (typeof config[prop] === 'boolean') {
              if (attrs[prop] === 'true') {
                config[prop] = true;
              } else if (attrs[prop] === 'false') {
                config[prop] = false;
              } else {
                config[prop] = scope.$parent[attrs[prop]];
              }
            } else if (typeof config[prop] === 'number') {
              config[prop] = parseInt(attrs[prop], 10);
            } else {
              config[prop] = attrs[prop];
            }
          }
        });
      }

      return config;
    }
  };
}]);
