"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.money = void 0;
var directive_1 = require("./directive");
exports.money = directive_1.default;
var options_1 = require("./options");
exports.options = options_1.default;
// https://github.com/luizhenriquerdias/v-money
// https://github.com/vuejs-tips/v-money/tree/master/src
/* tslint:disable-next-line:variable-name */
function install(Vue, globalOptions) {
    if (globalOptions) {
        Object.keys(globalOptions).map(function (key) {
            options_1.default[key] = globalOptions[key];
        });
    }
    Vue.directive('money', directive_1.default);
}
exports.default = install;
