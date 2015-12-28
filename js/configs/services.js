define( function( require ) {
    "use strict";

    return function( iApp ) {
        iApp.factory('PaginatorService', require( 'services/paginatorService' ));
    };
});
