define( function( require ) {
    "use strict";

    return function( iApp ) {
        iApp.controller('MainController', require( 'controllers/mainController' ));
        iApp.controller('MenuController',     require( 'controllers/menu-controller' ));
    };
});
