import ODynamicTable from './src/ODynamicTable.vue';

/* istanbul ignore next */
ODynamicTable.install = function (Vue) {
  Vue.component(ODynamicTable.name, ODynamicTable);
};

export default ODynamicTable;