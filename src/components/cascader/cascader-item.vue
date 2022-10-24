<template>
  <div class="wrapper-cascaderItem">
    <div
      class="cascaderItem-one"
      v-for="(item, index) in dataInfo"
      :key="index"
      @click="haddleOpen(item)"
      :class="{ selected: item.value == name }"
    >
      <span class="text">{{ item.label }}</span>
      <y-icon
        class="iconExpand"
        icon="y-icon-xialajiantouxiao"
        v-if="item.children"
        :class="{ isOpen: item.value == name }"
      ></y-icon>
    </div>

    <div class="cascaderItem-tow" v-if="dataChildren">
      <y-cascader-item
        :dataInfo="dataChildren"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :level="level + 1"
      ></y-cascader-item>
    </div>
  </div>
</template>

<script>
import YIcon from "../icon.vue";
export default {
  name: "YCascaderItem",
  components: {
    YIcon,
  },
  data() {
    return {
      name: "",
    };
  },
  props: {
    dataInfo: {
      type: Array,
      default: function () {
        return [];
      },
    },
     selected: {
      type: Array,
      default: () => [],
    },
     level: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dataChildren() {
      // 如果传过来的原始数组有children,则他的返回值为children的数组。
      let newData;
      this.dataInfo.forEach((item) => {
        if (this.name !== "" && this.name == item.value && item.children) {
          newData = item.children;
        }
      });
      if (newData) {
        return newData;
      } else {
        return null;
      }
    },
  },
  methods: {
    haddleOpen(item) {
      this.name = item.value;
      let copy = JSON.parse(JSON.stringify(this.selected))
      copy[this.level] = item.label
      copy.splice(this.level + 1)
      this.$emit('update:selected', copy)
    },
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-cascaderItem {
  width: 150px;
  padding-left: 20px;
  position: relative;

  > .cascaderItem-one {
    padding-left: 15px;
    padding: 10px;
    border-bottom: 1px solid #c4c2c2;
    .text {
      font-size: 14px;
    }
    .iconExpand {
      width: 15px;
      position: absolute;
      right: 5px;
      transform: rotate(-90deg);
    }
    .isOpen {
      transform: rotate(0deg);
    }
  }
  .selected {
    border: 1px solid #25c4ec;
  }
  .cascaderItem-tow {
    height: 100%;
    position: absolute;
    left: 180px;
    top: 0;
  }
}
</style>