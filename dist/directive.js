"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var assign_1 = require("./assign");
var options_1 = require("./options");
var lodash_1 = require("lodash");
function run(el, eventName, config, vnode) {
    var positionFromEnd = el.value.length - el.selectionEnd;
    el.value = utils_1.format(el.value, config);
    positionFromEnd = el.value.length - positionFromEnd;
    positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1); // left
    utils_1.setCursor(el, positionFromEnd);
    if (config.unmaskedVar) {
        lodash_1.set(vnode.context, config.unmaskedVar, utils_1.unformat(el.value, config.precision));
    }
    el.dispatchEvent(new Event(eventName));
}
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
function bind(el, binding, vnode) {
    if (binding.value === false) {
        return;
    }
    el = getInput(el);
    run(el, 'input', getConfig(binding), vnode);
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
    el = getInput(el);
    el.value = data ? data.value : el.value;
    run(el, 'input', getConfig(binding), vnode);
}
exports["default"] = { bind: bind, componentUpdated: componentUpdated };
