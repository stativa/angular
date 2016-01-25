define( function( require, exports, module ){
    "use strict";

    require( 'angularRouter' );
    require( 'angularBootstrap' );
    require( 'angularResource' );

    var angular, app;

    angular = require( 'angular' );
    app = angular.module( 'app', [ 'ngResource', 'ui.router', 'ui.bootstrap' ] );

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
