"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
var assign_1 = require("./assign");
var options_1 = require("./options");
function run(el, eventName, config, vnode) {
    // Handle when initial value is not set
    var beforeValue = el.value === 'undefined' ? '' : el.value;
    var positionFromEnd = beforeValue.length - el.selectionEnd;
    el.value = utils_1.format(beforeValue, config);
    positionFromEnd = Math.max(positionFromEnd, options_1["default"].suffix.length); // right
    positionFromEnd = el.value.length - positionFromEnd;
    positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1); // left
    utils_1.setCursor(el, positionFromEnd);
    if (config.unmaskedVar) {
        lodash_1.set(vnode.context, config.unmaskedVar, utils_1.unformat(el.value, config.precision));
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
        var els = el.getElementsByTagName('input');
        if (els.length !== 1) {
            throw new Error("v-money requires 1 input, found " + els.length);
        }
        else {
            el = els[0];
        }
    }
    return el;
}
function getConfig(binding) {
    if (!binding.value) {
        return options_1["default"];
    }
    return assign_1["default"](options_1["default"], binding.value);
}
// -------------------------------
// Vue.js directive hook functions
// -------------------------------
function bind(el, binding, vnode) {
    if (binding.value === false) {
        return;
    }
    var realEl = getInput(el);
    run(realEl, 'input', getConfig(binding), vnode);
}
function componentUpdated(el, binding, vnode, oldVnode) {
    if (binding.value === false) {
        return;
    }
    // Prevent firing endless events
    var data = vnode.data.props || vnode.data.model;
    var oldData = oldVnode.data.props || oldVnode.data.model;
    if (data && data.value === oldData.value) {
        return;
    }
    var realEl = getInput(el);
    realEl.value = data ? data.value : realEl.value;
    run(realEl, 'input', getConfig(binding), vnode);
}
exports["default"] = { bind: bind, componentUpdated: componentUpdated };
