import VMoney from './directive';
import options from './options';

export { VMoney, options };

// https://github.com/luizhenriquerdias/v-money
// https://github.com/vuejs-tips/v-money/tree/master/src

function install(Vue, globalOptions) {
  if (globalOptions) {
    Object.keys(globalOptions).map(function(key) {
      options[key] = globalOptions[key];
    });
  }
  Vue.directive('money', VMoney);
}

export default install;
