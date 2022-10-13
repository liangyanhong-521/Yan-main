<template>
  <div
    class="wrapper-menu-item"
    :class="{ disabled: disabled, selected: selected, vertical: vertical }"
    @click="changeSelected"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YMenuItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  inject: ["root", "vertical"],
  data() {
    return {
      selected: false,
    };
  },
  mounted() {
    this.root.addItem(this);
  },
  methods: {
    changeSelected() {
      this.$emit("selectedName", this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-menu-item {
  padding: 20px;
  cursor: pointer;
  font-size: 15px;
  color: rgb(164, 166, 170);
  &:hover {
    color: rgb(81, 82, 85);
  }
  &:not(.vertical):not(.disabled) {
    &.selected {
      border-bottom: 2px solid #2d8cf0;
    }
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.vertical:not(.disabled) {
    width: 30%;
    &.selected {
      background-color: rgb(208, 225, 240);
      color: rgb(67, 181, 226);
      border-right: 2px solid #2d8cf0;
    }
    &:hover {
      background-color: rgb(208, 225, 240);
      color: rgb(81, 82, 85);
    }
  }
  &.vertical {
    &.disabled {
      width: 30%;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>