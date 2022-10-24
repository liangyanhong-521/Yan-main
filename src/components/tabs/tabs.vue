<template>
  <div
    class="wrapper-tabs"
    :class="{ [`tabs-vertical`]: direction === 'vertical' }"
  >
    <div
      class="title"
      :class="{ [`title-vertical`]: direction === 'vertical' }"
    >
      <slot></slot>
    </div>
    <div class="content">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  names: "YTabs",
  props: {
    selected: {
      type: String,
      default: "",
      require: true,
    },
    type: {
      type: String,
      default: "default",
    },
    direction: {
      type: String,
      default: "horizontal",
    },
  },
  data() {
    return {
      text: "",
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  updated() {
    this.eventBus.$emit("update:selected", this.selected);
  },
  mounted() {
    this.eventBus.$emit("direction", this.direction);
    this.eventBus.$emit("type", this.type);
    this.$children.forEach((vm) => {
      if (vm.name == this.selected) {
        this.text = vm.$slots.default[0].text;
      }
      vm.$on("selected", (value1, value2) => {
        this.$emit("update:selected", value1);
        this.text = value2;
      });
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.wrapper-tabs {
  margin-top: 10px;
  margin-left: 10px;
  > .title:not(.title-vertical) {
    display: flex;
    flex-direction: row;
    font-size: 15px;
  }
  > .title.title-vertical {
    display: flex;
    flex-direction: column;
  }
  > .content {
    font-size: 18px;
    padding: 15px;
  }
}
.tabs-vertical {
  display: flex;
  flex-direction: row;
}
</style>