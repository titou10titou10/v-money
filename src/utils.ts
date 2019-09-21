import defaults from './options';

function format(input, opt = defaults) {

  const value = (typeof input === 'number')
              ? Number(input).toFixed(fixed(opt.precision))
              : input;

  const negative = value.indexOf('-') >= 0 ? '-' : '';

  const numbers = onlyNumbers(value);
  const currency = numbersToCurrency(numbers, opt.precision);
  const parts = toStr(currency).split('.');
  const [integerDirty, decimal] = parts;
  const integer = addThousandSeparator(integerDirty, opt.thousands);
  return (
    opt.prefix +
    negative +
    joinIntegerAndDecimal(integer, decimal, opt.decimal) +
    opt.suffix
  );
}

function unformat(input, precision: number) {
  const negative = input.indexOf('-') >= 0 ? -1 : 1;
  const numbers = onlyNumbers(input);
  const currency = numbersToCurrency(numbers, precision);
  return parseFloat(currency) * negative;
}

function onlyNumbers(input) {
  return toStr(input).replace(/\D+/g, '') || '0';
}

function fixed(precision: number) {
  return between(0, precision, 20);
}

function between(min: number, n: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

function numbersToCurrency(numbers, precision: number) {
  const exp = Math.pow(10, precision);
  const float = parseFloat(numbers) / exp;
  return float.toFixed(fixed(precision));
}

function addThousandSeparator(integer, separator: string) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}

function joinIntegerAndDecimal(integer, decimal, separator: string) {
  return decimal ? integer + separator + decimal : integer;
}

function toStr(value) {
  return value ? value.toString() : '';
}

function setCursor(el, position: number) {
  const setSelectionRange = function() {
    el.setSelectionRange(position, position);
  };
  if (el === document.activeElement) {
    setSelectionRange();
    const timeoutId = setTimeout(setSelectionRange, 1) ; // Android Fix
    clearTimeout(timeoutId);
  }
}

export { format, unformat, setCursor };
