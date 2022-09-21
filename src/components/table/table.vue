<template>
  <table class="table" :class="{ tableBorder: border }" :style="{height:height}">
    <br />
    <br />
    <!-- 表头 -->

    <tr class="table-title">
      <!-- 表头的选中框 -->
      <th class="table-content-itemcheckbox" v-if="checkbox">
        <input id="all-checkbox" type="checkbox" @click="checkAll" />
      </th>

      <th class="table-content-itemcheckbox" v-if="expand || indexVisible"></th>

      <th
        class="table-title-item"
        :style="{ width: item.width }"
        v-for="(item, index) in title"
        :key="index"
      >
        {{ item.text }}
        <span
          v-if="sortable"
          class="item-shang"
          :class="{ active: StatusItem == index && increated }"
          @click="handIncreat(item, index)"
          >▲</span>
        <span
          v-if="sortable"
          class="item-xia"
          :class="{ active: StatusItem == index && decreated }"
          @click="handDecreat(item, index)"
          >▼</span>
      </th>
    </tr>

    <!-- 带有斑马纹的表格 -->
    <tr
      class="table-content"
      id="table-content"
      v-for="(item, index) in data"
      :key="index"
      v-show="!stripe"
    >
      <!-- 选中框的一列 -->
      <td class="table-content-itemcheckbox" v-if="checkbox">
        <input name="datacheck1" type="checkbox" @click="check($event, item)" />
      </td>

      <!-- 显示序列号 -->
      <td class="table-content-itemIndex" v-if="indexVisible">
        {{ index }}
      </td>

      <!-- 展开行的图标列 -->
      <td class="table-content-itemexpand" v-if="expand">
        <y-icon
          class="iconExpand"
          icon="y-icon-jinrujiantouxiao"
          v-if="item.isExpand == undefined"
          @click.native="handleExpandStart(item)"
        ></y-icon>
        <y-icon
          class="iconExpand"
          icon="y-icon-xialajiantouxiao"
          v-if="item.isExpand"
          @click.native="handleExpandEnd(item)"
        ></y-icon>
      </td>

      <td class="table-content-item" v-for="(key, index) in key" :key="index">
        {{ item[key] }}
      </td>

      <!-- 展开行的内容 -->
      <div class="expandDom" v-if="item.isExpand">
        {{ item[expandKey] }}
      </div>
    </tr>

    <!-- 不带斑马纹的表格 -->
    <tr
      class="table-content-stripe"
      v-for="(item, index) in data"
      :key="index + '^-^'"
      v-show="stripe"
    >
      <!-- 选中框的一列 -->
      <td class="table-content-itemcheckbox" v-if="checkbox">
        <input name="datacheck2" type="checkbox" @click="check($event, item)" />
      </td>

      <td
        class="table-content-stripe-item"
        v-for="(key, index) in key"
        :key="index"
      >
        {{ item[key] }}
      </td>
    </tr>
  </table>
</template>

