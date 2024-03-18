import OPagination from './src/OPagination.vue';

/* istanbul ignore next */
OPagination.install = function (Vue) {
  Vue.component(OPagination.name, OPagination);
};

export default OPagination;