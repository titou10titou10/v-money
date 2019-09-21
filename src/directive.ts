import { set } from 'lodash';

import { format, unformat, setCursor } from './utils';
import assign from './assign';
import opt from './options';

function run(el , eventName: string, config, vnode) {

  // Handle when initial value is not set
  const beforeValue = el.value === 'undefined' ? '' : el.value;

  let positionFromEnd = beforeValue.length - el.selectionEnd;
  el.value = format(beforeValue, config);
  positionFromEnd = el.value.length - positionFromEnd;
  positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1); // left
  setCursor(el, positionFromEnd);

  if (config.unmaskedVar) {
    set(vnode.context,
        config.unmaskedVar,
        unformat(el.value, config.precision)
        );
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
    } else { el = els[0]; }
  }
  return el;
}

function getConfig(binding) {
  if (!binding.value) { return opt; }
  return assign(opt, binding.value);
}

// -------------------------------
// Vue.js directive hook functions
// -------------------------------
function bind(el, binding, vnode) {
  if (binding.value === false) { return; }

  const realEl = getInput(el);
  run(realEl, 'input', getConfig(binding), vnode);
}

function componentUpdated(el, binding, vnode, oldVnode) {
  if (binding.value === false) { return; }

  // Prevent firing endless events
  const data = vnode.data.props || vnode.data.model;
  const oldData = oldVnode.data.props || oldVnode.data.model;
  if (data && data.value === oldData.value) { return; }

  const realEl = getInput(el);
  realEl.value = data ? data.value : realEl.value;
  run(realEl, 'input', getConfig(binding), vnode);
}

export default { bind, componentUpdated };
