angular.module('product-selector.controller', [])
    .controller("ProductSelectorCtrl", ['SubscribeService', 'ChartCenterService', '$timeout', 'MainCodeService', 'ManufactureService',
        '$ionicFilterBar', '$scope', 'ProductSelectorService', '$ionicHistory', '$state', 'FavouriteService', '$mdToast',
        '$rootScope', 'Selection', 'action',
        function (SubscribeService, ChartCenterService, $timeout, MainCodeService, ManufactureService, $ionicFilterBar, $scope,
                  ProductSelectorService, $ionicHistory, $state, FavouriteService, $mdToast, $rootScope, Selection, action) {
            "use strict";

            $scope.loading = true;
            $scope.page = 0;
            $scope.productList = [];
            $scope.typeList = [];
            $scope.manufactureList = [];
            $scope.hasMoreData = true;

            $scope.search = {
                maincode: undefined,
                manufacture: undefined,
                period: undefined,
                yield: undefined
            };

            $scope.selection = Selection.build();

            $scope.periods = [{
                name: '一周',
                value: 'week1cum'
            }, {
                name: '一个月',
                value: 'month1cum'
            }, {
                name: '三个月',
                value: 'month3cum'
            }, {
                name: '近半年',
                value: 'month6cum'
            }, {
                name: '近一年',
                value: 'year1cum'
            }, {
                name: '今年以来',
                value: 'yearToDateCum'
            }, {
                name: '成立以来',
                value: 'sinceLaunchCum'
            }];

            $scope.yields = [{
                name: '小于0%',
                value: 'lt0'
            }, {
                name: '大于0%',
                value: 'ge0'
            }, {
                name: '大于5%',
                value: 'ge5'
            }, {
                name: '大于10%',
                value: 'ge10'
            }, {
                name: '大于30%',
                value: 'ge30'
            }, {
                name: '大于50%',
                value: 'ge50'
            }];

            function getProductList(isSearch) {
                if (isSearch) {
                    $scope.page = 0;
                    $scope.productList = [];
                }
                ProductSelectorService.getProductList($scope.page, $scope.search).then(function (data) {
                    if (!data.length) {
                        $scope.hasMoreData = false;
                    }
                    $scope.productList = $scope.productList.concat(data);
                    console.log($scope.productList.length);
                    angular.forEach($scope.productList, function (product) {
                        product.selectFlag = false;
                    });
                    $scope.page = $scope.page + 1;
                    $scope.loading = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            $scope.showSearchView = function () {
                if ($scope.productList) {
                    $ionicFilterBar.show({
                        items: $scope.productList,
                        update: function (filteredItems) {
                            $scope.productList = filteredItems;
                        },
                        filterProperties: ['fundName', 'namePinyin', 'codes']
                    });
                } else {
                    $mdToast.show($mdToast.simple().content('请等待数据加载完毕'));
                }

            };

            $scope.selectProduct = function (product) {
                var myProduct = {
                    productId: product.productId,
                    fundName: product.fundName
                };
                $scope.selection.setSelect(product.productId, myProduct);
                if ($scope.selection.getSelectedIds().length) {
                    $scope.showFab = true;
                } else {
                    $scope.showFab = false;
                }

            };

            $scope.isTypeShowed = false;
            $scope.isManuShowed = false;
            $scope.isYieldShowed = false;
            $scope.isYieldValueShowed = false;

            $scope.showType = function () {
                if ($scope.isManuShowed) {
                    $scope.isManuShowed = false;
                }
                if ($scope.isYieldShowed) {
                    $scope.isYieldShowed = false;
                }
                $scope.isTypeShowed = !$scope.isTypeShowed;
            };

            $scope.showManufacture = function () {
                if ($scope.isTypeShowed) {
                    $scope.isTypeShowed = false;
                }
                if ($scope.isYieldShowed) {
                    $scope.isYieldShowed = false;
                }
                $scope.isManuShowed = !$scope.isManuShowed;
            };

            $scope.showYield = function () {
                if ($scope.isTypeShowed) {
                    $scope.isTypeShowed = false;
                }
                if ($scope.isManuShowed) {
                    $scope.isManuShowed = false;
                }
                $scope.isYieldShowed = !$scope.isYieldShowed;
            };

            $scope.selectType = function (type) {
                $scope.search.maincode = type;
                $scope.isTypeShowed = false;
                getProductList(true);
            };

            $scope.selectManufacture = function (manufacture) {
                $scope.search.manufacture = manufacture;
                $scope.isManuShowed = false;
                getProductList(true);
            };

            $scope.deselectPeriod = function () {
                $scope.search.period = undefined;
                $scope.search.yield = undefined;
                $scope.isYieldValueShowed = false;
                $scope.isYieldShowed = false;
                getProductList(true);
            };

            $scope.selectPeriod = function (period) {
                $scope.search.period = period;
                $scope.isYieldValueShowed = true;
            };

            $scope.selectYield = function (yield1) {
                $scope.search.yield = yield1;
                $scope.isYieldShowed = false;
                getProductList(true);
            };

            $scope.toggleSearch = function () {
                $scope.isTypeShowed = false;
                $scope.isManuShowed = false;
                $scope.isYieldShowed = false;
            };

            $scope.loadMore = function () {
                getProductList(false);
            };

            $scope.$on('$stateChangeSuccess', function () {
                $scope.loadMore();
            });

            $scope.confirm = function () {
                if ($scope.selection.getSelectedIds().length) {
                    $ionicHistory.goBack();
                    $rootScope.$broadcast('event-products', {
                        products: $scope.selection.getSelectedObjects()
                    });
                } else {
                    $mdToast.show($mdToast.simple("获取选择的基金失败，也许你还没有选择基金."));
                }
            };

            $scope.cancelSelected = function () {
                $scope.selection.clear();
            };

            $scope.entered = false;
            $scope.$on('$ionicView.enter', function () {
                if (!$scope.entered) {
                    $scope.entered = true;

                    ManufactureService.getAll().then(function (manufactures) {
                        $scope.manufactureList = manufactures;
                    });

                    MainCodeService.getAll().then(function (maincodes) {
                        $scope.typeList = maincodes;
                    });
                    $scope.actions = action.getGeneralAction();
                }
            });

        }]);
