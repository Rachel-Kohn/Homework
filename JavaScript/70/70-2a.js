window.app = (function () {
    'use strict';

    let count = 0;

    return {
        counter: {
            increment: function () { count++; },
            getCount: function () { return count; }
        }
    };
})();