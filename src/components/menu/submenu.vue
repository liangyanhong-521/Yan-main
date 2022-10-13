<template>
  <div class="wrapper-sub-menu">
    <div class="wrapper-sub-menu-title" @click="onClick">
      <slot name="title"></slot>

      <span class="wrapper-sub-menu-icon">
        <y-icon
          class="iconExpand"
          icon="y-icon-shangjiantou"
          v-if="open"
        ></y-icon>
        <y-icon
          class="iconExpand"
          icon="y-icon-xialajiantouxiao"
          v-if="!open"
        ></y-icon>
      </span>
    </div>

    <div class="wrapper-sub-menu-vertical" v-if="vertical" @click="onChoose">
      <div class="wrapper-sub-menu-popover" v-show="open" :class="{ vertical }">
        <slot></slot>
      </div>
    </div>

    <div class="wrapper-sub-menu-horizontal" v-else @click="onChoose">
      <div class="wrapper-sub-menu-popover" v-show="open">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import YIcon from "../icon.vue";
export default {
  name: "YSubMenu",
  inject: ["root", "vertical", "menuTrigger"],
  components: {
    YIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    if (!this.vertical) {
      this.$el.addEventListener("mouseenter", (e) => {
        this.open = true;
      });
      this.$el.addEventListener("mouseleave", (e) => {
        this.open = false;
      });
    }
  },
  methods: {
    onClick() {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    onChoose(){
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper-sub-menu {
  padding: 20px;
  position: relative;
  cursor: pointer;
  font-size: 15px;
  color: rgb(164, 166, 170);
  &:hover {
    color: rgb(81, 82, 85);
  }
  &-title {
  }

  &-icon {
    .iconExpand {
      width: 13px;
      height: 13px;
    }
  }
  //   .wrapper-sub-menu-horizontal{
  //     position: relative;
  //   }

 .wrapper-sub-menu-popover:not(.vertical) {
    // width: 100px;
    background-color: #ffffff;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0;
    min-width: 8em;
    white-space: nowrap;
    border-radius: 3px;
    z-index: 2;
    box-shadow: 2px 2px 5px black;
  }
}

.wrapper-sub-menu .wrapper-sub-menu {
  .wrapper-sub-menu-popover {
    top: 20px;
    left: 100%;
    margin-left: 0;
  }
}
</style>