define(function() {

    "use strict";

    return ['$httpProvider','$locationProvider', function( $httpProvider, $locationProvider ) {

        //delete headers X-Requested-With
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // set http configs and html5 mode is enable
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode().enabled = true;

    }];
});
