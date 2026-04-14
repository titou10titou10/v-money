"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.money = void 0;
const directive_1 = __importDefault(require("./directive"));
exports.money = directive_1.default;
const options_1 = __importDefault(require("./options"));
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
