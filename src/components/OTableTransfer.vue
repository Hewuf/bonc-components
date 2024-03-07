<template>
  <div class="custom-transfer" :value="value">
    <!-- 穿梭框左侧列表 -->
    <div class="item-left">
      <div class="title-detail mb20">
        <div></div>
        <el-form
          ref="queryForm"
          :model="leftParams"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item :label="searchName" :prop="searchKey">
            <el-input
              v-model="leftParams[searchKey]"
              placeholder="请输入关键字"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleSearch('left')"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="leftMultipleTable"
        :data="leftList"
        :row-key="rowKey"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        fit
        @selection-change="leftSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :selectable="selectable"
          reserve-selection
        />
        <el-table-column
          v-if="showPagination === 'all' || showPagination === 'left'"
          type="index"
          label="序号"
          width="60"
          :index="leftIndexMethod"
        />
        <el-table-column v-else label="序号" width="60" prop="index">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }} </span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        />
        <!-- 自定义列 -->
        <slot name="left"></slot>
      </el-table>
      <pagination
        v-if="showPagination === 'all' || showPagination === 'left'"
        v-show="leftTotal > 0"
        :total="leftTotal"
        :page.sync="leftParams.pageNum"
        :limit.sync="leftParams.pageSize"
        @pagination="paginationChange('left')"
      />
    </div>

    <!-- 穿梭框中间按钮 -->
    <div class="item-btn">
      <el-button
        type="primary"
        icon="el-icon-d-arrow-right"
        plain
        @click="onTransfer('right')"
      />
      <el-button
        type="primary"
        icon="el-icon-d-arrow-left"
        plain
        @click="onTransfer('left')"
      />
    </div>

    <!-- 穿梭框右侧列表 -->
    <div class="item-right">
      <div class="title-detail mb20">
        <div></div>
        <el-form
          ref="queryForm"
          :model="leftParams"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item :label="searchName" :prop="searchKey">
            <el-input
              v-model="rightParams[searchKey]"
              placeholder="请输入关键字"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleSearch('right')"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="rightMultipleTable"
        :data="value"
        :row-key="rowKey"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        fit
        @selection-change="rightSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          reserve-selection
        />
        <el-table-column
          v-if="showPagination === 'all' || showPagination === 'right'"
          type="index"
          label="序号"
          width="60"
          :index="rightIndexMethod"
        />
        <el-table-column v-else label="序号" width="60" prop="index">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }} </span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        />
        <!-- 自定义列 -->
        <slot name="right"></slot>
      </el-table>
      <o-pagination
        v-if="showPagination === 'all' || showPagination === 'right'"
        v-show="rightTotal > 0"
        :total="rightTotal"
        :page.sync="rightParams.pageNum"
        :limit.sync="rightParams.pageSize"
        @pagination="paginationChange('right')"
      />
    </div>
  </div>
</template>

<script>
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
} from "element-ui";
import OPagination from "./OPagination.vue";

export default {
  name: "OTableTransfer",
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    OPagination,
  },
  props: {
    // 左侧列表数据
    leftList: {
      type: Array,
      default: () => [],
    },
    // 右侧列表数据
    value: {
      type: Array,
      default: () => [],
    },
    // 左右列表接口
    fn: {
      type: Object,
      default: () => {
        return {
          left: () => {},
          right: () => {},
        };
      },
    },
    // 列表row-key
    rowKey: {
      type: String,
      default: "id",
    },
    // 左侧表格表头
    columns: {
      type: Array,
      default: () => [],
    },
    // 左侧表格总数，分页时为必传
    leftTotal: {
      type: Number,
      default: 0,
    },
    // 右侧表格总数，分页时为必传
    rightTotal: {
      type: Number,
      default: 0,
    },
    // 是否展示搜索框，all:全部展示，left:左侧展示，right:右侧展示，none:全部不展示
    showSearch: {
      type: String,
      default: "none",
    },
    // 筛选条件名称
    searchName: {
      type: String,
      default: "",
    },
    // 筛选条件key
    searchKey: {
      type: String,
      default: "id",
    },
    // 是否展示分页，all:全部展示，left:左侧展示，right:右侧展示，none:全部不展示
    showPagination: {
      type: String,
      default: "none",
    },
  },
  data() {
    return {
      rightSelectedRows: [], // 右侧选中的行
      leftSelectedRows: [], // 左侧选中的行
      leftParams: {
        pageNum: 1,
        pageSize: 10,
        [this.searchKey]: "",
      },
      rightParams: {
        pageNum: 1,
        pageSize: 10,
        [this.searchKey]: "",
      },
    };
  },
  methods: {
    /**
     * 自定义索引
     */
    leftIndexMethod(index) {
      return (
        index + 1 + (this.leftParams.pageNum - 1) * this.leftParams.pageSize
      );
    },
    rightIndexMethod(index) {
      return (
        index + 1 + (this.rightParams.pageNum - 1) * this.rightParams.pageSize
      );
    },
    /**
     * 左侧表格选择控制
     */
    selectable(row) {
      const filterData = this.value.filter(
        (item) => item[this.rowKey] == row[this.rowKey]
      );
      const filterStatus = filterData?.length === 0;
      return filterStatus;
    },
    /**
     * 左移/右移
     */
    onTransfer(type) {
      if (type === "left") {
        this.$emit("change", type, this.rightSelectedRows);
        this.$refs.rightMultipleTable.clearSelection();
      } else {
        this.$emit("change", type, this.leftSelectedRows);
        this.$refs.leftMultipleTable.clearSelection();
      }
    },
    /**
     * 左侧表格多选
     */
    leftSelectionChange(val) {
      this.leftSelectedRows = val;
    },
    /**
     * 右侧表格多选
     */
    rightSelectionChange(val) {
      this.rightSelectedRows = val;
    },
    /**
     * 表格分页
     */
    paginationChange(direction) {
      if (direction === "left") {
        const { pageNum, pageSize } = this.leftParams;
        this.$emit("pagination", direction, { pageNum, pageSize });
      } else {
        const { pageNum, pageSize } = this.rightParams;
        this.$emit("pagination", direction, { pageNum, pageSize });
      }
    },
    /**
     * 搜索
     */
    handleSearch(direction) {
      if (direction === "left") {
        this.$emit("search", direction, this.leftParams[this.searchKey]);
      } else {
        this.$emit("search", direction, this.rightParams[this.searchKey]);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.custom-transfer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-left,
  .item-right {
    width: 45%;
    height: 500px;
    overflow: auto;
    border: 1px solid #296df1;
    padding: 20px 10px;
    border-radius: 4px;
    .el-table {
      height: calc(100% - 111.5px) !important;
      .el-table__body-wrapper {
        overflow: auto;
      }
    }
  }
  .item-btn {
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-button {
      margin: 10px 0;
    }
  }
}
</style>
