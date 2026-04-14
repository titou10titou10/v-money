"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = format;
exports.unformat = unformat;
exports.setCursor = setCursor;
const options_1 = __importDefault(require("./options"));
function format(input, opt = options_1.default) {
    const value = (typeof input === 'number')
        ? Number(input).toFixed(fixed(opt.precision))
        : input;
    const negative = value.indexOf('-') >= 0 ? '-' : '';
    const numbers = onlyNumbers(value);
    const currency = numbersToCurrency(numbers, opt.precision);
    const parts = toStr(currency).split('.');
    const [integerDirty, decimal] = parts;
    const integer = addThousandSeparator(integerDirty, opt.thousands);
    return (opt.prefix +
        negative +
        joinIntegerAndDecimal(integer, decimal, opt.decimal) +
        opt.suffix);
}
function unformat(input, precision) {
    const negative = input.indexOf('-') >= 0 ? -1 : 1;
    const numbers = onlyNumbers(input);
    const currency = numbersToCurrency(numbers, precision);
    return parseFloat(currency) * negative;
}
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
    const exp = Math.pow(10, precision);
    const float = parseFloat(numbers) / exp;
    return float.toFixed(fixed(precision));
}
function addThousandSeparator(integer, separator) {
    return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}
function joinIntegerAndDecimal(integer, decimal, separator) {
    return decimal ? integer + separator + decimal : integer;
}
function toStr(value) {
    return value ? value.toString() : '';
}
function setCursor(el, position) {
    const setSelectionRange = function () {
        el.setSelectionRange(position, position);
    };
    if (el === document.activeElement) {
        setSelectionRange();
        const timeoutId = setTimeout(setSelectionRange, 1); // Android Fix
        clearTimeout(timeoutId);
    }
}
