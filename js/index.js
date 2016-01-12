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
        'ezPaginator':      './vendors/ez-paginator',
        'ezPaginatorTpl':   './vendors/ez-paginator-tpl',
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
        'ezPaginator':      ['angular'],
        'ezPaginatorTpl':   ['angular']
    },
    deps: ['js/app']
});
