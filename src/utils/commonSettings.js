/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * 通用js方法封装处理
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if ((typeof time === "string") && (/^[0-9]+$/.test(time))) {
      time = parseInt(time, 10);
    } else if (typeof time === "string") {
      time = time.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.[\d]{3}/gm), "");
    }
    if ((typeof time === "number") && (time.toString().length === 10)) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") { return ["日", "一", "二", "三", "四", "五", "六"][value]; }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return timeStr;
}

// 表单重置
export function resetForm(refName) {
  // eslint-disable-next-line no-invalid-this
  if (this.$refs[refName]) {
    // eslint-disable-next-line no-invalid-this
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  const search = params;
  search.params = typeof (search.params) === "object" && search.params !== null && !Array.isArray(search.params) ? search.params : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof (propName) === "undefined") {
    search.params.beginTime = dateRange[0];
    search.params.endTime = dateRange[1];
  } else {
    search.params[`begin${propName}`] = dateRange[0];
    search.params[`end${propName}`] = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  const actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value === (`${value}`)) {
      actions.push(datas[key].label);
      return true;
    }
    return false;
  });
  return actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  const actions = [];
  const currentSeparator = undefined === separator ? "," : separator;
  const temp = value.split(currentSeparator);
  // eslint-disable-next-line array-callback-return
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].value === (`${temp[val]}`)) {
        actions.push(datas[key].label + currentSeparator);
      }
      return false;
    });
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  // eslint-disable-next-line prefer-rest-params
  const args = arguments; let flag = true; let i = 1;
  str = str.replace(/%s/g, () => {
    const arg = args[i += 1];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str === "undefined" || str === "null") {
    return "";
  }
  return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  const config = {
    id: id || "id",
    parentId: parentId || "parentId",
    childrenList: children || "children"
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }
  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  for (const t of tree) {
    adaptToChildrenList(t);
  }

  return tree;
}

/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof (value) !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof (value[key]) !== "undefined") {
            const params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

const formatToFixed = (money, decimals = 2) => {
  return (
    Math.round((parseFloat(money) + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  ).toFixed(decimals);
};
// 金额格式化
export const formatMoney = (money, symbol = "", decimals = 2) => `${symbol}${parseFloat(formatToFixed(money, decimals)).toLocaleString()}`;
// 表格金额格式化
export const columnFormatMoney = (row, column, cellValue) => formatMoney(cellValue)