import money from './directive';
import options from './options';

export { money, options };

// https://github.com/luizhenriquerdias/v-money
// https://github.com/vuejs-tips/v-money/tree/master/src

/* tslint:disable-next-line:variable-name */
function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.keys(globalOptions).map(function(key) {
      options[key] = globalOptions[key];
    });
  }
  Vue.directive('money', money);
}

export default install;
