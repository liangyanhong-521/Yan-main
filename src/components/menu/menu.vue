<template>
  <div class="wrapper-menu" :class="{ vertical: vertical }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YMenu",
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    menuTrigger: {
      type: String,
      default: "hover",
      validator: function (value) {
        return ["hover", "click"].indexOf(value) >= 0;
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      items: [],
    };
  },
  provide() {
    return {
      root: this,
      vertical: this.vertical,
      menuTrigger: this.menuTrigger,
    };
  },
  mounted() {
    this.updateChildren();
    this.updateSelectedName();
  },
  updated() {
    this.updateChildren();
  },
  methods: {
    addItem(vm) {
      this.items.push(vm);
    },
    updateChildren() {
      this.items.forEach((vm) => {
        if (this.selected===vm.name) {
          vm.selected = true;
        } else {
          vm.selected = false;
        }
      });
    },
    updateSelectedName() {
      this.items.forEach((vm) => {
        vm.$on("selectedName", (name) => {
          this.$emit("update:selected", name);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-menu {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(182, 183, 184);
}
.vertical {
  display: flex;
  flex-direction: column;
  border: none;
}
</style>