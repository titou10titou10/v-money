"use strict";
exports.__esModule = true;
function default_1(defaults, extras) {
    defaults = defaults || {};
    extras = extras || {};
    return Object.keys(defaults).concat(Object.keys(extras))
        .reduce(function (acc, val) {
        acc[val] = extras[val] === undefined ? defaults[val] : extras[val];
        return acc;
    }, {});
}
exports["default"] = default_1;
