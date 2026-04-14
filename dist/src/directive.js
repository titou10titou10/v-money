"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const assign_1 = __importDefault(require("./assign"));
const options_1 = __importDefault(require("./options"));
function run(el, eventName, config, vnode) {
    // Handle when initial value is not set
    const beforeValue = el.value === 'undefined' ? '' : el.value;
    let positionFromEnd = beforeValue.length - el.selectionEnd;
    el.value = (0, utils_1.format)(beforeValue, config);
    positionFromEnd = Math.max(positionFromEnd, options_1.default.suffix.length); // right
    positionFromEnd = el.value.length - positionFromEnd;
    positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1); // left
    (0, utils_1.setCursor)(el, positionFromEnd);
    if (config.unmaskedVar) {
        (0, lodash_1.set)(vnode.context, config.unmaskedVar, (0, utils_1.unformat)(el.value, config.precision));
    }
    // Notify listeners only if value changed (ie send an extra 'input' event)
    if (beforeValue !== el.value) {
        el.dispatchEvent(new Event(eventName));
    }
}
// -------
// Helpers
// -------
function getInput(el) {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const els = el.getElementsByTagName('input');
        if (els.length !== 1) {
            throw new Error(`v-money requires 1 input, found ${els.length}`);
        }
        else {
            el = els[0];
        }
    }
    return el;
}
function getConfig(binding) {
    if (!binding.value) {
        return options_1.default;
    }
    return (0, assign_1.default)(options_1.default, binding.value);
}
// -------------------------------
// Vue.js directive hook functions
// -------------------------------
function bind(el, binding, vnode) {
    if (binding.value === false) {
        return;
    }
    const realEl = getInput(el);
    run(realEl, 'input', getConfig(binding), vnode);
}
function componentUpdated(el, binding, vnode, oldVnode) {
    if (binding.value === false) {
        return;
    }
    // Prevent firing endless events
    const data = vnode.data.props || vnode.data.model;
    const oldData = oldVnode.data.props || oldVnode.data.model;
    if (data && data.value === oldData.value) {
        return;
    }
    const realEl = getInput(el);
    realEl.value = data ? data.value : realEl.value;
    run(realEl, 'input', getConfig(binding), vnode);
}
exports.default = { bind, componentUpdated };
