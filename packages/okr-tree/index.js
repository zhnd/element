import OkrTree from './src/okr-tree';

/* istanbul ignore next */
OkrTree.install = function(Vue) {
  Vue.component(OkrTree.name, OkrTree);
};

export default OkrTree;
