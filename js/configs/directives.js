define( function( require ) {
    "use strict";

    return function( iApp ) {
        iApp.directive('breadCrumb', require( 'js/directives/breadCrumb' ));
    };
});
