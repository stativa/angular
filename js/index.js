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
        'ezConfigResolver': './vendors/ez-config-resolver',
        'ezPaginator':      './vendors/ez-paginator',

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
        'angularResource':  ['angular'],
        'ezConfigResolver': ['angular'],
        'ezPaginator':      ['angular']
    },
    deps: ['js/app']
});
