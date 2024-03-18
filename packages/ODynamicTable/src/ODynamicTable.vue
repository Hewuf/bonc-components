<template>
  <div class="footer-box container-box--background">
    <el-table
      ref="table"
      :data="dataSource"
      @selection-change="(selection) => $emit('selection-change', selection)"
      @sort-change="(e) => $emit('sort-change', e)"
      :header-cell-style="{ 'text-align': 'center' }"
      :summary-method="getSummaries"
      :show-summary="showSummary"
    >
      <slot name="left"></slot>
      <template v-for="item in columns">
        <el-table-column
          v-if="item.ifShow === '1'"
          :key="item.columnCode"
          :prop="item.columnCode"
          :min-width="item.columnWidth"
          :show-overflow-tooltip="
            item.showOverflowTooltip === false ? false : true
          "
          :align="item.formatFun === 'money' ? 'right' : 'center'"
          :sortable="item.ifOrder === '1' ? 'custom' : false"
        >
          <template slot="header">
            <slot name="columnHeader" v-bind:column="item">
              {{ item.columnName }}
            </slot>
          </template>
          <template slot-scope="scope">
            <!-- 码值 -->
            <dict-tag
              v-if="item.formatFun === 'dict'"
              :options="dict[item.param]"
              :value="scope.row[item.columnCode]"
            />
            <!-- 开关 -->
            <el-switch
              v-else-if="item.formatFun === 'switch'"
              v-model="scope.row[item.columnCode]"
              active-value="1"
              inactive-value="0"
              @change="$emit('switch-change', scope.row)"
            />
            <!-- 金额格式化 -->
            <span v-else-if="item.formatFun === 'money'">{{
              format(scope.row[item.columnCode])
            }}</span>
            <!-- 自定义插槽 -->
            <div v-else-if="item.formatFun === 'customSlot'">
              <slot :name="item.param" v-bind:row="scope.row"></slot>
            </div>
            <!-- 其他 -->
            <span v-else>{{ scope.row[item.columnCode] }}</span>
          </template>
        </el-table-column>
      </template>
      <!-- 操作列等自定义列 -->
      <slot name="right"></slot>
    </el-table>
    <o-pagination
      v-show="ipagination.total > 0"
      :total="ipagination.total"
      :page.sync="ipagination.pageNum"
      :limit.sync="ipagination.pageSize"
      @pagination="queryTable"
    />
  </div>
</template>
<script>
import OPagination from "@packages/OPagination/src/OPagination.vue";
import { formatMoney } from "@/utils/commonSettings";

export default {
  name: "ODynamicTable",
  components: {
    OPagination,
  },
  props: {
    ipagination: {
      type: Object,
      default: null,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    dict: {
      type: Object,
      default: () => ({}),
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    getSummaries: {
      type: Function,
    },
  },
  methods: {
    queryTable(val) {
      this.$emit("queryTable", val);
    },
    format(val) {
      return formatMoney(val);
    },
  },
};
</script>
