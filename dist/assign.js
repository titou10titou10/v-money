"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(defaults, extras) {
    defaults = defaults || {};
    extras = extras || {};
    return Object.keys(defaults).concat(Object.keys(extras))
        .reduce(function (acc, val) {
        acc[val] = extras[val] === undefined ? defaults[val] : extras[val];
        return acc;
    }, {});
}
