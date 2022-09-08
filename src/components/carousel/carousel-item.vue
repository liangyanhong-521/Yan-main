<template>
  <transition name="slide">
    <div class="Carousel-item" v-if="visible" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "YCarouselItem",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    visible() {
      return this.selected === this.name;
    },
  },
  data() {
    return {
      selected: undefined,
      reverse: false,
    };
  },
};
</script>

<style lang = "scss" scoped>
/* .Carousel-item{
} */
/* .v-enter 始状态、.v-enter-to 末状态、.v-enter-active 进入动画 */
/* .v-leave 始状态、.v-leave-to 末状态、.v-leave-active 离开动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter.reverse {
  transform: translateX(-100%);
}
.slide-leave-to.reverse {
  transform: translateX(100%);
}
.slide-leave-active {
  position: absolute;
  width: 100%;
  height: 100%; 
}
</style>