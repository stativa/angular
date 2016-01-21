define( function() {
    "use strict";

    return ['$state', function($state) {
        return {
            template : '<ul class="breadcrumb"><li><a ui-sref="catalogName({name: category})">{{breadcrumb[0]}}</a></li><li><a href="#">{{breadcrumb[1]}}</a></li><li>{{breadcrumb[2]}}</li></ul>'
        };
    }];

});