<script>
import YIcon from "../icon.vue";
export default {
  name: "YTable",
  components: {
    YIcon,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    //是否创建斑马纹的表格
    stripe: {
      type: Boolean,
      default: false,
    },
    //是否创建带边框的表格
    border: {
      type: Boolean,
      default: false,
    },
    //是否创建带多选框的表格
    checkbox: {
      type: Boolean,
      default: false,
    },
    //多选框的表格选中的数据数组，实现双向绑定和父组件的该数组。
    selectedItems: {
      type: Array,
      // 注意：默认值如果是数组或者对象，应该使用一个函数返回默认值
      default: function () {
        return [];
      },
    },
    // 是否可排序
    sortable: {
      type: Boolean,
      default: false,
    },
    //默认的排列顺序和排列列
    defaultSort: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 是否为展开列表
    expand: {
      type: Boolean,
      default: false,
    },
    // 展开项的内容
    expandKey: {
      type: String,
      default: "",
    },
    // 是否显示索引号
    indexVisible: {
      type: Boolean,
      default: false,
    },
    height:{
      type: String,
      default: "",
    }
  },
  mounted() {
    const domProp = document.getElementsByClassName("table-title-item");
    for (let i = 0; i < domProp.length; i++) {
      if (this.defaultSort.prop == domProp[i].innerText) {
        this.StatusItem = i;
        if (this.defaultSort.order == "increated") {
          this.increated = true;
          this.decreated = false;
          // 这儿需要进行默认的排序。
          this.increasingOrder(this.defaultSort.key);
        } else {
          this.decreated = true;
          this.increated = false;
          this.decreasingOrder(this.defaultSort.key);
        }
      }
    }
  },
  data() {
    return {
      increated: false,
      decreated: false,
      // 排序排他的index
      StatusItem: 0,
      // 展开排他的index
      expandItem: 1,
    };
  },
  computed: {
    key() {
      return this.title.map((item) => item.key);
    },
  },
  methods: {
    checkAll() {
      const flag = document.getElementById("all-checkbox").checked;
      const dom1Array = document.getElementsByName("datacheck1");
      const dom2Array = document.getElementsByName("datacheck2");
      if (this.stripe) {
        for (let i = 0; i < dom2Array.length; i++) {
          let domObj = dom2Array[i];
          domObj.checked = flag;
        }
      } else {
        for (let i = 0; i < dom1Array.length; i++) {
          let domObj = dom1Array[i];
          domObj.checked = flag;
        }
      }
      this.$emit("select-all");
    },
    check(e, dataItem) {
      let currentDom = e.target;
      if (currentDom.checked == true) {
        this.selectedItems.push(dataItem);
      } else {
        this.selectedItems.splice(
          this.selectedItems.findIndex((item) => item.id === dataItem.id),
          1
        );
      }
      const dom1Array = document.getElementsByName("datacheck1");
      const dom2Array = document.getElementsByName("datacheck2");
      if (this.stripe) {
        this.judgeChecke(dom2Array);
      } else {
        this.judgeChecke(dom1Array);
      }
    },
    //判断多选框是否都为选中状态
    judgeChecke(dataArray) {
      let checkedNum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        let domObj = dataArray[i];
        if (domObj.checked == true) {
          checkedNum++;
        }
      }
      if (checkedNum == dataArray.length) {
        document.getElementById("all-checkbox").checked = true;
      } else {
        document.getElementById("all-checkbox").checked = false;
      }
      this.$emit("select");
    },
    // 点击上升的按钮操作
    handIncreat(item, index) {
      this.decreated = false;
      this.increated = true;
      this.StatusItem = index;
      this.increasingOrder(item.key);
    },
    // 点击下降的按钮操作
    handDecreat(item, index) {
      this.decreated = true;
      this.increated = false;
      this.StatusItem = index;
      this.decreasingOrder(item.key);
    },
    //列表增序的函数
    // order为排序的顺序，item为排序的列的key值,比如分数列则item为score
    increasingOrder(item) {
      this.data.sort(function (a, b) {
        if (typeof a[item] === "number") {
          return a[item] - b[item];
        }
        if (typeof a[item] === "string") {
          return a[item].localeCompare(b[item]);
        }
      });
    },
    // 表格降序的函数（判断需要排序的列是数字还是字符串。）
    decreasingOrder(item) {
      this.data.sort(function (a, b) {
        if (typeof a[item] === "number") {
          return b[item] - a[item];
        }
        if (typeof a[item] === "string") {
          return b[item].localeCompare(a[item]);
        }
      });
    },
    handleExpandStart(item) {
      this.$set(item, "isExpand", true);
    },
    handleExpandEnd(item) {
      this.$set(item, "isExpand", undefined);
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  caret-color: rgba(0, 0, 0, 0);
  width: 100%;
  border-collapse: collapse;
}

.item-shang {
  position: relative;
  top: -8px;
  left: 5.5px;
  cursor: pointer;
}
.active {
  position: relative;
  top: -8px;
  left: 5.5px;
  color: rgb(48, 222, 228);
  cursor: pointer;
}
.item-xia {
  position: relative;
  top: 3px;
  left: -8px;
  cursor: pointer;
}
.tableBorder tr th {
  border: 1px solid rgb(235, 232, 232);
}
.tableBorder tr td {
  border: 1px solid rgb(235, 232, 232);
}
.table-title {
  border-bottom: 1px solid rgb(235, 232, 232);
  &-item {
    font-size: 14px;
    color: rgb(158, 157, 157);
    height: 50px;
  }
}
.table-content {
  border-bottom: 1px solid rgb(235, 232, 232);
  height: 60px;
  overflow-y: scroll;
  &-item {
    font-size: 14px;
    text-align: center;
  }
  &-itemIndex {
    text-align: center;
  }
}

.iconExpand {
  position: relative;
  float: left;
  display: block;
  // margin-left: 40px;
}
.expandDom {
}
.table-content-stripe {
  border-bottom: 1px solid rgb(235, 232, 232);
  height: 45px;
  &-item {
    font-size: 14px;
    text-align: center;
  }
  &:not(.table-title):nth-child(2n) {
    background-color: rgb(238, 240, 240);
  }
  &:not(.table-title):nth-child(2n):hover {
    background-color: rgb(211, 207, 207);
  }
}

tr:not(.table-title) {
  &:hover {
    background-color: rgb(211, 207, 207);
  }
}
.table-content-itemcheckbox {
  width: 90px;
  text-align: center;
}
</style>>