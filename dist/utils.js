"use strict";
exports.__esModule = true;
var options_1 = require("./options");
function format(input, opt) {
    if (opt === void 0) { opt = options_1["default"]; }
    var value = (!isNaN(input))
        ? Number(input).toFixed(fixed(opt.precision))
        : '0';
    var negative = value.indexOf('-') >= 0 ? '-' : '';
    var numbers = onlyNumbers(value);
    var currency = numbersToCurrency(numbers, opt.precision);
    var parts = toStr(currency).split('.');
    var integerDirty = parts[0], decimal = parts[1];
    var integer = addThousandSeparator(integerDirty, opt.thousands);
    return (opt.prefix +
        negative +
        joinIntegerAndDecimal(integer, decimal, opt.decimal) +
        opt.suffix);
}
exports.format = format;
function unformat(input, precision) {
    var negative = input.indexOf('-') >= 0 ? -1 : 1;
    var numbers = onlyNumbers(input);
    var currency = numbersToCurrency(numbers, precision);
    return parseFloat(currency) * negative;
}
exports.unformat = unformat;
function onlyNumbers(input) {
    return toStr(input).replace(/\D+/g, '') || '0';
}
function fixed(precision) {
    return between(0, precision, 20);
}
function between(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
function numbersToCurrency(numbers, precision) {
    var exp = Math.pow(10, precision);
    var float = parseFloat(numbers) / exp;
    return float.toFixed(fixed(precision));
}
function addThousandSeparator(integer, separator) {
    return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, "$1" + separator);
}
function joinIntegerAndDecimal(integer, decimal, separator) {
    return decimal ? integer + separator + decimal : integer;
}
function toStr(value) {
    return value ? value.toString() : '';
}
function setCursor(el, position) {
    var setSelectionRange = function () {
        el.setSelectionRange(position, position);
    };
    if (el === document.activeElement) {
        setSelectionRange();
        var timeoutId = setTimeout(setSelectionRange, 1); // Android Fix
        clearTimeout(timeoutId);
    }
}
exports.setCursor = setCursor;
