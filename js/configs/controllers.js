define( function( require ) {
    "use strict";

    return function( iApp ) {
        iApp.controller('MainController', require( 'controllers/mainController' ));
        iApp.controller('MenuController', require( 'controllers/menuController' ));
        iApp.controller('ItemController', require( 'controllers/itemController' ));
        iApp.controller('CategoryController', require( 'controllers/categoryController' ));
    };
});
