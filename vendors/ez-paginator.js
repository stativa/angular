angular.module("ez.paginator", []);

angular.module("ez.paginator").directive("ezPaginatorBar", [ "EzConfigResolver", "EzPaginatorConfig", function(EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/bar/bar.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
        }
    };
} ]);

angular.module("ez.paginator").constant("EzPaginatorConfig", {
    showBoundaryLinks: false,
    showDirectionLinks: true,
    firstBtnText: "",
    firstBtnIconClass: "fa fa-angle-double-left",
    prevBtnText: "",
    prevBtnIconClass: "fa fa-angle-left",
    nextBtnText: "",
    nextBtnIconClass: "fa fa-angle-right",
    lastBtnText: "",
    lastBtnIconClass: "fa fa-angle-double-right",
    pagerPrevBtnText: "Previous",
    pagerPrevBtnIconClass: "fa fa-angle-double-left",
    pagerNextBtnText: "Next",
    pagerNextBtnIconClass: "fa fa-angle-double-right",
    maxPages: 10,
    initialPage: 1,
    showPaginator: true,
    showState: true,
    showLimit: true,
    states: [ {
        id: "active",
        name: "Active"
    }, {
        id: "deleted",
        name: "Deleted"
    } ],
    defaultState: "active",
    stateToggleClass: "btn btn-default",
    stateDropdownMenuClass: "dropdown-menu pointer pull-right",
    stateContainerClass: "dropup",
    limits: [ 5, 15, 25, 50 ],
    defaultLimit: 15,
    limitToggleClass: "btn btn-default",
    limitDropdownMenuClass: "dropdown-menu pointer pull-right",
    limitContainerClass: "dropup"
});

angular.module("ez.paginator").directive("ezPaginatorLimit", [ "$stateParams", "$location", "EzConfigResolver", "EzPaginatorConfig", function($stateParams, $location, EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/limit/limit.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.limit || scope.config.limits.indexOf(scope.pagination.limit) === -1) {
                var limit = $location.search().limit;
                if (!useCallback && !!limit && scope.config.limits.indexOf(limit)) {
                    scope.pagination.limit = limit;
                }
            }
            if (!scope.pagination.limit) {
                scope.pagination.limit = scope.config.defaultLimit;
            }
            scope.setLimit = function(limit) {
                scope.pagination.limit = limit;
                scope.pagination.page = 1;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $stateParams.limit = limit;
                    $stateParams.page = 1;
                    $location.search($stateParams);
                }
            };
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPager", [ "EzConfigResolver", "EzPaginatorConfig", "$location", "$stateParams", function(EzConfigResolver, EzPaginatorConfig, $location, $stateParams) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/pager/pager.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            var init = function() {
                scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
                scope.pagination.items = scope.pagination.items || [];
                if (!scope.pagination.page && !useCallback) {
                    scope.pagination.page = $location.search().page;
                }
                if (!scope.pagination.page) {
                    scope.pagination.page = scope.config.initialPage;
                }
                if (!scope.pagination.limit) {
                    scope.pagination.limit = scope.config.defaultLimit;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
            };
            scope.selectPage = function(pageNumber) {
                if (pageNumber < 1) {
                    pageNumber = 1;
                } else if (pageNumber > scope.pagination.pages) {
                    pageNumber = scope.pagination.pages;
                }
                scope.pagination.page = pageNumber;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $stateParams.page = scope.pagination.page;
                    $location.search($stateParams);
                }
            };
            init();
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPaginator", [ "$location", "$stateParams", "EzPaginatorConfig", "EzConfigResolver", function($location, $stateParams, EzPaginatorConfig, EzConfigResolver) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/paginator/paginator.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            scope.$watch("pagination.pages", function(n, o) {
                if (n !== o) {
                    draw();
                }
            });
            scope.pagination.update = function() {
                scope.selectPage(scope.pagination.page);
            };
            function draw() {
                scope.pages = [];
                if (!scope.pagination.items) {
                    scope.pagination.items = [];
                }
                if (!scope.pagination.limit) {
                    scope.pagination.limit = scope.config.defaultLimit;
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
                }
                var _pageNumber = scope.pagination.page;
                if (_pageNumber !== 1) {
                    var offset = Math.floor(scope.config.maxPages / 2);
                    if (_pageNumber + offset > scope.pagination.pages) {
                        _pageNumber = scope.pagination.pages - scope.config.maxPages + 1;
                    } else {
                        _pageNumber = _pageNumber - offset;
                    }
                    if (_pageNumber < 1) {
                        _pageNumber = 1;
                    }
                }
                for (var i = 1, l = scope.pagination.pages; _pageNumber <= l && i <= scope.config.maxPages; i++) {
                    scope.pages.push({
                        text: _pageNumber,
                        number: _pageNumber
                    });
                    _pageNumber++;
                }
            }
            scope.selectPage = function(pageNumber, init) {
                if (!pageNumber) {
                    if (!useCallback) {
                        pageNumber = $location.search().page || scope.config.initialPage;
                    } else {
                        pageNumber = scope.config.initialPage;
                    }
                }
                pageNumber = parseInt(pageNumber, 10);
                if (pageNumber < 1) {
                    pageNumber = 1;
                } else if (pageNumber > scope.pagination.pages) {
                    pageNumber = scope.pagination.pages;
                }
                scope.pagination.page = pageNumber;
                if (!init) {
                    if (useCallback) {
                        scope.onChange(scope.pagination);
                    } else {
                        $stateParams.page = scope.pagination.page;
                        $location.search($stateParams);
                    }
                    if (!scope.pages.length || scope.pages[0].number > scope.pagination.page || !scope.pages[scope.config.maxPages - 1] || scope.pages[scope.config.maxPages - 1].number < scope.pagination.page) {
                        draw();
                    }
                }
            };
            scope.selectPage(null, true);
            draw();
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPaginatorState", [ "$stateParams", "$location", "EzConfigResolver", "EzPaginatorConfig", function($stateParams, $location, EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/state/state.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.state) {
                if (!useCallback) {
                    scope.pagination.state = $location.search().state;
                } else {
                    scope.pagination.state = scope.config.defaultState;
                }
            }
            scope.getName = function getState(id) {
                var state = scope.config.states[0];
                if (!!id) {
                    for (var i = 0; i < scope.config.states.length; i++) {
                        if (scope.config.states[i].id === id) {
                            state = scope.config.states[i];
                            break;
                        }
                    }
                }
                return state.name;
            };
            scope.setState = function(state) {
                scope.pagination.state = state.id;
                scope.pagination.page = 1;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $stateParams.state = state.id;
                    $stateParams.page = 1;
                    $location.search($stateParams);
                }
            };
        }
    };
} ]);




