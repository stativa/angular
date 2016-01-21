define( function( require, exports, module ){
    "use strict";

    require( 'angularRouter' );
    require( 'angularBootstrap' );
    require( 'angularResource' );

    require( 'ezConfigResolver' );
    require( 'ezPaginator' );

    var angular, app;

    angular = require( 'angular' );
    app = angular.module( 'app', [ 'ngResource', 'ui.bootstrap', 'ez.paginator' , 'ez.configResolver', 'ui.router'] );

    app.config( require('configs/config') );
    app.config( require('configs/routes') );

    app.run();

    require('configs/controllers')(app);
    require('configs/directives')(app);

    //bootstrap angular
    angular.element( document.documentElement ).ready( function () {
        angular.bootstrap( document, [app.name] );
    });

    module.exports = app;
});
