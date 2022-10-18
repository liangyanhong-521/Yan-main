<template>
  <div class="wrapper-collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "YCollapse",
  props: {
    accordion: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => {
        return ["1"];
      },
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.eventBus.$emit("selected", this.selected);

    if (this.accordion) {
      this.eventBus.$on("update:addSelected", (name) => {
        this.$children.forEach((vm) => {
            if(vm.name == name){
                vm.open = true
            }else{
                vm.open = false
            }
        });
      });
    }
    this.$children.forEach((vm) => {
      vm.accordion = this.accordion;
    });
  },
};
</script>

<style lang="scss" scoped>
.wrapper-collapse {
  border: 1px solid #dddddd;
  border-radius: 4px;
}
</style>