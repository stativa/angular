window.name = "NG_DEFER_BOOTSTRAP!";

/**
 * configuratioin requireJS and set default paths
 */
requirejs.config({
    baseUrl: '/',
    paths: {
        'angular':          './vendors/angular.min',
        'angularRouter':    './vendors/angular-ui-router',
        'angularBootstrap': './vendors/angular-bootstrap.min',
        'angularResource':  './vendors/angular-resource',
        'configs':          'js/configs',
        'controllers':      'js/controllers'
    },
    priority: [
        'angular'
    ],
    shim: {
        'angular':  { exports: 'angular' },
        'angularRouter':    ['angular'],
        'angularBootstrap': ['angular'],
        'angularResource':  ['angular']
    },
    deps: ['js/app']
});
