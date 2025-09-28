window.app = (function (module) {
    'use strict';

    let countersCreated = 0;

    module.createCounter = function () {
        let count = 0;
        countersCreated++;
        return {
            increment: function () { count++; },
            getCount: function () { return count; }
        };
    };

    module.getCountersCreated = function () {
        return countersCreated;
    };

    return module;

})(window.app || {});