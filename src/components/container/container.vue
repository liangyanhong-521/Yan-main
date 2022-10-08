<template>
  <div class="container-wrapper" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YContainer",
  data() {
    return {
      layoutClass: {
        hasSider: false,
      },
    };
  },
  mounted() {
    this.$children.forEach((vm) => {
      if (vm.$options.name === "YAside") {
        this.layoutClass.hasSider = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.container-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  &.hasSider {
    flex-direction: row;
  }
}
</style>