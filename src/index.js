import OTableTransfer from '../packages/OTableTransfer/index.js'; // 列表穿梭框
import ODynamicTable from '../packages/ODynamicTable/index.js';  // 动态表格
import OPagination from '../packages/OPagination/index.js';  // 分页
import OTreeSelect from '../packages/OTreeSelect/index.js';  // 树形选择器

const components = [
  OTableTransfer,
  ODynamicTable,
  OPagination,
  OTreeSelect
]

const install = function (Vue, opts = {}) {
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  // Vue.use(InfiniteScroll);
  // Vue.use(Loading.directive);

  // Vue.prototype.$ELEMENT = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  OTableTransfer,
  ODynamicTable,
  OPagination,
  OTreeSelect
}