angular.module('ez.paginator').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('ez_paginator/bar/bar.html',
        "<div class=\"ez-paginator-bar\"><ez-paginator pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator><ez-paginator-limit ng-if=\"config.showLimit\" pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator-limit><ez-paginator-state ng-if=\"config.showState\" pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator-state></div>"
    );


    $templateCache.put('ez_paginator/limit/limit.html',
        "<span dropdown class=\"ez-paginator-limit\" ng-class=\"config.limitContainerClass\"><a dropdown-toggle ng-class=\"config.limitToggleClass\" title=\"Change Limit\">{{ pagination.limit }} <span class=\"caret\"></span></a><ul ng-class=\"config.limitDropdownMenuClass\"><li ng-repeat=\"limit in config.limits\" ng-class=\"{active: limit == pagination.limit}\"><a ng-click=\"setLimit(limit)\">{{ ::limit }}</a></li></ul></span>"
    );


    $templateCache.put('ez_paginator/pager/pager.html',
        "<ul class=\"ez-pager pager\"><li ng-class=\"{disabled: pagination.page <= 1}\"><a ng-click=\"selectPage(pagination.page - 1)\"><i class=\"{{::config.pagerPrevBtnIconClass}}\"></i> {{::config.pagerPrevBtnText}}</a></li><li ng-class=\"{disabled: pagination.page >= pagination.pages}\"><a ng-click=\"selectPage(pagination.page + 1)\">{{::config.pagerNextBtnText}} <i class=\"{{::config.pagerNextBtnIconClass}}\"></i></a></li></ul>"
    );


    $templateCache.put('ez_paginator/paginator/paginator.html',
        "<ul class=\"ez-paginator pagination\" ng-hide=\"pagination.page == 1 && pagination.pages == 1\"><li ng-if=\"::config.showBoundaryLinks\" ng-class=\"{disabled: pagination.page == 1}\" class=\"pagination-first\"><a ng-click=\"selectPage(1)\"><i class=\"{{::config.firstBtnIconClass}}\"></i> {{::config.firstBtnText}}</a></li><li ng-if=\"::config.showDirectionLinks\" ng-class=\"{disabled: pagination.page == 1}\" class=\"pagination-prev\"><a ng-click=\"selectPage(pagination.page - 1)\"><i class=\"{{::config.prevBtnIconClass}}\"></i> {{::config.prevBtnText}}</a></li><li ng-show=\"pages[0].number != 1\" class=\"pagination-left\"><a ng-click=\"selectPage(pages[0].number - config.maxPages)\">...</a></li><li ng-repeat=\"page in pages\" ng-class=\"{active: page.number == pagination.page}\" class=\"pagination-page\"><a ng-click=\"selectPage(page.number)\">{{::page.text}}</a></li><li ng-show=\"pages[pages.length -1].number != pagination.pages\" class=\"pagination-right\"><a ng-click=\"selectPage(pages[config.maxPages - 1].number + config.maxPages)\">...</a></li><li ng-if=\"::config.showDirectionLinks\" ng-class=\"{disabled: pagination.page >= pagination.pages}\" class=\"pagination-next\"><a ng-click=\"selectPage(pagination.page + 1)\">{{::config.nextBtnText}} <i class=\"{{::config.nextBtnIconClass}}\"></i></a></li><li ng-if=\"::config.showBoundaryLinks\" ng-class=\"{disabled: pages[pages.length - 1].number >= pagination.pages}\" class=\"pagination-last\"><a ng-click=\"selectPage(pagination.pages)\">{{::config.lastBtnText}} <i class=\"{{::config.lastBtnIconClass}}\"></i></a></li></ul>"
    );


    $templateCache.put('ez_paginator/state/state.html',
        "<span dropdown class=\"ez-paginator-state\" ng-class=\"config.stateContainerClass\"><a dropdown-toggle ng-class=\"config.stateToggleClass\" title=\"Change State\">{{ getName(pagination.state) }} <span class=\"caret\"></span></a><ul ng-class=\"config.stateDropdownMenuClass\"><li ng-repeat=\"state in config.states\" ng-class=\"{active: state.id == pagination.state}\"><a ng-click=\"setState(state)\">{{ ::state.name }}</a></li></ul></span>"
    );

}]);
