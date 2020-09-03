import District from './src/main';

/* istanbul ignore next */
District.install = function(Vue) {
  Vue.component(District.name, District);
};

export default District;
