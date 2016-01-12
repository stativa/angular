define( function( require, exports, module ){
    "use strict";

    require( 'angularRouter' );
    require( 'angularBootstrap' );
    require( 'angularResource' );
    require( 'ezPaginator' );
    require( 'ezPaginatorTpl' );

    var angular, app;

    angular = require( 'angular' );
    app = angular.module( 'app', [ 'ngResource', 'ui.router', 'ui.bootstrap', 'ez.paginator' ] );

    app.config( require('configs/config') );
    app.config( require('configs/routes') );

    app.run();

    require('configs/controllers')(app);

    //bootstrap angular
    angular.element( document.documentElement ).ready( function () {
        angular.bootstrap( document, [app.name] );
    });

    module.exports = app;
});
