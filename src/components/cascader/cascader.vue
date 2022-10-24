<template>
  <div class="y-cascader">
    <div class="trigger" @click="toggle" :class="{ active: show }">
      <span v-if="result" class="result">{{ result }}</span>
      <span v-else class="beforeactive">请选择</span>
      <y-icon
        class="iconExpand"
        icon="y-icon-xialajiantouxiao"
        :class="{ IsShow: show }"
      ></y-icon>
    </div>

    <div class="popover-wrapper" v-if="show">
      <y-cascader-item
        :dataInfo="data"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></y-cascader-item>
    </div>
  </div>
</template>

<script>
import YCascaderItem from "./cascader-item.vue";
import YIcon from "../icon.vue";
export default {
  name: "YCascader",
  components: {
    YCascaderItem,
    YIcon,
  },
  props: {
    // 要选择的所有数据
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    selected: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    result() {
      return this.selected.map((item) => item).join("/");
    },
  },
  data() {
    return {
      // result就是最后选中的结果，需要做两件事第一是将选中的结果回显，第二是将选中的结果传给app组件
    //   result: "",
      show: false,
    };
  },
  mounted() {
    // console.log(this.data);
    // console.log(this.selected);
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected)
    },
  },
};
</script>

<style lang="scss" scoped>
.y-cascader {
  position: relative;
  display: inline-block;
  .trigger {
    font-size: 14px;
    color: #c0c4cc;
    display: flex;
    align-items: center;
    width: 200px;
    height: 32px;
    padding: 0 1em;
    border: 1px solid #dddddd;
    border-radius: 4px;
    > .result {
      color: #606266;
    }
    .iconExpand {
      width: 15px;
      position: absolute;
      right: 5px;
    }
    .IsShow {
      transform: rotate(180deg);
    }
  }
  .active {
    border: 1px solid #24b3df;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: #ffffff;
    display: flex;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
}
</style>