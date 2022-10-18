<template>
  <div class="collapse-item">
    <div class="title" @click="handleOpen">
      <span>{{ title }}</span>
      <y-icon
        class="iconExpand"
        icon="y-icon-jinrujiantouxiao"
        v-if="!open"
      ></y-icon>
      <y-icon
        class="iconExpand"
        icon="y-icon-xialajiantouxiao"
        v-if="open"
      ></y-icon>
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import YIcon from "../icon.vue";
export default {
  name: "YCollapseItem",
  components: {
    YIcon,
  },
  props: {
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false,
    };
  },
  inject: ["eventBus"],
  mounted() {
    this.eventBus.$on("selected", (value) => {
      if (this.name === value[0]) {
        this.open = true;
      }
    });
  },
  methods: {
    handleOpen() {
      if (!this.accordion) {
        this.open = !this.open;
      }
      if (this.accordion) {
        if (this.open) {
         this.open = false
        } else {
          this.open = true
          this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-item {
  font-size: 13px;
  > .title {
    cursor: pointer;
    position: relative;
    border-top: 1px solid rgb(216, 216, 216);
    padding: 15px 0px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .iconExpand {
      width: 15px;
      position: absolute;
      right: 20px;
    }
  }
  &:first-child {
    > .title {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  &:last-child {
    border-bottom: 1px solid rgb(216, 216, 216);
    margin-bottom: -1px;
    > .title:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  > .content {
    padding: 8px;
  }
}
</style>