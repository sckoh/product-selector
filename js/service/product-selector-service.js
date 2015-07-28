angular.module('product-selector.service', [])
    .factory('ProductSelectorService', ['$http', 'domain', 'LocaleUtils', function ($http, domain, LocaleUtils) {
        "use strict";

        return {
            getProductList: function (page, search) {
                var params = {
                    locale: LocaleUtils.getLocale(),
                    enableTypes: 'buyEnable',
                    page: page,
                    resultPerPage: 20
                };
                if (search.maincode) {
                    params.mainCodeId = search.maincode.productFundMainCode.productFundMainCodeId;
                }
                if (search.manufacture) {
                    params.manufactureId = search.manufacture.manufacture.manufactureId;
                }
                if (search.period && search.yield) {
                    params.period = search.period.value;
                    params.yield = search.yield.value;
                }

                return $http({
                    method: 'GET',
                    url: domain + '/api/products',
                    params: params
                }).then(function (response) {
                    return response.data.data;
                });
            }

        };
    }]);
