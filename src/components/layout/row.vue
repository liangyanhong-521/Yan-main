<template>
  <div class="row-wrapper" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YRow",
  props: {
    gutter: {
      type: Number,
      default: 0,
    },
    justify: {
      type: String,
      default: "left",
      validator: function (value) {
        return ["left", "right", "center"].includes(value);
      },
    },
  },
  mounted() {
    // 获取子元素
    this.$children.forEach((item) => {
      item.gutter = this.gutter;
    });
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px",
      };
    },
    rowClass() {
      return {
        [`justify-${this.justify}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scroped>
.row-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.justify-left {
  justify-content: flex-start;
}
.justify-center {
  justify-content: center;
}
.justify-right {
  justify-content: flex-end;
}
</style>