angular.module('product-selector.route', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('product-selector', {
                url: "/product-selector",
                views: {
                    '': {
                        controller: "ProductSelectorCtrl",
                        templateUrl: "product-selector/product-selector.html"
                    },
                    'fab@product-selector': {
                        templateUrl: 'shared/product-fab-actions.html'
                    }
                }
            })
            .state('single-btn-product-selector', {
                url: "/product-selector",
                views: {
                    '': {
                        controller: "ProductSelectorCtrl",
                        templateUrl: "product-selector/product-selector.html"
                    },
                    'fab@single-btn-product-selector': {
                        templateUrl: 'product-selector/single-fab-in-selector.html'
                    }
                }

            });
    }]);
