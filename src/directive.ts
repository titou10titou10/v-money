import { format, unformat, setCursor } from './utils';
import assign from './assign';
import opt from './options';
import { set } from 'lodash';

function run(el , eventName: string, config, vnode) {
  let positionFromEnd = el.value.length - el.selectionEnd;
  el.value = format(el.value, config);
  positionFromEnd = el.value.length - positionFromEnd;
  positionFromEnd = Math.max(positionFromEnd, config.prefix.length + 1); // left
  setCursor(el, positionFromEnd);

  if (config.unmaskedVar) {
    set(vnode.context,
        config.unmaskedVar,
        unformat(el.value, config.precision)
        );
  }

  el.dispatchEvent(new Event(eventName));
}

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

function bind(el, binding, vnode) {
  if (binding.value === false) { return; }

  el = getInput(el);
  run(el, 'input', getConfig(binding), vnode);
}

function componentUpdated(el, binding, vnode, oldVnode) {
  if (binding.value === false) { return; }

  // Prevent firing endless events
  const data = vnode.data.props || vnode.data.model;
  const oldData = oldVnode.data.props || oldVnode.data.model;
  if (data && data.value === oldData.value) { return; }

  el = getInput(el);
  el.value = data ? data.value : el.value;
  run(el, 'input', getConfig(binding), vnode);
}

export default { bind, componentUpdated };
