angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("product-selector/manufacture-list-selector.html","<ion-list style=\"background-color: white\">\n    <ion-item class=\"list-item\" ng-click=\"selectManufacture(undefined)\">\n        <p ng-class=\"{\'text-primary\': search.manufacture == undefined}\"> 不限 </p>\n    </ion-item>\n    <ion-item class=\"list-item\" ng-repeat=\"manufacture in manufactureList\" ng-click=\"selectManufacture(manufacture)\">\n        <p ng-class=\"{\'text-primary\': search.manufacture == manufacture}\"> {{ manufacture.name }} </p>\n    </ion-item>\n</ion-list>");
$templateCache.put("product-selector/product-search-list.html","<md-list style=\"background-color: white\">\n    <md-list-item class=\"md-2-line\" ng-repeat=\"product in productList\" md-no-ink>\n        <div class=\"md-list-item-text\" layout flex style=\"margin-right: 40px;\"\n             ng-click=\"goState(\'fund-detail\', {productId: product.productId});$event.stopPropagation();\">\n            <div layout=\"column\" flex=\"60\">\n                <h3 class=\"line-height-normal\">\n                    {{product.fundName}}\n                </h3>\n\n                <p>\n                    {{product.codes}} <span class=\"padding-left\">{{product.mainCodeName}}</span>\n                </p>\n            </div>\n            <div flex=\"40\" layout=\"column\" layout-align=\"center end\" class=\"text-right\">\n                <h3 ng-class=\"getProfitLossTextColor(product.month3)\">\n                    {{product.month3 | number:2}}\n                    <performance-icon value=\"product.month3\"></performance-icon>\n                </h3>\n\n                <p>\n                    近三月\n                </p>\n            </div>\n        </div>\n        <md-checkbox aria-label=\'选择基金\' class=\"md-secondary\"\n                     ng-model=\"selection.selectedIds[product.productId]\" aria-label=\"选中\"\n                     ng-change=\"selectProduct(product);$event.stopPropagation()\"></md-checkbox>\n    </md-list-item>\n</md-list>\n");
$templateCache.put("product-selector/product-selector.html","<ion-view title=\"筛选器\">\n    <ion-nav-buttons side=\"left\">\n        <back></back>\n        <button class=\"button button-clear padding-right\" ng-click=\"cancelSelected()\"\n                ng-if=\"selection.getSelectedIds().length\">取消\n        </button>\n        <label class=\"col-center\"\n               ng-if=\"selection.getSelectedIds().length\">{{selection.getSelectedIds().length}}</label>\n    </ion-nav-buttons>\n    <ion-nav-buttons side=\"right\">\n        <md-button class=\"md-icon-button subheader-icon-button\" ng-click=\"showSearchView()\" aria-label=\"搜索\">\n            <md-icon style=\"color:white\" md-svg-icon=\"img/magnify.svg\"></md-icon>\n        </md-button>\n    </ion-nav-buttons>\n    <div class=\"bar bar-subheader shadow-z1\">\n        <div layout>\n            <md-button flex ng-click=\"showType()\" md-no-ink class=\"subheader-button md-primary\"\n                       ng-class=\"{ \'md-raised\' : isTypeShowed}\">类型\n            </md-button>\n            <md-button flex ng-click=\"showYield()\" md-no-ink class=\"subheader-button md-primary\"\n                       ng-class=\"{ \'md-raised\' : isYieldShowed}\">收益率\n            </md-button>\n            <md-button flex ng-click=\"showManufacture()\" md-no-ink class=\"subheader-button md-primary\"\n                       ng-class=\"{ \'md-raised\' : isManuShowed}\">公司\n            </md-button>\n        </div>\n    </div>\n    <div ng-if=\"isTypeShowed\" ng-click=\"toggleSearch()\" class=\"ng-cloak below-subheader animate-show\">\n        <div layout class=\"search-box\" ng-click=\"$event.stopPropagation();\">\n            <div ng-include=\"\'product-selector/type-list-selector.html\'\" flex></div>\n        </div>\n    </div>\n    <div ng-if=\"isManuShowed\" ng-click=\"toggleSearch()\" class=\"ng-cloak below-subheader animate-show\">\n        <div layout class=\"search-box\" ng-click=\"$event.stopPropagation();\">\n            <div ng-include=\"\'product-selector/manufacture-list-selector.html\'\" flex></div>\n        </div>\n    </div>\n    <div ng-if=\"isYieldShowed\" ng-click=\"toggleSearch()\" class=\"ng-cloak below-subheader animate-show\">\n        <div layout class=\"search-box\" ng-click=\"$event.stopPropagation();\">\n            <div ng-include=\"\'product-selector/yield-list-selector.html\'\" flex></div>\n        </div>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ng-include src=\"\'shared/progress.html\'\"></ng-include>\n        <div ng-include=\"\'product-selector/product-search-list.html\'\"></div>\n        <ion-infinite-scroll immediate-check=\"false\" ng-if=\"productList.length && hasMoreData\" on-infinite=\"loadMore()\"\n                             spinner=\"android\">\n        </ion-infinite-scroll>\n    </ion-content>\n    <ui-view name=\"fab\"></ui-view>\n</ion-view>\n");
$templateCache.put("product-selector/single-fab-in-selector.html","<md-button class=\"md-fab mfb-br-position\" aria-label=\"确定\" ng-click=\"confirm()\">\n    <md-icon md-svg-icon=\"img/ic_done_24px.svg\"></md-icon>\n</md-button>\n");
$templateCache.put("product-selector/type-list-selector.html","<ion-list style=\"background-color: white\">\n    <ion-item class=\"list-item\" ng-click=\"selectType(undefined)\">\n        <p ng-class=\"{\'text-primary\': search.maincode == undefined}\"> 不限 </p>\n    </ion-item>\n    <ion-item class=\"list-item\" ng-repeat=\"maincode in typeList\" ng-click=\"selectType(maincode)\">\n        <p ng-class=\"{\'text-primary\': search.maincode == maincode}\"> {{ maincode.name }} </p>\n    </ion-item>\n</ion-list>\n");
$templateCache.put("product-selector/yield-list-selector.html","<div layout style=\"background-color: white\">\n    <div flex=\"50\" style=\"border-right:1px solid #eeeeee\">\n        <ion-list>\n            <ion-item class=\"list-item\" ng-click=\"deselectPeriod()\">\n                <p ng-class=\"{\'text-primary\': search.period == undefined }\"> 不限 </p>\n            </ion-item>\n            <ion-item class=\"list-item\" ng-repeat=\"period in periods\" ng-click=\"selectPeriod(period)\">\n                <p ng-class=\"{\'text-primary\': search.period == period}\"> {{ period.name }} </p>\n            </ion-item>\n        </ion-list>\n    </div>\n    <div flex=\"50\" ng-show=\"isYieldValueShowed\">\n        <ion-list>\n            <ion-item class=\"list-item\" ng-repeat=\"yield in yields\" ng-click=\"selectYield(yield)\">\n                <p ng-class=\"{\'text-primary\': search.yield == yield}\"> {{ yield.name }} </p>\n            </ion-item>\n        </ion-list>\n    </div>\n</div>\n\n");}]);