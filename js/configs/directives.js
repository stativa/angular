define( function( require ) {
    "use strict";

    return function( iApp ) {
        iApp.directive('MainMenuDirective', require( 'directive/mainMenuDirective' ));
    };
});
